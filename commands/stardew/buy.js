module.exports = {
	name: 'buy',
	description: 'Buys stuff for your farm!',
	args: false,
	async execute(message, args, client, lib) {
		let profile = await lib.checkProf(message.author.id);

		if (!args.length){
			const embed = lib.embed()
				.setTitle(`Town Agricultural Market ${lib.emoji.heart}`);
			var text = [];
			for (const star of lib.stardews.all){
				var boughtMachine = `**NOT BOUGHT**${lib.emoji.redcheck}`;
				const mId = lib.stardew[star].machineid;
				if (profile[mId].unlocked) boughtMachine = `**BOUGHT**${lib.emoji.greencheck}`;
				text.push(`[*${mId}*] ${lib.stardew[star].machine} | [${boughtMachine}]\nCost: \$${lib.stardew[star].machinecost}`)
			}
			embed.setDescription(text.join('\n\n'));
			return message.channel.send(embed);
		}

		const item = args.shift();
		if (!item) return lib.reply(message,'Please provide an item!');


		const runthrough = async (short) =>{
			const mId = lib.stardew[short].machineid;
			if (profile[mId].unlocked) return lib.reply(message,`You can't buy **${lib.stardew[short].machine}** more than once!`);
			if (profile.balance >= lib.stardew[short].machinecost) {
				profile[mId].unlocked = true;
				await profile.save();
				return lib.reply(message,`Successfully bought **${lib.stardew[short].machine}**!!`);
			} else {
				return lib.reply(message,`Couldn't buy **${lib.stardew[short].machine}**!`);
			}
		}

		for (const star of lib.stardews.all){
			const mId = lib.stardew[star].machineid;
			if (item.toLowerCase() == mId) runthrough(star);
		}
	},
};