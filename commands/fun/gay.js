const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'gay',
	description: 'what the fuck you say!',
	args: false,
	execute(message, args, client, lib) {
		const embed = new MessageEmbed()
			.setColor(lib.Colors.rand())
			.setImage('https://media.discordapp.net/attachments/535599595271749632/865451176090533928/image0.jpg');
		message.channel.send(embed);
	},
};