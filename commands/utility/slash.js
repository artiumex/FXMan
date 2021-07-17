module.exports = {
	name: 'slash',
	description: 'Reload slash commands!',
	ownerOnly: true,
	args: false,
	async execute(message, args, client, lib) {
		for (const guild of lib.testGuilds){
			const guildSlashes = await client.api.applications(client.user.id).guilds(guild).commands.get();
			for (const delcmd of guildSlashes){
				client.api.applications(client.user.id).guilds(guild).commands(delcmd.id).delete();
			}
			for (const slashcmd of client.slashcommands){
				const slash = slashcmd[1];
				client.api.applications(client.user.id).guilds(guild).commands.post({data: slash.data});
			}
		}
		lib.reply(message,'Reloaded commands!');
	},
};