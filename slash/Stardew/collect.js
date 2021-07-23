const LIB = require('../../lib.js');

const data = {
  "name": "collect",
  "description": "Collect items from your farm",
  "options": [
    {
      "type": 1,
      "name": "farm",
      "description": "Collects items from your farm",
      "options": [
        {
          "type": 3,
          "name": "item",
          "description": "The item you want to collect",
          "required": true,
          "choices": []
        }
      ]
    },
    {
      "type": 1,
      "name": "artisan",
      "description": "Collects from your artisan machines",
      "options": [
        {
          "type": 3,
          "name": "item",
          "description": "The item you want to collect",
          "required": true,
          "choices": []
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
		respond(interaction, `Collecting items....`);
		const profile = await lib.checkProf(self.id);
		const embed = lib.embed();

		var items = [];
		var choice = args[0].options[0].value;
		if (choice == 'allfarm'){
			for (const i of lib.stardews.all) items.push(lib.stardew[i].productid);
		} else if (choice == 'allartisan'){
			for (const i of lib.stardews.all) items.push(lib.stardew[i].artisanid);
		} else items.push(choice);

		var text = []
		for (const i of lib.stardews.all){
			const item = lib.stardew[i]
			var choice = args[0].options[0].value;
			for (const trueitem of items){
				if (trueitem == item.productid){
					if (lib.time(profile[item.baseid].collect,item.producttime)){
						profile[item.productid] += profile[item.baseid].amount;
						profile[item.baseid].collect = new Date();
						text.push(`Collected ${profile[item.productid]} ${item.product}! You now have ${profile[item.productid]} ${item.productemoji}!`);
					} else text.push(`Could not collect ${item.base}!`);
				} else if (trueitem == item.artisanid){
					if (lib.time(profile[item.machineid].collect,item.machinetime)){
						profile[item.artisanid] += profile[item.machineid].amount;
						profile[item.machineid].amount = 0;
						profile[item.machineid].collect = new Date();
						text.push(`Collected ${item.artisan}! You now have ${profile[item.artisanid]} ${item.artisanemoji}!`);
					} else text.push(`Could not collect ${item.artisan}!`);
				}
			}
		}
		embed.setDescription(text.join('\n'));
		await profile.save();
		followup(interaction,embed,true);
	},
};