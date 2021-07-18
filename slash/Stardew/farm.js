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
			.setTitle(`**${mentioned.username}'s Farm** ${lib.emoji.heart}`)
			.setDescription('Your Little Farm \<3');

		const { farm, feed, animals } = profile;
		
		const farmtime = (cropprof, cropdata) => {
			var output = `${cropprof.seeds} ${cropdata.emoji} `;
			if (lib.time(cropprof.harvest, cropdata.time)) output += "[READY]";
			else output += `[${lib.breaktime(cropdata.time, cropprof.harvest)}]`;
			return output
		}
		const pettime = (animalprof, animaldata) => {
			var output = `${animalprof.amount} ${animaldata.emoji} `;
			if (lib.time(animalprof.pet, animaldata.time)) output += "[READY]";
			else output += `[${lib.breaktime(animaldata.time, animalprof.pet)}]`;
			return output
		}

		var croptext = [], silotext = [], cooptext = [], barntext = [], invtext = [];
		
		if ((animals.chickens.buildng || animals.cows.building) && feed) silotext.push(`Hay: ${feed} ${lib.emoji.hay}`);

		croptext.push(`Parsnips: ${farmtime(farm.parsnips, lib.farm.parsnips)}`);
		if (farm.parsnips.silo) silotext.push(`Parsnips: ${farm.parsnips.silo} ${lib.farm.parsnips.emoji}`);
		
		if (farm.wheat.seeds) croptext.push(`Wheat: ${farmtime(farm.wheat, lib.farm.wheat)}`);
		if (farm.wheat.silo) silotext.push(`Wheat: ${farm.wheat.silo} ${lib.farm.wheat.emoji}`);

		if (farm.corn.seeds) croptext.push(`Corn: ${farmtime(farm.corn, lib.farm.corn)}`);
		if (farm.corn.silo) silotext.push(`Corn: ${farm.corn.silo} ${lib.farm.corn.emoji}`);

		if (farm.beets.seeds) croptext.push(`Beets: ${farmtime(farm.beets, lib.farm.beets)}`);
		if (farm.beets.silo) silotext.push(`Beets: ${farm.beets.silo} ${lib.farm.beets.emoji}`);

		if (farm.grapes.seeds) croptext.push(`Grapes: ${farmtime(farm.grapes, lib.farm.grapes)}`);
		if (farm.grapes.silo) silotext.push(`Grapes: ${farm.grapes.silo} ${lib.farm.grapes.emoji}`);

		embed.addField(`\n${lib.emoji.shippingbox} Crops:`,croptext.join('\n'));

		if (animals.chickens.building){
			cooptext.push(`Chickens: ${pettime(animals.chickens, lib.animals.chickens)}`);
			if (animals.chickens.product) cooptext.push(`Eggs: ${animals.chickens.product} ${lib.animals.chickens.pemoji}`);
			embed.addField(`\n${lib.emoji.coop} Coop`, cooptext.join('\n'));
		}

		if (animals.cows.building){
			barntext.push(`Cows: ${pettime(animals.cows, lib.animals.cows)}`);
			if (animals.cows.product) barntext.push(`Milk: ${animals.cows.product} ${lib.animals.cows.pemoji}`);
			embed.addField(`\n${lib.emoji.barn} Barn`, barntext.join('\n'));
		}

		if (silotext.length) embed.addField(`${lib.emoji.silo} Silo`,silotext.join('\n'));

		if (profile.artisan.flour) invtext.push(`Flour: ${profile.artisan.flour} ${lib.artisan.flour.emoji}`);
		if (profile.artisan.oil) invtext.push(`Oil: ${profile.artisan.oil} ${lib.artisan.oil.emoji}`);
		if (profile.artisan.sugar) invtext.push(`Sugar: ${profile.artisan.sugar} ${lib.artisan.sugar.emoji}`);
		if (profile.artisan.wine) invtext.push(`Wine: ${profile.artisan.wine} ${lib.artisan.wine.emoji}`);
		if (profile.artisan.mayo) invtext.push(`Mayo: ${profile.artisan.mayo} ${lib.artisan.mayo.emoji}`);
		if (profile.artisan.cheese) invtext.push(`Cheese: ${profile.artisan.cheese} ${lib.artisan.cheese.emoji}`);

		if (invtext.length) embed.addField(`${lib.emoji.backpack} Inventory`,invtext.join('\n'));

		followup(interaction, embed, true)
	},
};