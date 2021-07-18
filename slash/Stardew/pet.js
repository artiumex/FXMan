const data = {
  "name": "pet",
  "description": "Pets your animals and collects products from them!",
  "options": [
    {
      "type": 3,
      "name": "animal",
      "description": "The animal you want to pet",
      "required": true,
      "choices": [
        {
          "name": "chickens",
          "value": "chickens"
        },
        {
          "name": "cows",
          "value": "cows"
        }
      ]
    }
  ]
}

const {MessageEmbed} = require('discord.js');

module.exports = {
	name: data.name,
	data: data,
	async execute(client, interaction, args, respond, followup, lib) {
		respond(interaction, `Running to the animal buildings....`);
		let self = interaction.member.user;

		const profile = await lib.checkProf(self.id);
		const { animals } = profile;
		var text = [];
		var changes = false;
		var stuff = {
			chickens() {
				if (lib.time(animals.chickens.pet, lib.animals.chickens.time)){
					if (profile.feed < animals.chickens.amount) return text.push('Not enough hay to feed your chickens!');
					else profile.feed -= animals.chickens.amount;
					animals.chickens.product += animals.chickens.amount;
					animals.chickens.pet = new Date();
					changes = true;
					text.push(`Pet your chickens! You now have ${animals.chickens.product} ${lib.animals.chickens.pemoji}!`);
				} else text.push('Could not pet chickens yet!');
			},
			cows() {
				if (lib.time(animals.cows.pet, lib.animals.cows.time)){
					if (profile.feed < animals.cows.amount) return text.push('Not enough hay to feed your cows!');
					else profile.feed -= animals.chickens.amount;
					animals.cows.product += animals.cows.amount;
					animals.cows.pet = new Date();
					changes = true;
					text.push(`Pet your cows! You now have ${animals.cows.product} ${lib.animals.cows.pemoji}!`);
				} else text.push('Could not pet cows yet!');
			}
		}
		
		if (args[0].value == 'chickens') stuff.chickens();
		else if (args[0].value == 'cows') stuff.cows();

		if (changes) await profile.save();

		const embed = lib.embed()
			.setDescription(text.join('\n'));
		followup(interaction, embed, true)
	},
};