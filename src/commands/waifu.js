const { SlashCommandBuilder } = require('@discordjs/builders');
const { waifu, nsfwWaifu } = require('../datasource/waifu');
const { MessageEmbed } = require('discord.js');

const command = 'waifu';
const handler = async (interaction) => {
    const option = interaction.options.data[0] || { value: { name: false } };
    let url;
    if (option.name === 'nsfw') {
        url = await nsfwWaifu();
    } else {
        url = await waifu();
    }
    const mem = require('../utils/mem-status')();
    const img = new MessageEmbed().setImage(url);
    await interaction.reply({ embeds: [img] });
};
const commandBuilder = new SlashCommandBuilder().setName(command).setDescription('Get your waifu').addStringOption(option =>
    option.setName('nsfw').setDescription('NSFW waifu').setRequired(false)
);

module.exports = { command, handler, commandBuilder }