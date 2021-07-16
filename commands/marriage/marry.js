const prompter = require('discordjs-prompter');

module.exports = {
	name: 'marry',
	description: 'Proposes to someone!',
	args: true,
	async execute(message, args, client, lib, currency) {
		let mentioned = message.author;
		if (message.mentions.users.first()) {
			mentioned = message.mentions.users.first();
			args.shift();
		} else return message.channel.send('You need to mention someone!');
		if (mentioned.bot && mentioned.id !== lib.botid) return lib.reply(message, lib.responses.isbot);

		let themprofile = await lib.checkProf(mentioned.id);
		let selfprofile = await lib.checkProf(message.author.id);

		if (mentioned.id == lib.botid) {
			selfprofile.spouse = mentioned.id;
			await selfprofile.save();
			return lib.reply(message, `${message.author} is so down bad they married a bot. Society moment.`);
		} else if (mentioned.id == message.author.id) return lib.reply(message, 'no, thats fucking weird lol');

		if (selfprofile.spouse !== '0') return lib.reply(message, `aren't you married....? lol...`);
		else if (themprofile.spouse !== '0') return lib.reply(message, `they're married.... sorry.`);

		const response = await prompter
      .reaction(message.channel, {
        question: `${mentioned} do you take ${message.author}'s hand in marriage?`,
        userId: mentioned.id,
      });
		
		if (response == 'yes'){
			selfprofile.spouse = mentioned.id;
			themprofile.spouse = message.author.id;

			await selfprofile.save();
			await themprofile.save();

			lib.reply(message, `${message.author} and ${mentioned} got married!`);
		} else {
			lib.reply(message, 'guess they didnt want you lol');
		}
	},
};