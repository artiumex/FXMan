const data = {
  "name": "farm",
  "description": "Displays your farm",
  "options": [
    {
      "type": 6,
      "name": "mentioned",
      "description": "Show someone else's farm",
      "required": false
    }
  ]
}

const {MessageEmbed} = require('discord.js');

module.exports = {
	name: data.name,
	data: data,
	async execute(client, interaction, args, respond, followup, lib) {
		respond(interaction, `Fetching farm....`);
		let mentioned = interaction.member.user;
		if (args) mentioned = await client.users.cache.get(args[0].value);

		const profile = await lib.checkProf(mentioned.id);
		const embed = lib.embed()
			.setTitle(`**${mentioned.username}'s Farm :heart:**`);

		const { farm, animals, feed } = profile;
		const farmtime = (crop, t) => {
			var output = `${crop.seeds} ${t.emoji}`;
			if (lib.farmtime(crop, t.time)) output += " [READY]";
			else output += " [NOT READY]"
			return output
		}

		var text = [], silo = [];
		
		if ((animals.coopunlocked || animals.barnunlocked) && feed) silo.push(`Hay: ${feed} ${lib.farm.emoji.hay}`);
		
		text.push(`\n${lib.farm.emoji.shippingbox} *Crops*:`);
		text.push(`Parsnips: ${farmtime(farm.parsnips, lib.farm.parsnips)}`);
		if (farm.parsnips.silo) silo.push(`Parsnips: ${farm.parsnips.silo} ${lib.farm.parsnips.emoji}`);
		
		if (farm.wheat.seeds) {
			text.push(`Wheat: ${farmtime(farm.wheat, lib.farm.wheat)}`);
			silo.push(`Wheat: ${farm.wheat.silo} ${lib.farm.wheat.emoji}`);
		}

		if (farm.corn.seeds) {
			text.push(`Corn: ${farmtime(farm.corn, lib.farm.corn)}`);
			silo.push(`Corn: ${farm.corn.silo} ${lib.farm.corn.emoji}`);
		}

		if (farm.beets.seeds) {
			text.push(`Beets: ${farmtime(farm.beets, lib.farm.beets)}`);
			silo.push(`Beets: ${farm.beets.silo} ${lib.farm.beets.emoji}`);
		}

		if (farm.grapes.seeds) {
			text.push(`Grapes: ${farmtime(farm.grapes, lib.farm.grapes)}`);
			silo.push(`Grapes: ${farm.grapes.silo} ${lib.farm.grapes.emoji}`);
		}

		if (animals.coopunlocked){
			text.push(`\n${lib.farm.emoji.coop} *Coop*`);
			text.push(`Chickens: ${animals.chickens} ${lib.farm.emoji.chicken}`);
			if (animals.eggs) silo.push(`Eggs: ${animals.eggs} ${lib.farm.emoji.egg}`);
		}

		if (animals.barnunlocked){
			text.push(`\n${lib.farm.emoji.barn} *Barn*`);
			text.push(`Cows: ${animals.cows} ${lib.farm.emoji.cow}`);
			if (animals.milk) silo.push(`Milk: ${animals.milk} ${lib.farm.emoji.milk}`);
		}

		if (silo.length){
			text.push(`\n${lib.farm.emoji.silo} *Silo*`);
			text.push(silo.join('\n'));
		} 

		embed.setDescription(text.join('\n'));

		followup(interaction, embed, true)
	},
};