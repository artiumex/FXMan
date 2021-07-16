module.exports = {
	name: 'farm',
	description: 'Farms your farm!',
	args: false,
	async execute(message, args, client, lib, currency) {
		let mentioned = message.author;
		if (message.mentions.users.first()) {
			mentioned = message.mentions.users.first();
			args.shift();
		}
		if (mentioned.bot) return lib.reply(message, lib.responses.isbot);
		
		const { farm, animals, feed } = await lib.checkProf(mentioned.id);
		const farmtime = (crop, t) => {
			var output = `${crop.seeds} ${t.emoji}`;
			if (lib.farmtime(crop, t.time)) output += " [READY]";
			else output += " [NOT READY]"
			return output
		}

		var text = [], silo = [];
		
		if (animals.coopunlocked || animals.barnunlocked) silo.push(`Hay: ${feed} ${lib.farm.emoji.hay}`);
		
		text.push(`**${mentioned.username}'s Farm :heart:**`);
		
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
			silo.push(`Eggs: ${animals.eggs} ${lib.farm.emoji.egg}`);
		}

		if (animals.barnunlocked){
			text.push(`\n${lib.farm.emoji.barn} *Barn*`);
			text.push(`Cows: ${animals.cows} ${lib.farm.emoji.cow}`);
			silo.push(`Milk: ${animals.milk} ${lib.farm.emoji.milk}`);
		}

		if (silo.length){
			text.push(`\n${lib.farm.emoji.silo} *Silo*`);
			text.push(silo.join('\n'));
		} 
		
		lib.reply(message, text.join('\n'));
	},
};