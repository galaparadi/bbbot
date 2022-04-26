require('dotenv').config();
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const app = require('express')();
const commandHandler = require('./lib/commands-provider');
const messageProvider = require('./lib/messages-provider');

client.once('ready', () => console.log("da bot is logged in"));

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;
    commandHandler[commandName](interaction);
});

client.login(process.env.BOT_TOKEN);

app.use(require('body-parser').urlencoded({ extended: false }));

for (const handler of messageProvider) {
    app.post(handler.route, handler.handler(client));
}

app.listen(process.env.MESSAGE_PORT || 1111, () => {
    console.log('ready for listening message');
});