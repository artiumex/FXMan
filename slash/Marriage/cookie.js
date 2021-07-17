const data = {
  "name": "cookie",
  "description": "Gives someone a cookie!",
  "options": [
    {
      "type": 6,
      "name": "mentioned",
      "description": "The person you want to give a cookie to",
      "required": true
    }
  ]
}

const {MessageEmbed} = require('discord.js');

module.exports = {
	name: data.name,
	data: data,
	async execute(client, interaction, args, respond, followup, lib) {
		respond(interaction, `Baking the cookie....`);
		const them = await client.users.cache.get(args[0].value);
		const self = interaction.member.user;

		if (them.bot && them.id !== lib.botid) return followup(interaction, lib.responses.isbot);
		if (self.id == them.id) return followup(interaction, lib.responses.selfdid);

		const themprof = await lib.checkProf(them.id);
		const selfprof = await lib.checkProf(self.id);
		var text = '';
		const cookie = `Cookie :cookie:`;

		if (selfprof.spouse == them.id){
			text = `**${self.username}** gave **${them.username}** an extra special ${cookie}!`;
		} else {
			text = `**${self.username}** gave **${them.username}** a ${cookie}!`
		}

		if (them.id == lib.botid) text += '\nAww, thanks!';

		const embed = lib.embed()
			.setDescription(text)
		followup(interaction, embed, true)
	},
};