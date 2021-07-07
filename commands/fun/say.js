module.exports = {
	name: 'say',
	description: 'Make the bot say something!',
	args: true,
	execute(message, args, client, lib) {
		message.delete().catch(console.error);
		message.channel.send(args.join(" "));
	},
};