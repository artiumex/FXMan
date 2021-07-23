module.exports = {
	name: 'loadslash',
	description: 'Loads slash commands!',
	ownerOnly: true,
	args: false,
	async execute(message, args, client, lib) {
		for (const guild of lib.testGuilds){
			for (const slashcmd of client.slashcommands){
				const slash = slashcmd[1];
				await client.api.applications(client.user.id).guilds(guild).commands.post({data: slash.data});
				console.log(`Added command: ${slash.name} in guild: ${guild}`);
			}
		}
		lib.reply(message,'loaded commands!');
	},
};