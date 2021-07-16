module.exports = {
	name: 'leaderboard',
	description: 'Displays EVRYONES balance!',
	ownerOnly: true,
	args: false,
	async execute(message, args, client, lib, currency) {
		let lb = await currency.find();
		
		var textyboi = [];
		for (person of lb) {
			let name = client.users.cache.find(e => e.id == person.userid).username;
			textyboi.push(`${name} with \$${person.balance}`);
		}

		lib.reply(message, textyboi.join('\n'));
	},
};