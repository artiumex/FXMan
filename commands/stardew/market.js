module.exports = {
	name: 'market',
	description: 'Markets the market.',
	args: false,
	usage: '[item id] [amount]',
	async execute(message, args, client, lib, currency) {
		const profile = await lib.checkProf(message.author.id);
		var [ bitem, bamount ] = args;

		if (!bitem) lib.reply(message, mDisplay()); 
		else if (!bamount) lib.reply(message, mDisplay());

		
	},
};