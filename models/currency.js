const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	userid: { type: String },
	balance: { type: Number, default: 0 },
	spouse: { type: String, default: '0' },
	farm: {
		parsnips: {
			seeds: { type: Number, default: 1 },
			silo: { type: Number, default: 0 },
			harvest: { type: Date, default: new Date() }
		},
		wheat: {
			seeds: { type: Number, default: 0 },
			silo: { type: Number, default: 0 },
			harvest: { type: Date, default: new Date() }
		},
		corn: {
			seeds: { type: Number, default: 0 },
			silo: { type: Number, default: 0 },
			harvest: { type: Date, default: new Date() }
		},
		beets: {
			seeds: { type: Number, default: 0 },
			silo: { type: Number, default: 0 },
			harvest: { type: Date, default: new Date() }
		},
		grapes: {
			seeds: { type: Number, default: 0 },
			silo: { type: Number, default: 0 },
			harvest: { type: Date, default: new Date() }
		},
	},
	feed: { type: Number, default: 0 },
	animals: {
		coopunlocked: { type: Boolean, default: false },
		chickens: { type: Number, default: 1 },
		eggs: { type: Number, default: 0 },
		barnunlocked: { type: Boolean, default: false },
		cows: { type: Number, default: 1 },
		milk: { type: Number, default: 0 }
	},
	artisan: {
		flour: { type: Number, default: 0 },
		oil: { type: Number, default: 0 },
		sugar: { type: Number, default: 0 },
		wine: { type: Number, default: 0 },
		mayo: { type: Number, default: 0 },
		cheese: { type: Number, default: 0 }
	},
});

module.exports = new mongoose.model('currency', schema);