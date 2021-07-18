const data = {
  "name": "sell",
  "description": "Sells goods to Pierre!",
  "options": [
    {
      "type": 3,
      "name": "item",
      "description": "The item to sell.",
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
		respond(interaction, `Attempting to sell ${amount.value} ${item.value}(s)`);
		const profile = await lib.checkProf(interaction.member.user.id);

		const runthrough = async (sellcost, stock, sellthing) => {
			let amt = amount.value;
			if (0 > amt || amt > stock) amt = stock;
			profile.balance += sellcost * amt;
			sellthing(amt);
			await profile.save();
			followup(interaction, `Sold ${amt} ${item.value}! Your balance is now: \$${profile.balance}`);
		}

		if (item.value == 'parsnips') runthrough(
			35, profile.farm.parsnips.silo,
			(amount) => profile.farm.parsnips.silo -= amount
		);
		else if (item.value == 'wheat') runthrough(
			25, profile.farm.wheat.silo,
			(amount) => profile.farm.wheat.silo -= amount
		);
		else if (item.value == 'corn') runthrough(
			50, profile.farm.corn.silo,
			(amount) => profile.farm.corn.silo -= amount
		);
		else if (item.value == 'beets') runthrough(
			50, profile.farm.beets.silo,
			(amount) => profile.farm.beets.silo -= amount
		);
		else if (item.value == 'grapes') runthrough(
			80, profile.farm.grapes.silo, 
			(amount) => profile.farm.grapes.silo -= amount
		);
		else if (item.value == 'hay') runthrough(
			10, profile.feed,
			(amount) => profile.feed -= amount
		);
		else if (item.value == 'flour') runthrough(
			50, profile.artisan.flour,
			(amount) => profile.artisan.flour -= amount
		);
		else if (item.value == 'oil') runthrough(
			100, profile.artisan.oil,
			(amount) => profile.artisan.oil -= amount
		);
		else if (item.value == 'sugar') runthrough(
			100, profile.artisan.sugar,
			(amount) => profile.artisan.sugar -= amount
		);
		else if (item.value == 'wine') runthrough(
			240, profile.artisan.wine,
			(amount) => profile.artisan.wine -= amount
		);
		else if (item.value == 'mayo') runthrough(
			130, profile.artisan.mayo,
			(amount) => profile.artisan.mayo -= amount
		);
		else if (item.value == 'cheese') runthrough(
			150, profile.artisan.cheese,
			(amount) => profile.artisan.cheese -= amount
		);
	},
};