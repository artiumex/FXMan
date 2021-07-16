const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'nut',
	description: 'Nut!',
	args: false,
	execute(message, args, client, lib) {
		const embed = new MessageEmbed()
			.setColor(lib.Colors.rand())
			.setImage('https://cdn.discordapp.com/attachments/535599595271749632/827801978808827924/nut.png');
		message.channel.send(embed);
	},
};