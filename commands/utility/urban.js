const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const querystring = require('querystring');

module.exports = {
	name: 'urban',
	description: 'Urban dictionary it!',
	args: true,
	async execute(message, args, client, lib) {
		const query = querystring.stringify({ term: args.join(' ') });

		const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`)
				.then(response => response.json());
				
		if (!list.length) {
			return message.channel.send(`No results found for **${args.join(' ')}**.`);
		}

		const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

		const answer = list[0];

		const embed = new MessageEmbed()
			.setColor(lib.Colors.rand())
			.setTitle(answer.word)
			.setURL(answer.permalink)
			.addFields(
				{ name: 'Definition', value: trim(answer.definition, 1024) },
				{ name: 'Example', value: trim(answer.example, 1024) }
			)
			.setTimestamp()
			.setFooter(lib.footer());
			message.channel.send(embed);
	},
};