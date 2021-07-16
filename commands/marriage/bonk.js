const prompter = require('discordjs-prompter');

module.exports = {
	name: 'bonk',
	description: 'Bonks someone!',
	args: true,
	async execute(message, args, client, lib, currency) {
		let mentioned = message.mentions.users.first();
		if (!mentioned) return message.channel.send('You need to mention someone!');
		if (mentioned.bot && mentioned.id !== lib.botid) return lib.reply(message, lib.responses.isbot);

		let selfprofile = await lib.checkProf(message.author.id);

		let bonked = `${message.author} and ${mentioned} bonked!`

		if (mentioned.id == lib.botid) {
			if (selfprofile.spouse == lib.botid) return lib.reply(message, bonked);
			else return lib.reply(message, 'nah brah');
		} else if (mentioned.id == message.author.id) return lib.reply(message, lib.responses.selfdid);

		if (selfprofile.spouse !== mentioned.id) return lib.reply(message, `you guys aren't married. not holy.`);

		const response = await prompter
      .reaction(message.channel, {
        question: `${mentioned} do you wanna bonk ${message.author}?`,
        userId: mentioned.id,
      });
		
		if (response == 'yes'){
			lib.reply(message, bonked);
		} else {
			lib.reply(message, 'suppose they didnt want to bonk you lol');
		}
	},
};