const { SlashCommandBuilder } = require('@discordjs/builders');
const { waifu, nsfwWaifu } = require('../datasource/waifu');
const { MessageAttachment } = require('discord.js');
const PLUS_18_CHANNEL_ID = '834629920319340574'

const command = 'waifu';
const handler = async (interaction) => {
    const option = interaction.options.data[0] || { value: { name: false } };
    let url;
    if (option.name === 'nsfw') {
        if (interaction.channelId != PLUS_18_CHANNEL_ID) return await interaction.reply('Mohon jalankan di channel #bahas-18-plus');
        url = await nsfwWaifu();
    } else {
        url = await waifu();
    }
    await interaction.deferReply();
    await interaction.editReply({ files: [new MessageAttachment(url)] });
};
const commandBuilder = new SlashCommandBuilder().setName(command).setDescription('Get your waifu').addStringOption(option =>
    option.setName('nsfw').setDescription('NSFW waifu').setRequired(false)
);

module.exports = { command, handler, commandBuilder }