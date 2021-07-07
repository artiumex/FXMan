const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ahaha',
	description: 'Ahaha!',
	args: false,
	execute(message, args, client, lib) {
		const embed = new MessageEmbed()
			.setColor(lib.Colors.rand())
			.setImage('https://cdn.discordapp.com/attachments/535599595271749632/827802373874253824/image0-7.png');
		message.channel.send(embed);
	},
};