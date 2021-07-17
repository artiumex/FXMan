const data = {
  "name": "pierre",
  "description": "Exchanges goods with Pierre!",
  "options": [
    {
      "type": 3,
      "name": "item",
      "description": "The item to exchange.",
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
      "type": 3,
      "name": "exch",
      "description": "Choose whether to buy or sell",
      "required": true,
      "choices": [
        {
          "name": "buy",
          "value": "buy"
        },
        {
          "name": "sell",
          "value": "sell"
        }
      ]
    },
    {
      "type": 4,
      "name": "amount",
      "description": "The amount of goods to exchange",
      "required": true
    }
  ]
}

module.exports = {
	name: data.name,
	data: data,
	async execute(client, interaction, args, respond, followup, lib) {
		const [item, exch, amount] = args;
		respond(interaction, `Attempting to ${exch.value} ${amount.value} ${item.value}(s)`);
		
		const profile = await lib.checkProf(interaction.member.user.id);
		const runthrough = async (buycost, sellcost, stock, buything, sellthing) => {
			if (exch.value == 'buy') {
				if (!buycost) return followup(interaction, `You can't buy that!`);
				if((buycost * amount.value) < profile.balance){
					profile.balance -= buycost * amount.value;
					buything(amount.value);
					await profile.save();
					followup(interaction, `Bought ${amount.value} ${item.value}`);
				} else return followup(interaction, `You dont have enough money!`);
			} else if (exch.value == 'sell') {
				if (!sellcost) return followup(interaction, `You can't sell that!`);
				if(stock >= amount.value){
					profile.balance += sellcost * amount.value;
					sellthing(amount.value);
					await profile.save();
					followup(interaction, `Sold ${amount.value} ${item.value}`);
				} else return followup(interaction, `You dont have enough!`);
			}
		}

		if (item.value == 'parsnips') runthrough(
			20, 35, profile.farm.parsnips.silo,
			(amount) => profile.farm.parsnips.seeds += amount, 
			(amount) => profile.farm.parsnips.silo -= amount
		);
		else if (item.value == 'wheat') runthrough(
			10, 25, profile.farm.wheat.silo,
			(amount) => profile.farm.wheat.seeds += amount, 
			(amount) => profile.farm.wheat.silo -= amount
		);
		else if (item.value == 'corn') runthrough(
			25, 50, profile.farm.corn.silo,
			(amount) => profile.farm.corn.seeds += amount, 
			(amount) => profile.farm.corn.silo -= amount
		);
		else if (item.value == 'beets') runthrough(
			20, 50, profile.farm.beets.silo,
			(amount) => profile.farm.corn.seeds += amount, 
			(amount) => profile.farm.corn.silo -= amount
		);
		else if (item.value == 'grapes') runthrough(
			60, 80, profile.farm.grapes.silo,
			(amount) => profile.farm.grapes.seeds += amount, 
			(amount) => profile.farm.grapes.silo -= amount
		);
		else if (item.value == 'hay') runthrough(
			50, 10, profile.feed,
			(amount) => profile.feed += amount, 
			(amount) => profile.feed -= amount
		);
	},
};