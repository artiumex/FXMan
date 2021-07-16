module.exports = {
	name: 'divorce',
	description: 'Splits up the family!',
	args: false,
	async execute(message, args, client, lib, currency) {
		let selfprofile = await lib.checkProf(message.author.id);
		if (selfprofile.spouse == '0') return lib.reply(message, 'you aren\'t married. you good?');
		let themprofile = await currency.findOne({
			userid: selfprofile.spouse
		});

		selfprofile.spouse = '0';
		themprofile.spouse = '0';

		await selfprofile.save();
		await themprofile.save();

		lib.reply(message, `${message.author} is no longer married! :partying_face:`);
	},
}