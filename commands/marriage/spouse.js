module.exports = {
	name: 'spouse',
	description: 'Displays your spouse!',
	args: false,
	async execute(message, args, client, lib, currency) {
		let mentioned = message.author;
		if (message.mentions.users.first()) {
			mentioned = message.mentions.users.first();
			args.shift();
		}
		if (mentioned.bot && mentioned.id !== lib.botid) return lib.reply(message, lib.responses.isbot);
		
		let profile = await lib.checkProf(mentioned.id);
		if (profile.spouse == '0') return lib.reply(message, 'that person isn\'t married');
		let spouse = await client.users.cache.find(e => e.id == profile.spouse);

		lib.reply(message, `${mentioned} is married to ${spouse}!`);
	},
}