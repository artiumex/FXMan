module.exports = {
	name: 'say',
	description: 'Says stuff!',
	args: false,
	async execute(message, args, client, lib) {
		message.channel.send(args.join(' '));
		// message.channel.send('<a:shed:868657049532268615>');
	},
};