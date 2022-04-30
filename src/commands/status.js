const { SlashCommandBuilder } = require('@discordjs/builders');

const command = 'stat';
const handler = async (interaction) => {
    const mem = require('../utils/mem-status')();
    
    const vpsFreeMemPrecentage = (mem.freeMemory / mem.serverMemory) * 100;
    const botMemUsagePrecentage = (mem.memory / mem.serverMemory) * 100;    
    await interaction.reply(`i'm using ${mem.memory.toFixed(2)} MB (${botMemUsagePrecentage.toFixed(2)}%) | free memory on server : ${mem.freeMemory.toFixed(2)} MB (${vpsFreeMemPrecentage.toFixed(2)}%)`);
};
const commandBuilder = new SlashCommandBuilder().setName(command).setDescription('Show BBBot and BBotserver status (memory)');

module.exports = { command, handler, commandBuilder }