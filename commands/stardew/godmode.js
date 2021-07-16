module.exports = {
	name: 'godmode',
	description: 'Makes the mentioned person a god!',
	ownerOnly: true,
	args: false,
	async execute(message, args, client, lib) {
		let mentioned = message.mentions.users.first() || message.author;
		if (mentioned.bot) return lib.reply(message, lib.responses.isbot);
		let profile = await lib.checkProf(mentioned.id);
		let { balance, farm, animals } = profile;
		
		let time = new Date();
		time = time - (24 * 3600000);
		let timetravel = new Date(time);

		balance = 10000000;
		profile.feed = 1000;
		animals.coopunlocked = true;
		animals.barnunlocked = true;
		animals.chickens = 5;
		animals.cows = 5;
		farm.parsnips.seeds = 100;
		farm.parsnips.harvest = timetravel;
		farm.wheat.seeds = 100;
		farm.wheat.harvest = timetravel;
		farm.corn.seeds = 100;
		farm.corn.harvest = timetravel;
		farm.beets.seeds = 100;
		farm.beets.harvest = timetravel;
		farm.grapes.seeds = 100;
		farm.grapes.harvest = timetravel;

		profile.save()
			.then(lib.reply(message, 'ahaha'));
	},
};