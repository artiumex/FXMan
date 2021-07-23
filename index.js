//express
const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser')
//mongoose
const mongoose = require('mongoose');
const sbtns = require('./models/sounds');
const currency = require('./models/currency');
//discord
const fs = require('fs');
const axios = require('axios').default;
const discord = require('discord.js');
const discordTTS = require('discord-tts');
const client = new discord.Client();
var connection;
//other
const config = require('./config.json');
client.prefix = config.prefix;
const lib = require('./lib.js');


process.on("unhandledRejection", error => console.log(error));

//express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async function (req, res) {
    var connected = true;
    if (!connection) connected = false;

    res.render('index', {
        connected: connected,
        buttons: await sbtns.find({}).sort({ name: -1 }),
    });
});

app.get('/loud', async function (req, res) {
    var connected = true;
    if (!connection) connected = false;

    res.render('loud', {
        connected: connected,
        buttons: await sbtns.find({}).sort({ name: -1 }),
    });
});

app.get('/tts', function (req, res) {
    var connected = true;
    if (!connection) connected = false;

    res.render('tts', {
        connected: connected,
        prefix: config.prefix,
    });
});

app.get('/buttons', async function (req, res) {
    res.render('buttons', {
        buttons: await sbtns.find({}).sort({ name: -1 }),
    });
});

app.post('/submitted', async function (req, res) {
    var snd = await sbtns.findOne({
        name: req.body.button
    });
    uniPlay(snd.link, 0.5, false);
    res.redirect('/');
});

app.post('/louded', async function (req, res) {
    var snd = await sbtns.findOne({
        name: req.body.button
    });
    uniPlay(snd.link, 1, false);
    res.redirect('/loud');
});

app.post('/ttsed', function (req, res) {
    var textToSay = req.body.ttstext;
    uniPlay(textToSay, 0.5, true);
    res.redirect('/tts');
});

app.post('/added', async function (req, res) {
    console.log(req.body);
    const newBtn = await new sbtns({
        _id: mongoose.Types.ObjectId(),
        name: req.body.buttonname,
        link: req.body.buttonlink,
    })
    try {
        await newBtn.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect('/buttons');
});

app.post('/removed', async function (req, res) {
    console.log(req.body);
    try {
        await sbtns.findOneAndDelete({
            name: req.body.buttonchoice,
        });
    } catch (err) {
        console.log(err);
    }
    res.redirect('/buttons');
});

/*app.listen(3000, function(err){
  console.log('App listening on http://localhost:3000');
});*/





//mongoose
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    poolSize: 5,
    connectTimeoutMS: 10000,
    family: 4
  };

  mongoose.connect(config.mongodb, dbOptions);
  mongoose.set('useFindAndModify', false);
  mongoose.Promise = global.Promise;

  mongoose.connection.on('connected', () => {
    console.log(`The bot has connected to the database.`);
  });
  mongoose.connection.on('disconnected', () => {
    console.log(`The bot has disconnected from the database.`);
  });
  mongoose.connection.on('err', (err) => {
    console.log(`There was an error with the connection to the databse:  ${err}`);
  });





//discord
client.legacycommands = new discord.Collection();
client.slashcommands = new discord.Collection();

const lcommandFolders = fs.readdirSync('./commands');
const scommandFolders = fs.readdirSync('./slash');

for (const folder of lcommandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		command.folder = folder;
		client.legacycommands.set(command.name, command);
	}
}


for (const folder of scommandFolders) {
	const scommandFiles = fs.readdirSync(`./slash/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of scommandFiles) {
		const command = require(`./slash/${folder}/${file}`);
		command.folder = folder;
		command.data.description = `[${folder}] ${command.data.description}`;
		client.slashcommands.set(command.name, command);
	}
}

client.login(config.token);

client.on('ready', async () => {
    console.log('Online');
});

client.ws.on('INTERACTION_CREATE', async interaction => {
  const respond = (interaction, text) => {
		client.api.interactions(interaction.id, interaction.token).callback.post({data: {
			type: 4,
			data: {
				content: text,
				ephemeral: true
			}
		}});
	}
	const followup = async (interaction, change, isembed) => {
		if (isembed) axios.patch(`https://discord.com/api/v8/webhooks/${client.user.id}/${interaction.token}/messages/@original`, { content: '', embeds: [change] });
		else axios.patch(`https://discord.com/api/v8/webhooks/${client.user.id}/${interaction.token}/messages/@original`, { content: change });
	}
	const command = client.slashcommands.get(interaction.data.name);
	var args = interaction.data.options;
	var self;
	if (!interaction.member) self = interaction.user;
	else self = interaction.member.user;

	if(!command) return respond('oops!');
	command.execute(client, interaction, self, args, respond, followup, lib);
});

client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const cmd = args.shift().toLowerCase();
	const command = client.legacycommands.get(cmd)

	if (!client.legacycommands.has(cmd)) return;
	
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\n\nThe proper usage would be: \`${config.prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}	

	if (command.ownerOnly && message.author.id !== '256880604359032832') return message.channel.send('no.')

	try {
		command.execute(message, args, client, lib, currency, connectionFunc);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

function connectionFunc(type, change){
	if (!type) return connection;
	if (type == 1){
		if (!change) return console.log('no change');
		connection = change;
	}
}

async function uniPlay(text, volume, istts){
  if (!connection) {
      console.log('No connection');
      return;
  }
  var dispatcher;

  if (istts) {
      console.log('Running TTS');
      dispatcher = connection.play(discordTTS.getVoiceStream(text, {lang:"en"}), { volume: volume });
  }
  else {
      console.log('Running file');
      dispatcher = connection.play(text, { volume: volume });
  }

  dispatcher.on('start', () => {
      console.log(`"${text}" is now playing!`);
  });
  
  dispatcher.on('finish', () => {
      console.log(`"${text}" has finished playing!`);
  });
  
  dispatcher.on('error', console.error);
}