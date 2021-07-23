module.exports = {
	name: 'emoji',
	description: 'Lists emojis for you!',
	args: true,
	execute(message, args, client, lib) {
		var text = [];
		for (const emo of args){
			text.push(`\\${emo}`);
		}
		message.channel.send(text.join('\n'));
	},
};