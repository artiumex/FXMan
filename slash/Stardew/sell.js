const LIB = require('../../lib.js');

const data = {
  "name": "sell",
  "description": "Sells items",
  "options": [
    {
      "type": 1,
      "name": "farm",
      "description": "Sells items from your farm",
      "options": [
        {
          "type": 3,
          "name": "item",
          "description": "The item you want to sell",
          "required": true,
          "choices": []
        },
        {
          "type": 4,
          "name": "amount",
          "description": "The amount of items you want to sell",
          "required": true
        }
      ]
    },
    {
      "type": 1,
      "name": "artisan",
      "description": "Sells items from your artisan machines",
      "options": [
        {
          "type": 3,
          "name": "item",
          "description": "The item you want to collect",
          "required": true,
          "choices": []
        },
        {
          "type": 4,
          "name": "amount",
          "description": "The amount of items you want to sell",
          "required": true
        }
      ]
    }
  ]
}
for (const i of LIB.stardews.all){
	const item = LIB.stardew[i];
	const farmoption = {
		"name": item.productid,
		"value": item.productid
	}
	const artoption = {
		"name": item.artisanid,
		"value": item.artisanid
	}
	data.options[0].options[0].choices.push(farmoption);
	data.options[1].options[0].choices.push(artoption);
}
data.options[0].options[0].choices.push({"name":'allfarm',"value":'allfarm'});
data.options[1].options[0].choices.push({"name":'allartisan',"value":'allartisan'});

module.exports = {
	name: data.name,
	data: data,
	async execute(client, interaction, self, args, respond, followup, lib) {
		respond(interaction, `Selling items....`);
		const profile = await lib.checkProf(self.id);
		const embed = lib.embed();

		var items = [];
		var choice = args[0].options[0].value;
		if (choice == 'allfarm'){
			for (const i of lib.stardews.all) items.push(lib.stardew[i].productid);
		} else if (choice == 'allartisan'){
			for (const i of lib.stardews.all) items.push(lib.stardew[i].artisanid);
		} else items.push(choice);

		var amount = args[0].options[1].value;
		var text = [];
		for (const i of lib.stardews.all){
			const item = lib.stardew[i];
			for (const trueitem of items){
				if (trueitem == item.productid){
					if (amount < 1) amount = profile[item.productid];
					if (profile[item.productid] >= amount){
						profile[item.productid] -= amount;
						profile.balance += item.productprice * amount;
						text.push(`Sold ${amount} ${item.product}! You now have ${profile[item.productid]} ${item.productemoji} and \$${profile.balance}!`);
					} else text.push(`Could not sell ${item.base}!\nItem Amount: ${profile[item.productid]} ${item.productemoji}`);
				} else if (trueitem == item.artisanid){
					if (amount < 1) amount = profile[item.artisanid];
					if (profile[item.artisanid] >= amount){
						profile[item.artisanid] -= amount;
						profile.balance += item.artisanprice * amount;
						text.push(`Sold ${amount} ${item.artisan}! You now have ${profile[item.artisanid]} ${item.artisanemoji} and \$${profile.balance}!`);
					} else text.push(`Could not sell ${item.artisan}! Item Amount: ${profile[item.artisanid]} ${item.artisanemoji}`);
				}
			}
		}
		embed.setDescription(text.join('\n'));
		await profile.save();
		followup(interaction,embed,true);
	},
};