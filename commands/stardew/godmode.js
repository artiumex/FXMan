module.exports = {
	name: 'godmode',
	description: 'Boosts the mentioned person!',
	ownerOnly: true,
	args: false,
	async execute(message, args, client, lib) {
		let mentioned = message.author;
		if (message.mentions.users.size) {
			mentioned = message.mentions.users.first();
			args.shift();
		}
		if (mentioned.bot) return lib.reply(message, lib.responses.isbot);
		let profile = await lib.checkProf(mentioned.id);
		
		const timetravel = new Date(Date.parse(new Date()) - (24 * 3600 * 1000));


		for (const item of lib.stardews.all){
			const { baseid, productid, artisanid, machineid } = lib.stardew[item];
			profile[baseid].amount += 50;
			profile[baseid].collect = timetravel;
			profile[productid] += 50;
			profile[artisanid] += 50;
			profile[machineid].unlocked = true;
			profile[machineid].amount += 50;
			profile[machineid].collect = timetravel;
		}

		await profile.save()
			.then(lib.reply(message, `ahaha`));
	},
};