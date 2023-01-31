require('dotenv').config();
const { Client, Intents } = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});
const app = require('express')();
const commandHandler = require('./lib/commands-provider');
const messageProvider = require('./lib/messages-provider');
const rpcProvider = require('./lib/rpc-provider')({ client });

client.once('ready', () => {
    console.log("da bot is logged in")
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;
    commandHandler[commandName](interaction);
});

if (!!parseInt(process.env.NO_BBB)) {
    console.log('not using bbb client');
}else{
    client.login(process.env.BOT_TOKEN).then(() => {
        if (process.env.MAINTAINANCE > 0) client.user.setActivity('@galaparadi fixing me', { type: 'WATCHING' });
    });
}

//TODO: change to TCP JSON-RPC
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(require('body-parser').json());

const jayson = require('jayson');

for (const handler of messageProvider) {
    app.post(handler.route, handler.handler(client));
}

for (const rpc of rpcProvider) {
    app.post(`/rpc${rpc.routerPath}`, jayson.server(rpc.functions).middleware());
}

app.listen(process.env.MESSAGE_PORT || 1111, () => {
    console.log('ready for listening message');
});