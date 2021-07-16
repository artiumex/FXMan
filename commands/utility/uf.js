const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'uf',
	description: 'Useless facts!',
	args: false,
	async execute(message, args, client, lib) {
		const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en')
			.then(response => response.json());
		
		const embed = new MessageEmbed()
			.setColor(lib.Colors.rand())
			.setTitle('Useless Facts')
			.setURL(response.permalink)
			.setDescription(response.text);
		message.channel.send(embed);
	},
};