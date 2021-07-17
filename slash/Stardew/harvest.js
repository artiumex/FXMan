const data = {
  "name": "harvest",
  "description": "Harvests a crop!",
  "options": [
    {
      "type": 3,
      "name": "crop",
      "description": "The crop you want to harvest.",
      "required": true,
      "choices": [
        {
          "name": "parsnips",
          "value": "parsnips"
        },
        {
          "name": "wheat",
          "value": "wheat"
        },
        {
          "name": "corn",
          "value": "corn"
        },
        {
          "name": "beets",
          "value": "beets"
        },
        {
          "name": "grapes",
          "value": "grapes"
        },
        {
          "name": "all",
          "value": "all"
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
		respond(interaction, `Fetching balance....`);
		let self = interaction.member.user;

		const profile = await lib.checkProf(self.id);
		const { farm } = profile;
		var text = [];
		var changes = false;
		var stuff = {
			p() {
				if (lib.farmtime(farm.parsnips, lib.farm.parsnips.time)){
					farm.parsnips.silo += farm.parsnips.seeds;
					farm.parsnips.harvest = new Date();
					changes = true;
					text.push(`Harvested parsnips! You now have ${farm.parsnips.silo} ${lib.farm.parsnips.emoji}`);
				} else text.push('Could not harvest parsnips!');
			},
			w() {
				if (lib.farmtime(farm.wheat, lib.farm.wheat.time)){
					farm.wheat.silo += farm.wheat.seeds;
					farm.wheat.harvest = new Date();
					const wheatadd = Math.floor(Math.random() * farm.wheat.seeds);
					profile.feed += wheatadd;
					changes = true;
					text.push(`Harvested wheat! You now have ${farm.wheat.silo} ${lib.farm.wheat.emoji}`);
					if (wheatadd) text.push(`Collected hay! You now have ${profile.feed} ${lib.farm.emoji.hay}`);
				} else text.push('Could not harvest wheat!');
			},
			c() {
				if (lib.farmtime(farm.corn, lib.farm.corn.time)){
					farm.corn.silo += farm.corn.seeds;
					farm.corn.harvest = new Date();
					changes = true;
					text.push(`Harvested corn! You now have ${farm.corn.silo} ${lib.farm.corn.emoji}`);
				} else text.push('Could not harvest corn!');
			},
			b() {
				if (lib.farmtime(farm.beets, lib.farm.beets.time)){
					farm.beets.silo += farm.beets.seeds;
					farm.beets.harvest = new Date();
					changes = true;
					text.push(`Harvested beets! You now have ${farm.beets.silo} ${lib.farm.beets.emoji}`);
				} else text.push('Could not harvest beets!');
			},
			g() {
				if (lib.farmtime(farm.grapes, lib.farm.grapes.time)){
					farm.grapes.silo += farm.grapes.seeds;
					farm.grapes.harvest = new Date();
					changes = true;
					text.push(`Harvested grapes! You now have ${farm.grapes.silo} ${lib.farm.grapes.emoji}`);
				} else text.push('Could not harvest grapes!');
			},
		}
		
		if (args[0].value == 'parsnips') stuff.p();
		else if (args[0].value == 'wheat') stuff.w();
		else if (args[0].value == 'corn') stuff.c();
		else if (args[0].value == 'beets') stuff.b();
		else if (args[0].value == 'grapes') stuff.g();
		else if (args[0].value == 'all'){
			stuff.p();
			stuff.w();
			stuff.c();
			stuff.b();
			stuff.g();
		}

		if (changes) await profile.save();

		const embed = lib.embed()
			.setDescription(text.join('\n'));
		followup(interaction, embed, true)
	},
};