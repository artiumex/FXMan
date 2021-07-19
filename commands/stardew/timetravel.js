module.exports = {
	name: 'timetravel',
	description: 'Boosts the mentioned person!',
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

		animals.chickens.pet = timetravel;
		animals.cows.pet = timetravel;
		farm.parsnips.harvest = timetravel;
		farm.wheat.harvest = timetravel;
		farm.corn.harvest = timetravel;
		farm.beets.harvest = timetravel;
		farm.grapes.harvest = timetravel;

		profile.save()
			.then(lib.reply(message, 'went back in time'));
	},
};