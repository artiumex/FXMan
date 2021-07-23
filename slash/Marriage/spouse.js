const data = {
  "name": "spouse",
  "description": "Tells you who's married to who!",
  "options": [
    {
      "type": 6,
      "name": "mentioned",
      "description": "Find out someone else's spouse",
      "required": false
    }
  ]
}

module.exports = {
	name: data.name,
	data: data,
	async execute(client, interaction, self, args, respond, followup, lib) {
		respond(interaction, `Fetching official documents....`);
		let mentioned = self;
		if (args) mentioned = await client.users.cache.get(args[0].value);

		if (mentioned.bot && mentioned.id !== lib.botid) return followup(interaction, lib.responses.isbot);

		const profile = await lib.checkProf(mentioned.id);
		const spouse = await client.users.cache.get(profile.spouse)
		if (profile.spouse == '0') return followup(interaction, `**${mentioned.username}** is not married.`)
		var text = `**${mentioned.username}** is married to **${spouse.username}**`;

		if (mentioned.id == lib.botid ) text += '\nAnd happily, at that!';

		const embed = lib.embed()
			.setDescription(text);
		followup(interaction, embed, true)
	},
};