module.exports = {
	name: 'yo',
	description: 'Yoooooo!',
	ownerOnly: true,
	args: false,
	async execute(message, args, client, lib, currency) {
		let del = await currency.deleteMany();

		lib.reply(message, 'deleted everything, lol');
	},
};