const data = {
  "name": "artisan",
  "description": "Makes artisanal goods!",
  "options": [
		{
      "type": 3,
      "name": "goods",
      "description": "What you want to produce",
      "required": true,
      "choices": [
        {
          "name": "flour",
          "value": "flour"
        },
        {
          "name": "oil",
          "value": "oil"
        },
        {
          "name": "sugar",
          "value": "sugar"
        },
        {
          "name": "wine",
          "value": "wine"
        },
        {
          "name": "mayo",
          "value": "mayo"
        },
        {
          "name": "cheese",
          "value": "cheese"
        }
      ]
    },
    {
      "type": 4,
      "name": "amount",
      "description": "The amount of goods to produce",
      "required": true
    }
  ]
}

const {MessageEmbed} = require('discord.js');

module.exports = {
	name: data.name,
	data: data,
	async execute(client, interaction, args, respond, followup, lib) {
		respond(interaction, `Making artisanal machines....`);
		let self = interaction.member.user;
		const [art, amount] = args;

		const profile = await lib.checkProf(self.id);
		
		const runthrough = async (check, artEmoji, artFunc) => {
			let amt = amount.value;
			if (0 > amt || amt > check) amt = check;
			const newArt = artFunc(amt);
			await profile.save();

			const embed = lib.embed()
				.setDescription(`Made ${amt} ${art.value} ${artEmoji}! You now have ${newArt} ${artEmoji}!`);
			followup(interaction, embed, true);
		}

		if (art.value == 'flour') runthrough(profile.farm.wheat.silo, lib.artisan.flour.emoji, (amount) => {
			profile.artisan.flour += amount;
			profile.farm.wheat.silo -= amount;
			return profile.artisan.flour
		});
		if (art.value == 'oil') runthrough(profile.farm.corn.silo, lib.artisan.oil.emoji, (amount) => {
			profile.artisan.oil += amount;
			profile.farm.corn.silo -= amount;
			return profile.artisan.oil
		});
		if (art.value == 'sugar') runthrough(profile.farm.beets.silo, lib.artisan.sugar.emoji, (amount) => {
			profile.artisan.sugar += amount;
			profile.farm.beets.silo -= amount;
			return profile.artisan.oil
		});
		if (art.value == 'wine') runthrough(profile.farm.grapes.silo, lib.artisan.wine.emoji, (amount) => {
			profile.artisan.wine += amount;
			profile.farm.grapes.silo -= amount;
			return profile.artisan.wine
		});
		if (art.value == 'mayo') runthrough(profile.animals.chickens.product, lib.artisan.mayo.emoji, (amount) => {
			profile.artisan.mayo += amount;
			profile.animals.chickens.product -= amount;
			return profile.artisan.mayo
		});
		if (art.value == 'cheese') runthrough(profile.animals.cows.product, lib.artisan.cheese.emoji, (amount) => {
			profile.artisan.cheese += amount;
			profile.animals.cows.product -= amount;
			return profile.artisan.cheese
		});
	},
};