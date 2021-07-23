const currency = require('./models/currency');
const mongoose = require('mongoose');
const discord = require('discord.js');
const math = require('mathjs');

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
	emoji: {
		heart: ':heart:',
		redcheck: ':x:',
		greencheck: ':white_check_mark:',
		hay: '<:Hay:865563927601086464>',
		shippingbox: '<:ShippingBox:865563927785635840>',
		silo: '<:Silo:865563929845825566>',
		coop: '<:Coop:865563926539141141>',
		barn: '<:Barn:865563925991129098>',
		backpack: '<:Backpack:866144836545544192>',
	},
	stardews: {
		all: ['p','w','c','b','g','ch','co'],
		crops: ['p','w','c','b','g'],
		animals: ['ch','co']
	},
	stardew: {
		p: {
			base: "Parsnip Seeds",
			baseid: "parsnip_seeds",
			baseemoji: "",
			basecost: 10,
			product: "Parsnips",
			productid: "parsnips",
			productemoji: "",
			productprice: 30,
			producttime: 1,
			artisan: "Soup",
			artisanid: "soup",
			artisanemoji: "",
			artisanprice: 90,
			machine: "Soup Machine",
			machineid: "soup_machine",
			machineemoji: "",
			machinecost: 32500,
			machinetime: 2
		},
		w: {
			base: "Wheat Seeds",
			baseid: "wheat_seeds",
			baseemoji: "",
			basecost: 1000000,
			product: "Wheat",
			productid: "wheat",
			productemoji: "",
			productprice: 300,
			producttime: 2,
			artisan: "Flour",
			artisanid: "flour",
			artisanemoji: "",
			artisanprice: 900,
			machine: "Flour Mill",
			machineid: "flour_mill",
			machineemoji: "",
			machinecost: 250300000,
			machinetime: 2
		},
		c: {
			base: "Corn Seeds",
			baseid: "corn_seeds",
			baseemoji: "",
			basecost: 5000000,
			product: "Corn",
			productid: "corn",
			productemoji: "",
			productprice: 1500,
			producttime: 3,
			artisan: "Oil",
			artisanid: "oil",
			artisanemoji: "",
			artisanprice: 4500,
			machine: "Oil Press",
			machineid: "oil_press",
			machineemoji: "",
			machinecost: 1251500000,
			machinetime: 2
		},
		b: {
			base: "Beet Seeds",
			baseid: "beet_seeds",
			baseemoji: "",
			basecost: 10000000,
			product: "Beets",
			productid: "beets",
			productemoji: "",
			productprice: 3000,
			producttime: 6,
			artisan: "Sugar",
			artisanid: "sugar",
			artisanemoji: "",
			artisanprice: 9000,
			machine: "Sugar Mill",
			machineid: "sugar_mill",
			machineemoji: "",
			machinecost: 2503000000,
			machinetime: 2
		},
		g: {
			base: "Grape Starter",
			baseid: "grape_starter",
			baseemoji: "",
			basecost: 10,
			product: "Grapes",
			productid: "grapes",
			productemoji: "",
			productprice: 6000,
			producttime: 12,
			artisan: "Wine",
			artisanid: "wine",
			artisanemoji: "",
			artisanprice: 18000,
			machine: "Keg",
			machineid: "keg",
			machineemoji: "",
			machinecost: 5006000000,
			machinetime: 2
		},
		ch: {
			base: "Chickens",
			baseid: "chickens",
			baseemoji: "",
			basecost: 10,
			product: "Eggs",
			productid: "eggs",
			productemoji: "",
			productprice: 10800,
			producttime: 6,
			artisan: "Mayo",
			artisanid: "mayo",
			artisanemoji: "",
			artisanprice: 32400,
			machine: "Mayo Machine",
			machineid: "mayo_machine",
			machineemoji: "",
			machinecost: 9010802500,
			machinetime: 2
		},
		co: {
			base: "Cows",
			baseid: "cows",
			baseemoji: "",
			basecost: 10,
			product: "Milk",
			productid: "milk",
			productemoji: "",
			productprice: 16200,
			producttime: 8,
			artisan: "Cheese",
			artisanid: "cheese",
			artisanemoji: "",
			artisanprice: 48600,
			machine: "Cheese Machine",
			machineid: "cheese_machine",
			machineemoji: "",
			machinecost: 13516203750,
			machinetime: 2
		},
	},
	responses: {
		isbot: 'that\'s a bot lol',
		selfdid: 'i mean you do you, bud.',
	},
	baleval(expression, profile){
		var amount = expression
			.replace(/\s/,'')
			.replace(/bal/gi, profile.balance)
			.replace(/balance/gi, profile.balance)
			.replace(/money/gi, profile.balance)
			.replace(/[^0-9\(\)\*\+\-\/]/, '');
		amount = math.evaluate(amount);
		return amount
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
	time(dur, hrs){
		var output = false;
		if (Date.parse(new Date()) > (Date.parse(dur) + (hrs * 3600 * 1000))) output = true;
		return output
	},
	countdown (dur, hrs) {
		const total = (Date.parse(dur) + (hrs * 3600 * 1000)) - Date.parse(new Date());
		if (total < 0) return 'READY';
		
		const seconds = Math.floor( (total/1000) % 60 );
		const minutes = Math.floor( (total/1000/60) % 60 );
		const hours = Math.floor( (total/(1000*60*60)) % 24 );
		
		var text = '';
		if (hours) text = `${hours} hr, ${minutes} m`;
		else text = `${minutes} m, ${seconds} s`;
		return text
	}
}