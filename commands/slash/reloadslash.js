module.exports = {
	name: 'reload',
	description: 'Reload slash commands!',
	ownerOnly: true,
	args: false,
	async execute(message, args, client, lib) {
		const slashes = await client.api.applications(client.user.id).commands.get();
		for (const delcmd of slashes){
			await client.api.applications(client.user.id).commands(delcmd.id).delete();
			console.log(`Deleted command: ${delcmd.name}`);
		}
		for (const guild of lib.testGuilds){
			const guildSlashes = await client.api.applications(client.user.id).guilds(guild).commands.get();
			for (const delcmd of guildSlashes){
				await client.api.applications(client.user.id).guilds(guild).commands(delcmd.id).delete();
				console.log(`Deleted command: ${delcmd.name} in guild: ${guild}`);
			}
			for (const slashcmd of client.slashcommands){
				const slash = slashcmd[1];
				await client.api.applications(client.user.id).guilds(guild).commands.post({data: slash.data});
				console.log(`Added command: ${slash.name} in guild: ${guild}`);
			}
		}
		lib.reply(message,'Reloaded commands!');
	},
};