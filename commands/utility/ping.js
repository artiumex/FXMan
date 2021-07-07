module.exports = {
	name: 'ping',
	description: 'Ping!',
	args: false,
	execute(message, args, client, lib) {
		message.channel.send('Pong.');
	},
};