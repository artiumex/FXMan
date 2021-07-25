module.exports = {
	name: 'emoji',
	description: 'Lists emojis for you!',
	args: false,
	async execute(message, args, client, lib) {
		if (args[0] == 'get'){
			const emoji = await client.emojis.cache.find(e => e.name = args[1]);
			if (emoji) message.channel.send(emoji.id);
			else message.channel.send(`What`);
			console.log(emoji);
			return
		} 

		var text = [];
		for (const emo of args){
			text.push(`\\${emo}`);
		}
		message.channel.send(text.join('\n'));
	},
};