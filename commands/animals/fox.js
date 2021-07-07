const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'fox',
	description: 'FOX!',
	args: false,
	async execute(message, args, client, lib) {
		var url = "https://randomfox.ca/floof/"
		var response = await fetch(url).then(response => response.json());

		const embed = new MessageEmbed()
		.setColor(lib.Colors.rand())
		.setDescription(lib.delivery(message.author.username))
		.setImage(response.image)
		.setTimestamp()
		.setFooter(lib.footer());

		message.channel.send(embed);
	},
};