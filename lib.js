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
		heart: '<a:Heart:868688228838953003>',
		redcheck: ':x:',
		greencheck: ':white_check_mark:',
		hay: '',
		fertilizer: '',
		farm: '<:ShippingBox:865563927785635840>',
		shed: '<a:shed:868657049532268615>',
		silo: '<:Silo:865563929845825566>',
		inventory: '<:Backpack:866144836545544192>',
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
			baseemoji: "<:Parsnip_Seeds:868153386460131329>",
			basecost: 10,
			product: "Parsnips",
			productid: "parsnips",
			productemoji: "<:Parsnip:865563927713808384>",
			productprice: 30,
			producttime: 1,
			artisan: "Soup",
			artisanid: "soup",
			artisanemoji: "<:Parsnip_Soup:868153386615328878>",
			artisanprice: 90,
			machine: "Soup Machine",
			machineid: "soup_machine",
			machineemoji: ":ramen:",
			machinecost: 32500,
			machinetime: 2
		},
		w: {
			base: "Wheat Seeds",
			baseid: "wheat_seeds",
			baseemoji: "<:Wheat_Seeds:868153386850209862>",
			basecost: 1000000,
			product: "Wheat",
			productid: "wheat",
			productemoji: "<:Wheat:865563927781572618>",
			productprice: 300,
			producttime: 2,
			artisan: "Flour",
			artisanid: "flour",
			artisanemoji: "<:Wheat_Flour:866144836436099102>",
			artisanprice: 900,
			machine: "Flour Mill",
			machineid: "flour_mill",
			machineemoji: "<:Mill:868153386539819048>",
			machinecost: 250300000,
			machinetime: 2
		},
		c: {
			base: "Corn Seeds",
			baseid: "corn_seeds",
			baseemoji: "<:Corn_Seeds:868153382722994197>",
			basecost: 5000000,
			product: "Corn",
			productid: "corn",
			productemoji: "<:Corn:865563927412867083>",
			productprice: 1500,
			producttime: 3,
			artisan: "Oil",
			artisanid: "oil",
			artisanemoji: "<:Oil:866144836154294292>",
			artisanprice: 4500,
			machine: "Oil Press",
			machineid: "oil_press",
			machineemoji: "<:Oil_Maker:868153386569183253>",
			machinecost: 1251500000,
			machinetime: 2
		},
		b: {
			base: "Beet Seeds",
			baseid: "beet_seeds",
			baseemoji: "<:Beet_Seeds:868153383033389066>",
			basecost: 10000000,
			product: "Beets",
			productid: "beets",
			productemoji: "<:Beet:865563927454023700>",
			productprice: 3000,
			producttime: 6,
			artisan: "Sugar",
			artisanid: "sugar",
			artisanemoji: "<:Sugar:866144837228560384>",
			artisanprice: 9000,
			machine: "Sugar Mill",
			machineid: "sugar_mill",
			machineemoji: "<:Mill:868153386539819048>",
			machinecost: 2503000000,
			machinetime: 2
		},
		g: {
			base: "Grape Starter",
			baseid: "grape_starter",
			baseemoji: "<:Grape_Starter:868153383217922138>",
			basecost: 10,
			product: "Grapes",
			productid: "grapes",
			productemoji: "<:Grape:865563927542890546>",
			productprice: 6000,
			producttime: 12,
			artisan: "Wine",
			artisanid: "wine",
			artisanemoji: "<:Wine:866144836473716786>",
			artisanprice: 18000,
			machine: "Keg",
			machineid: "keg",
			machineemoji: "<:Keg:868153384463642684>",
			machinecost: 5006000000,
			machinetime: 2
		},
		ch: {
			base: "Chickens",
			baseid: "chickens",
			baseemoji: "<:White_Chicken:865563927919067146>",
			basecost: 10,
			product: "Eggs",
			productid: "eggs",
			productemoji: "<:Egg:865570697328721930>",
			productprice: 10800,
			producttime: 6,
			artisan: "Mayo",
			artisanid: "mayo",
			artisanemoji: "<:Mayonnaise:866144836247093248>",
			artisanprice: 32400,
			machine: "Mayo Machine",
			machineid: "mayo_machine",
			machineemoji: "<:Mayonnaise_Machine:868153384216174593>",
			machinecost: 9010802500,
			machinetime: 2
		},
		co: {
			base: "Cows",
			baseid: "cows",
			baseemoji: "<:White_Cow:865563928414388235>",
			basecost: 10,
			product: "Milk",
			productid: "milk",
			productemoji: "<:Milk:865570697330032670>",
			productprice: 16200,
			producttime: 8,
			artisan: "Cheese",
			artisanid: "cheese",
			artisanemoji: "<:Cheese:866144836330848266>",
			artisanprice: 48600,
			machine: "Cheese Press",
			machineid: "cheese_machine",
			machineemoji: "<:Cheese_Press:868153383138254899>",
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