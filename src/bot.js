require('dotenv').config();
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const app = require('express')();
const commandHandler = require('./commands/commands');

client.once('ready', () => console.log("da bot is login"));

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;
    commandHandler[commandName](interaction);
});

client.login(process.env.BOT_TOKEN);

app.use(require('body-parser').urlencoded({ extended: false }));

app.post('/', (req, res) => {
    if (req.body.key !== 'secret') return res.send('not authorized');
    client.channels.cache.get('962275276337864706').send(req.body.message);
    res.send('done');
});

app.listen(1111, () => {
    console.log('ready for listening message');
});