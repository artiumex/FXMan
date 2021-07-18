const data = {
  "name": "buy",
  "description": "Buys goods from Pierre!",
  "options": [
    {
      "type": 3,
      "name": "item",
      "description": "The item to buy.",
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
          "name": "hay",
          "value": "hay"
        },
      ]
    },
    {
      "type": 4,
      "name": "amount",
      "description": "The amount of goods to sell",
      "required": true
    }
  ]
}

module.exports = {
	name: data.name,
	data: data,
	async execute(client, interaction, args, respond, followup, lib) {
		const [item, amount] = args;
		respond(interaction, `Attempting to buy ${amount.value} ${item.value}(s)`);
		const profile = await lib.checkProf(interaction.member.user.id);
		
		const runthrough = async (buycost, buything) => {
			let amt = amount.value;
			if (0 > amt || (buycost * amt) > profile.blalance) amt = Math.floor(profile.balance / buycost);
			profile.balance -= buycost * amt;
			buything(amt);
			await profile.save();
			followup(interaction, `Bought ${amt} ${item.value}! Your balance is now: \$${profile.balance}`);
		}

		if (item.value == 'parsnips') runthrough(
			20, (amount) => profile.farm.parsnips.seeds += amount
		);
		else if (item.value == 'wheat') runthrough(
			10, (amount) => profile.farm.wheat.seeds += amount
		);
		else if (item.value == 'corn') runthrough(
			25, (amount) => profile.farm.corn.seeds += amount
		);
		else if (item.value == 'beets') runthrough(
			20, (amount) => profile.farm.corn.seeds += amount
		);
		else if (item.value == 'grapes') runthrough(
			60, (amount) => profile.farm.grapes.seeds += amount
		);
		else if (item.value == 'hay') runthrough(
			50, (amount) => profile.feed += amount
		);
	},
};