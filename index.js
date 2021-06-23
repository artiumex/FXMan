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
    uniPlay(snd.link, false);
    res.redirect('/');
});

app.post('/ttsed', function (req, res) {
    var textToSay = req.body.ttstext;
    uniPlay(textToSay, true);
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
                uniPlay(args.join(' '), true);
            } else return message.channel.send('Join a voice channel first');
        } else return message.channel.send('Make it worth our while and use more then one word.');
    }
});

async function uniPlay(text, istts){
    if (!connection) {
        console.log('No connection');
        return;
    }
    var dispatcher;

    if (istts) {
        console.log('Running TTS');
        dispatcher = connection.play(discordTTS.getVoiceStream(text, {lang:"en"}));
    }
    else {
        console.log('Running file');
        dispatcher = connection.play(text, { volume: 0.5 });
    }

    dispatcher.on('start', () => {
        console.log(`"${text}" is now playing!`);
    });
    
    dispatcher.on('finish', () => {
        console.log(`"${text}" has finished playing!`);
    });
    
    dispatcher.on('error', console.error);
}