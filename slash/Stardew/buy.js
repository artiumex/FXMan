const LIB = require('../../lib.js');

const data = {
  "name": "buy",
  "description": "Buys something from the Town Agricultural Market",
  "options": [
    {
      "type": 3,
      "name": "item",
      "description": "Item you want to buy",
      "required": true,
      "choices": []
    },
    {
      "type": 4,
      "name": "amount",
      "description": "Amount of items to buy",
      "required": true
    }
  ]
}

for (const i of LIB.stardews.all){
	const item = LIB.stardew[i];
	const option = {
		"name": item.baseid,
		"value": item.baseid
	}
	data.options[0].choices.push(option);
}

module.exports = {
	name: data.name,
	data: data,
	async execute(client, interaction, self, args, respond, followup, lib) {
		respond(interaction, `Buying items....`);
		const profile = await lib.checkProf(self.id);
		const embed = lib.embed();

		var amount = args[1].value;

		for (const i of lib.stardews.all){
			const item = lib.stardew[i]
			if (args[0].value == item.baseid){
				if (amount < 1) amount = Math.floor(profile.balance / item.basecost);
				if (profile.balance >= (amount * item.basecost)){
					profile.balance -= (amount * item.basecost);
					profile[item.baseid].amount += amount;
					profile[item.baseid].collect = new Date();
					embed.setDescription(`Bought ${amount} ${item.base}! You now have ${profile[item.baseid].amount} ${item.baseemoji} and \$${profile.balance}!`);
				} else embed.setDescription(`Could not buy ${item.base}!\nYou have ${profile[item.baseid].amount} ${item.baseemoji} and \$${profile.balance}!`);
			}
		}

		await profile.save();
		followup(interaction,embed,true);
	},
};