module.exports = {
	name: 'apay',
	description: 'Admin pay!',
	ownerOnly: true,
	args: true,
	async execute(message, args, client, lib, currency) {
		let mentioned = message.author;
		if (message.mentions.users.first()) {
			mentioned = message.mentions.users.first();
			args.shift();
		}
		if (mentioned.bot) return lib.reply(message, lib.responses.isbot);
		let profile = await lib.checkProf(mentioned.id);
		
		if (!args[0]) return message.channel.send('Provide an amount!');

		profile.balance += Number(args[0]);
		await profile.save();

		lib.reply(message, `${message.author.username} gave ${mentioned.username} \$${args[0]}`);
	},
};