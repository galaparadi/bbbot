require('dotenv').config();
const fs = require('node:fs');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = fs
    .readdirSync(path.join(__dirname, '..', '/commands'))
    .map(location => {
        let { commandBuilder } = require(path.join(__dirname, '..', '/commands', location));
        // commandHandler[command] = handler;
        return commandBuilder.toJSON();
    });

const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);
rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);