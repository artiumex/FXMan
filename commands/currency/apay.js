module.exports = {
	name: 'apay',
	description: 'Boosts the mentioned person!',
	ownerOnly: true,
	args: true,
	async execute(message, args, client, lib) {
		let mentioned = message.author;
		if (message.mentions.users.size) {
			mentioned = message.mentions.users.first();
			args.shift();
		}
		if (mentioned.bot) return lib.reply(message, lib.responses.isbot);
		let profile = await lib.checkProf(mentioned.id);
		
		let amount = args[0];
		if (!Number(amount)) return lib.reply(message,'NO!');

		profile.balance += Number(amount);

		profile.save()
			.then(lib.reply(message, `THe moniES is now: \$${profile.balance}`));
	},
};