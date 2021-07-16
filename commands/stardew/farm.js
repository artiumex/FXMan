module.exports = {
	name: 'farm',
	description: 'Farms your farm!',
	args: false,
	async execute(message, args, client, lib, currency) {
		let mentioned = message.author;
		if (message.mentions.users.first()) {
			mentioned = message.mentions.users.first();
			args.shift();
		}
		if (mentioned.bot) return lib.reply(message, lib.responses.isbot);
		
		lib.reply(message, 'ill work on that tmrw lol');
	},
};