module.exports = {
	name: 'wire',
	description: 'Wire someone some money!',
	args: true,
	async execute(message, args, client, lib, currency) {
		let mentioned = message.author;
		if (message.mentions.users.first()) {
			mentioned = message.mentions.users.first();
			args.shift();
		} else return message.channel.send('You need to mention someone!');
		if (mentioned.bot) return lib.reply(message, lib.responses.isbot);

		let themprofile = await lib.checkProf(mentioned.id);
		let selfprofile = await lib.checkProf(message.author.id);
		let wireamt = Number(args[0]);
		if (!wireamt) return message.channel.send('Provide a wire amount!')

		if (selfprofile.balance >= wireamt) {
			selfprofile.balance -= wireamt;
			themprofile.balance += wireamt;

			await selfprofile.save();
			await themprofile.save();
		} else return lib.reply(message, 'YO THIS BITCH DONT GOT THE MONEY');

		const embed = new MessageEmbed()
			.setColor(lib.Colors.rand())
			.setDescription(`${message.author.username} gave ${mentioned.username} \$${wireamt}`);

		message.channel.send(embed);
	},
};