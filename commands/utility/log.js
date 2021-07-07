module.exports = {
	name: 'log',
	description: 'Logs args to console for debugging.',
	args: false,
	execute(message, args, client, lib) {
		console.log(args.join(' '));
	},
};