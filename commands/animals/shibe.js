const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'shibe',
	description: 'SHIBE!',
	args: false,
	async execute(message, args, client, lib) {
		var url = "https://shibe.online/api/shibes"
		var response = await fetch(url).then(response => response.json());

		const embed = new MessageEmbed()
		.setColor(lib.Colors.rand())
		.setDescription(lib.delivery(message.author.username))
		.setImage(response[0])
		.setTimestamp()
		.setFooter(lib.footer());

		message.channel.send(embed);
	},
};