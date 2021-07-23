const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	userid: { type: String },
	balance: { type: Number, default: 0 },
	spouse: { type: String, default: '0' },
	//parsnips
	parsnip_seeds: {
		amount: { type: Number, default: 5 },
		collect: { type: Date, default: new Date() }
	},
	parsnips: { type: Number, default: 0 },
	soup: { type: Number, default: 0 },
	soup_machine: {
		unlocked: { type: Boolean, default: false },
		amount: { type: Number, default: 0 },
		collect: { type: Date, default: new Date() }
	},
	//wheat
	wheat_seeds: {
		amount: { type: Number, default: 0 },
		collect: { type: Date, default: new Date() }
	},
	wheat: { type: Number, default: 0 },
	flour: { type: Number, default: 0 },
	flour_mill: {
		unlocked: { type: Boolean, default: false },
		amount: { type: Number, default: 0 },
		collect: { type: Date, default: new Date() }
	},
	//corn
	corn_seeds: {
		amount: { type: Number, default: 0 },
		collect: { type: Date, default: new Date() }
	},
	corn: { type: Number, default: 0 },
	oil: { type: Number, default: 0 },
	oil_press: {
		unlocked: { type: Boolean, default: false },
		amount: { type: Number, default: 0 },
		collect: { type: Date, default: new Date() }
	},
	//beets
	beet_seeds: {
		amount: { type: Number, default: 0 },
		collect: { type: Date, default: new Date() }
	},
	beets: { type: Number, default: 0 },
	sugar: { type: Number, default: 0 },
	sugar_mill: {
		unlocked: { type: Boolean, default: false },
		amount: { type: Number, default: 0 },
		collect: { type: Date, default: new Date() }
	},
	//grapes
	grape_starter: {
		amount: { type: Number, default: 0 },
		collect: { type: Date, default: new Date() }
	},
	grapes: { type: Number, default: 0 },
	wine: { type: Number, default: 0 },
	keg: {
		unlocked: { type: Boolean, default: false },
		amount: { type: Number, default: 0 },
		collect: { type: Date, default: new Date() }
	},
	//chickens
	chickens: {
		amount: { type: Number, default: 0 },
		collect: { type: Date, default: new Date() }
	},
	eggs: { type: Number, default: 0 },
	mayo: { type: Number, default: 0 },
	mayo_machine: {
		unlocked: { type: Boolean, default: false },
		amount: { type: Number, default: 0 },
		collect: { type: Date, default: new Date() }
	},
	//cows
	cows: {
		amount: { type: Number, default: 0 },
		collect: { type: Date, default: new Date() }
	},
	milk: { type: Number, default: 0 },
	cheese: { type: Number, default: 0 },
	cheese_machine: {
		unlocked: { type: Boolean, default: false },
		amount: { type: Number, default: 0 },
		collect: { type: Date, default: new Date() }
	},
});

module.exports = new mongoose.model('currency', schema);