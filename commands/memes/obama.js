const Canvas = require('canvas');
const discord = require('discord.js');

module.exports = {
	name: 'obama',
	description: 'Obama poggers!',
	args: false,
	async execute(message, args, client, lib) {
		const canvas = Canvas.createCanvas(760, 481);
		const context = canvas.getContext('2d');
		
		const background = await Canvas.loadImage('./content/obama.jpg');
		context.drawImage(background, 5, 5, canvas.width-10, canvas.height-10);
		
		context.strokeStyle = lib.Colors.randHex();
		context.lineWidth = 10;
		context.strokeRect(0, 0, canvas.width, canvas.height);
		
		const mentionList = message.mentions.users.map(user => {
				return {"id":user.id, "name":user.username}
			});
		const mentioned = mentionList.shift()
		
		//put the image of the mentioned person on the left guy's head
		var avatar1;
		if (!message.mentions.users.size) avatar1 = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'jpg' }));	
		else avatar1 = await Canvas.loadImage(client.users.cache.get(mentioned.id).displayAvatarURL({ format: 'jpg' }));

		context.drawImage(avatar1, 160, 96, 200, 200);
		
		//put the image of the person who sent the command on the right guy's head
		
		var avatar2 = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'jpg' }));

		context.drawImage(avatar2, 380, 10, 200, 200);
		
		const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'output.png');
		
		message.channel.send(attachment);
	},
};