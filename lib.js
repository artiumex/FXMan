const currency = require('./models/currency');
const mongoose = require('mongoose');
const discord = require('discord.js');

module.exports = {
	botid: '864589806276575262',
	testGuilds: ['402919650985246741', '865562274953560064', '757018928391389224'],
	Colors: {
		red: '#ff0000',
		black: '#000000',
		rand() {
			var thecolor = Math.floor(Math.random()*16777215);
			return thecolor
		},
		randHex() {
			var thecolor = Math.floor(Math.random()*16777215);
			return '#'+thecolor.toString(16)
		}
	},
	responses: {
		isbot: 'that\'s a bot lol',
		selfdid: 'i mean you do you, bud.',
	},
	footer() {
		var footers = ["Ahaha pissbot's back baby!", "42", "[PBOT SUPREMACY]"];
		var rand = this.random(0,footers.length);
		return footers[rand]
	},
	delivery(name) {
		var list = [
			"Here you go", 
			"And I oop", 
			"Thar she blows",
			"Delivery"
		]
		return `${list[this.random(0, list.length-1)]}, **${name}**`;
	},
	random(low, high) {
		return Math.floor(Math.random() * (high - low) + low)
	},
	async checkProf(id) {
		let profile = await currency.findOne({
			userid: id
		});
		if (!profile) {
			let newprof = new currency({
				_id: mongoose.Types.ObjectId(),
				userid: id,
			});

			try {
				newprof = await newprof.save();
			} catch (err) {
				console.log(err);
			}

			return newprof
		} else return profile
	},
	reply(message, texty) {
		const embed = new discord.MessageEmbed()
			.setColor(this.Colors.rand())
			.setDescription(texty);

		message.channel.send(embed);
	},
	embed() {
		const embed = new discord.MessageEmbed().setColor(this.Colors.rand());
		return embed
	},
	emoji: {
		heart: ':heart:',
		hay: '<:Hay:865563927601086464>',
		shippingbox: '<:ShippingBox:865563927785635840>',
		silo: '<:Silo:865563929845825566>',
		coop: '<:Coop:865563926539141141>',
		barn: '<:Barn:865563925991129098>',
		backpack: '<:Backpack:866144836545544192>',
	},
	farm: {
		parsnips: { time: 2, emoji: '<:Parsnip:865563927713808384>' },
		wheat: { time: 3, emoji: '<:Wheat:865563927781572618>' },
		corn: { time: 6, emoji: '<:Corn:865563927412867083>' },
		beets: { time: 12, emoji: '<:Beet:865563927454023700>' },
		grapes: { time: 20, emoji: '<:Grape:865563927542890546>' },
	},
	animals: {
		chickens: { time: 6, emoji: '<:White_Chicken:865563927919067146>', pemoji: '<:Egg:865570697328721930>' },
		cows: { time: 8, emoji: '<:White_Cow:865563928414388235>', pemoji: '<:Milk:865570697330032670>' },
	},
	artisan: {
		flour: { emoji: '<:Wheat_Flour:866144836436099102>' },
		oil: { emoji: '<:Oil:866144836154294292>' },
		sugar: { emoji: '<:Sugar:866144837228560384>' },
		wine: { emoji: '<:Wine:866144836473716786>' },
		mayo: { emoji: '<:Mayonnaise:866144836247093248>' },
		cheese: { emoji: '<:Cheese:866144836330848266>' },
	},
	time(dur, hrs){
		let now = new Date();
		var output = false;

		if ((Date.parse(now) > (Date.parse(dur) + (hrs * 3600000)))) output = true;
		return output
	},
	breaktime (hrs, past) {
		const total =(Date.parse(past) + (hrs * 3600000)) - Date.parse(new Date());
		const seconds = Math.floor( (total/1000) % 60 );
		const minutes = Math.floor( (total/1000/60) % 60 );
		const hours = Math.floor( (total/(1000*60*60)) % 24 );
		var text = '';
		
		if (hours) text = `${hours} hr, ${minutes} m`
		else text = `${minutes} m, ${seconds} s`

		return text
	}
}