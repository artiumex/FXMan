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
	farm: {
		parsnips: { time: 2, emoji: '<:Parsnip:865563927713808384>', names: ['parsnip', 'parsnips', 'p'] },
		wheat: { time: 3, emoji: '<:Wheat:865563927781572618>', names: ['wheat', 'w'] },
		corn: { time: 6, emoji: '<:Corn:865563927412867083>', names: ['corn', 'c'] },
		beets: { time: 12, emoji: '<:Beet:865563927454023700>', names: ['beet', 'beets', 'b'] },
		grapes: { time: 20, emoji: '<:Grape:865563927542890546>', names: ['grape', 'grapes', 'g'] },
		emoji: {
			chicken: '<:White_Chicken:865563927919067146>',
			cow: '<:White_Cow:865563928414388235>',
			egg: '<:Egg:865570697328721930>',
			milk: '<:Milk:865570697330032670>',
			hay: '<:Hay:865563927601086464>',
			shippingbox: '<:ShippingBox:865563927785635840>',
			silo: '<:Silo:865563929845825566>',
			coop: '<:Coop:865563926539141141>',
			barn: '<:Barn:865563925991129098>',
		}
	},
	farmtime(crop, t){
		let now = new Date();
		var output = false;

		if ((Date.parse(now) > (Date.parse(crop.harvest) + (t * 3600000)))) output = true;
		return output
	},
}