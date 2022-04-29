const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { hyperlink } = require('@discordjs/builders');
const { anime } = require('../datasource/anime');
const normalize = require('../utils/text-ellipsis');
const logger = require('../logger/logger');

const command = 'anime';
const handler = async (interaction) => {
    try {
        const option = interaction.options.data[0] || { value: { name: false } };
        if (option.name === 'q') {
            await interaction.deferReply();
            const { title, description, posterHref, streams } = await anime(option.value);
            const watchStream = streams.reduce((acc, curr) => {
                acc = acc + `${hyperlink(curr.name, curr.href)} \n`;
                return acc;
            },'');
            const embed = new MessageEmbed()
                .setColor('#209cee')
                .setTitle(title)
                .addField('Description', normalize(description) || 'no description')
                .addField('Watch Legal', watchStream || 'no video provider', true)
                .addField('Watch Ilegal', `comming soon`, true)
                .setImage(posterHref)
            await interaction.editReply({ content: title, ephermal: true });
            return interaction.channel.send({ embeds: [embed] });
        }
        await interaction.reply(`tunggu ya... layanan belum siap`);
    } catch (err) {
        // console.log(err.message);
        if (interaction.deferred) return await interaction.editReply(`error command, please report to the administrator`);
        await interaction.reply(`error command, please report to the administrator`);
        logger.error(err);
    }
};

const commandBuilder = new SlashCommandBuilder()
    .setName(command)
    .setDescription('update anime harianmu')
    .addStringOption(option =>
        option.setName('q').setDescription('query anime').setRequired(false)
    );

module.exports = { command, handler, commandBuilder }