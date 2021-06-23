//express
const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser')
//mongoose
const mongoose = require('mongoose');
const sbtns = require('./models/sounds');
//discord
const discord = require('discord.js');
const discordTTS = require('discord-tts');
const client = new discord.Client();
var connection;
const DisTube = require('distube');
const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });
//other
const config = require('./config.json');




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

app.listen(3000, function(err){
    console.log('App listening on http://localhost:3000');
});





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
client.login(config.token);

client.on('ready', () => {
    console.log('Online');
});

client.on('message', async function(message) {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();

    if(config.bannedUsers.includes(message.author.id)) return message.reply('no.');

    if(command === 'log') console.log(args.join(' '));

    if(command == 'sneak'){
        if(parseInt(args[0])){
            const channel = client.channels.cache.get(args[0]);
            channel.join().then(connect => connection = connect);
        }
    }

    if(['leave','disconnect'].includes(command)){
        connection.disconnect();
        connection = undefined;
    }

    if(command === 'join'){
        if (message.member.voice.channel){
            connection = await message.member.voice.channel.join();
        } else return message.channel.send('Join a voice channel first');
    }

    if(command === 'say'){
        if (args.length > 1) {
            if (message.member.voice.channel){
                uniPlay(args.join(' '), 0.8, true);
            } else return message.channel.send('Join a voice channel first');
        } else return message.channel.send('Make it worth our while and use more then one word.');
    }

    if (command == "play")
        distube.play(message, args.join(" "));

    if (["repeat", "loop"].includes(command))
        distube.setRepeatMode(message, parseInt(args[0]));

    if (command == "stop") {
        distube.stop(message);
        message.channel.send("Stopped the music!");
    }

    if (command == "skip")
        distube.skip(message);

    if (command == "queue") {
        let queue = distube.getQueue(message);
        message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n"));
    }

    if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) {
        let filter = distube.setFilter(message, command);
        message.channel.send("Current queue filter: " + (filter || "Off"));
    }
});

const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

// DisTube event listeners, more in the documentation page
distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    ))
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("error", (message, e) => {
        console.error(e)
        message.channel.send("An error encountered: " + e);
    });


async function uniPlay(text, volume, istts){
  if (!connection) {
      console.log('No connection');
      return;
  }
  var dispatcher;

  if (istts) {
      console.log('Running TTS');
      dispatcher = connection.play(discordTTS.getVoiceStream(text, {lang:"en"}), { volume: truVol });
  }
  else {
      console.log('Running file');
      dispatcher = connection.play(text, { volume: truVol });
  }

  dispatcher.on('start', () => {
      console.log(`"${text}" is now playing!`);
  });
  
  dispatcher.on('finish', () => {
      console.log(`"${text}" has finished playing!`);
  });
  
  dispatcher.on('error', console.error);
}