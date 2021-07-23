const data = {
  "name": "balance",
  "description": "Displays your balance",
  "options": [
    {
      "type": 6,
      "name": "mentioned",
      "description": "Show someone else's balance",
      "required": false
    }
  ]
}

module.exports = {
	name: data.name,
	data: data,
	async execute(client, interaction, self, args, respond, followup, lib) {
		respond(interaction, `Fetching balance....`);
		let mentioned = self;
		if (args) mentioned = await client.users.cache.get(args[0].value);

		const profile = await lib.checkProf(mentioned.id);
		
		const embed = lib.embed()
			.setDescription(`${mentioned.username} has \$${profile.balance}`)
		followup(interaction, embed, true)
	},
};