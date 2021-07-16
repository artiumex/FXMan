const currency = require('./models/currency');
const mongoose = require('mongoose');
const discord = require('discord.js');

module.exports = {
	botid: '864589806276575262',
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
	reply (message, texty) {
		const embed = new discord.MessageEmbed()
			.setColor(this.Colors.rand())
			.setDescription(texty);

		message.channel.send(embed);
	}
}