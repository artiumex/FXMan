module.exports = {
	name: 'join',
	description: 'Mkaes the bot join your vc.',
	args: false,
	async execute(message, args, client, lib, currency, connectionFunc) {
		if (message.member.voice.channel){
				var connectionNew = await message.member.voice.channel.join();
				connectionFunc(1, connectionNew);
		} else return message.channel.send('Join a voice channel first');
	},
};