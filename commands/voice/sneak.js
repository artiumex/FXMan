module.exports = {
	name: 'sneak',
	description: 'Sneaks the bot into a channel you\'re not in',
	args: true,
	execute(message, args, client, lib, connectionFunc) {
		if(parseInt(args[0])){
			const channel = client.channels.cache.get(args[0]);
			channel.join().then(connect => conectionFunc(1, connect));
		}
	},
};