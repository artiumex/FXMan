const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	link: String,
});

  module.exports = new mongoose.model('sbtns', schema);