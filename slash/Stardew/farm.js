const data = {
  "name": "farm",
  "description": "Displays your farm",
  "options": [
    {
      "type": 6,
      "name": "mentioned",
      "description": "Show someone else's farm",
      "required": false
    }
  ]
}

module.exports = {
	name: data.name,
	data: data,
	async execute(client, interaction, self, args, respond, followup, lib) {
		respond(interaction, `Fetching farm....`);
		let mentioned = self;
		if (args) mentioned = await client.users.cache.get(args[0].value);

		const profile = await lib.checkProf(mentioned.id);
		const embed = lib.embed()
			.setTitle(`**${mentioned.username}'s** Farm ${lib.emoji.heart}`);
		var itemtext = [], arttext = [], silotext = [], invtext = [];

		for (const all of lib.stardews.all){
			const titem = lib.stardew[all];

			const iProf = profile[titem.baseid];
			if (iProf.amount) itemtext.push(`${titem.baseemoji} **${titem.base}** - ${iProf.amount} [${lib.countdown(iProf.collect,titem.producttime)}]`);
		
			const artProf = profile[titem.machineid];
			if (artProf.amount) arttext.push(`${titem.machineemoji} **${titem.machine}** - ${artProf.amount} [${lib.countdown(artProf.collect,titem.machinetime)}]`);
			
			if (profile[titem.productid]) silotext.push(`**${titem.product}** - ${profile[titem.productid]}`);

			if (profile[titem.artisanid]) invtext.push(`**${titem.artisan}** - ${profile[titem.artisanid]}`);
		} 
		if (itemtext.length) embed.addField(`Farm`,itemtext.join('\n'));
		if (arttext.length) embed.addField(`Shed`,arttext.join('\n'));
		if (silotext.length) embed.addField(`Silo`,silotext.join('\n'));
		if (invtext.length) embed.addField(`Inventory`,invtext.join('\n'));
		followup(interaction,embed,true);
	},
};