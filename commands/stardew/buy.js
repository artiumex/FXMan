module.exports = {
	name: 'buy',
	description: 'One-Time purchases for your farm!',
	args: false,
	async execute(message, args, client, lib) {
		let profile = await lib.checkProf(message.author.id);
		let { balance, farm, animals } = profile;

		const costs = {
			coop: 4400 ,
			barn: 6500,
		}

		const runthrough = async (buycost, buything) => {
			let amt = Number(args[1]);
			if (!Number(args[1])) return lib.reply(message,'please provide an amount!');
			if (profile.balance < buycost) return lib.reply(message, `You dont have enough money to buy that!`);
			profile.balance -= buycost * amt;
			buything();
			await profile.save();
			lib.reply(message, `Bought ${args[0]}! Your balance is now: \$${profile.balance}`);
		}

		if (!args.length) {
			var text = [];
			const embed = lib.embed().setTitle(`Town Agricultural Market ${lib.emoji.heart}`);
			var allBought = true;
			if (!profile.animals.chickens.building){
				allBought = false;
				text.push(`${lib.emoji.coop} Coop | ${costs.coop}`);
			}
			if (!profile.animals.cows.building){
				allBought = false;
				text.push(`${lib.emoji.barn} Barn | ${costs.barn}`);
			}
			if (allBought) text = ['You have everything you need!'];
			embed.setDescription(text);
			return message.channel.send(embed);
		} else {
			let item = args[0];
			if (item == 'coop') runthrough(costs.coop, () => profile.animals.chickens.building = true);
			else if (item == 'barn') runthrough(costs.barn, () => profile.animals.cows.building = true);
			else return lib.reply(message,'We don\'t sell that here!');
		}
	},
};
