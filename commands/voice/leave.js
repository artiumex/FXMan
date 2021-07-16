module.exports = {
	name: 'leave',
	description: 'Makes the bot leave the vc',
	args: false,
	execute(message, args, client, lib, currency, connectionFunc) {
		var connectionNew = connectionFunc();
		connectionNew.disconnect();
		connectionFunc(1,undefined);
	},
};