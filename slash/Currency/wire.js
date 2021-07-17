const data = {
  "name": "wire",
  "description": "Wires someone some money",
  "options": [
    {
      "type": 6,
      "name": "mentioned",
      "description": "The person you want to pay",
      "required": true
    },
    {
      "type": 4,
      "name": "amount",
      "description": "The amount of money to give",
      "required": true
    }
  ]
}

const { MessageEmbed } = require('discord.js');

module.exports = {
	name: data.name,
	data: data,
	async execute(client, interaction, args, respond, followup, lib) {
		respond(interaction, `Fetching and updating balances....`);
		const [ mentioned, amount ] = args;
		const self = interaction.member.user;
		const them = await client.users.cache.get(mentioned.value);

		const selfprofile = await lib.checkProf(self.id);
		const themprofile = await lib.checkProf(them.id);

		if (selfprofile.balance > amount.value) {
			selfprofile.balance -= amount.value;
			themprofile.balance += amount.value;

			await selfprofile.save();
			await themprofile.save();
		} else return followup(interaction, `You dont have \$${amount.value}!`);

		const embed = lib.embed()
			.setDescription(`**${self.username}** gave **${them.username}** \$${amount.value}`);
		followup(interaction, embed, true);
	},
};