const data = {
  "name": "hug",
  "description": "Hugs someone!",
  "options": [
    {
      "type": 6,
      "name": "mentioned",
      "description": "The person you want to hug",
      "required": true
    }
  ]
}

module.exports = {
	name: data.name,
	data: data,
	async execute(client, interaction, self, args, respond, followup, lib) {
		respond(interaction, `Warming up cuddles....`);
		const them = await client.users.cache.get(args[0].value);

		if (them.bot && them.id !== lib.botid) return followup(interaction, lib.responses.isbot);
		if (self.id == them.id) return followup(interaction, lib.responses.selfdid);

		const themprof = await lib.checkProf(them.id);
		const selfprof = await lib.checkProf(self.id);
		var text = '';

		if (selfprof.spouse == them.id){
			text = `**${self.username}** gave **${them.username}** a mighty hug!`;
		} else {
			text = `**${self.username}** gave **${them.username}** a hug!`
		}

		if (them.id == lib.botid) text += '\nAww, thanks!';

		const embed = lib.embed()
			.setDescription(text)
		followup(interaction, embed, true)
	},
};