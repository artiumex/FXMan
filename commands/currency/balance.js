module.exports = {
	name: 'balance',
	description: 'Shows your balance!',
	args: false,
	async execute(message, args, client, lib, currency) {
		let mentioned = message.mentions.users.first() || message.author;
		if (mentioned.bot) return lib.reply(message, lib.responses.isbot);
		let profile = await lib.checkProf(mentioned.id);

		lib.reply(message, `${mentioned.username} has \$${profile.balance}`);
	},
};