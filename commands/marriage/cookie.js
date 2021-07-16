module.exports = {
	name: 'cookie',
	description: 'Gives someone a cookie!',
	args: true,
	async execute(message, args, client, lib, currency) {
		let mentioned = message.mentions.users.first();
		if (!mentioned) return message.channel.send('You need to mention someone!');
		if (mentioned.bot && mentioned.id !== lib.botid) return lib.reply(message, lib.responses.isbot);

		if (mentioned.id == message.author.id) return lib.reply(message, lib.responses.selfdid);

		lib.reply(message, `${message.author} gave ${mentioned} a cookie! :cookie:`);
	},
};