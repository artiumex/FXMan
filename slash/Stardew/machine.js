const LIB = require('../../lib.js');

const data = {
  "name": "machine",
  "description": "Makes goods out of farm items",
  "options": [
    {
      "type": 3,
      "name": "item",
      "description": "Goods you want to make",
      "required": true,
      "choices": []
		}
  ]
}

for (const i of LIB.stardews.all){
	const item = LIB.stardew[i];
	const option = {
		"name": item.artisanid,
		"value": item.artisanid
	}
	data.options[0].choices.push(option);
}
data.options[0].choices.push({"name":"allartisan","value":"allartisan"});

module.exports = {
	name: data.name,
	data: data,
	async execute(client, interaction, self, args, respond, followup, lib) {
		respond(interaction, `Machining items....`);
		const profile = await lib.checkProf(self.id);
		const embed = lib.embed();

		var amount;

		const choice = args[0].value;
		var items = [];
		if (choice == 'allartisan') {
			for (const i of lib.stardews.all) items.push(lib.stardew[i].artisanid);
		} else items.push(choice);

		var text = [];
		for (const i of lib.stardews.all){
			const item = lib.stardew[i];
			for (const trueitem of items){
				amount = profile[item.productid];
				if (trueitem == item.artisanid){
					if (profile[item.productid] > 0){
						profile[item.productid] -= amount;
						profile[item.machineid].amount += amount;
						profile[item.machineid].collect = new Date();
						text.push(`Making ${item.artisan} in ${item.machine}!`);
					} else text.push(`Couldn't use ${item.machineemoji} ${item.machine}!`);
				}
			}
		}
		embed.setDescription(text.join('\n'));
		await profile.save();
		followup(interaction,embed,true);
	},
};