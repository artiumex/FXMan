module.exports = {
	name: 'harvest',
	description: 'Harvests a crop!',
	args: true,
	usage: '<crop>',
	async execute(message, args, client, lib, currency) {
		let profile = await lib.checkProf(message.author.id);
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
		//if else chain
		if (lib.farm.parsnips.names.includes(args[0])) stuff.p();
		else if (lib.farm.wheat.names.includes(args[0])) stuff.w();
		else if (lib.farm.corn.names.includes(args[0])) stuff.c();
		else if (lib.farm.beets.names.includes(args[0])) stuff.b();
		else if (lib.farm.grapes.names.includes(args[0])) stuff.g();
		else if (['all', 'most'].includes(args[0])){
			stuff.p();
			stuff.w();
			stuff.c();
			stuff.b();
			stuff.g();
		}
		else lib.reply(message, `what is *${args[0]}*? lol.`)

		if (changes) profile.save();
		lib.reply(message, text.join('\n'));
	},
};