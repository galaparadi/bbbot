const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { hyperlink } = require('@discordjs/builders');
const { animeById, searchAnime } = require('../datasource/anime-v2');
const normalize = require('../utils/text-ellipsis');
const logger = require('../logger/logger');
const EMOTE_NUMBER = {
    1: '1️⃣',
    2: '2️⃣',
    3: '3️⃣',
    4: '4️⃣',
    5: '5️⃣',
}

const command = 'anime';
const handler = async (interaction) => {
    try {
        const option = interaction.options.data[0] || { value: { name: false } };
        if (option.name === 'q') {
            await interaction.deferReply();
            const animes = await searchAnime(option.value);
            const animeMessage = animes.slice(0, 5).reduce((prev, current, index) => {
                return `${prev}\n${EMOTE_NUMBER[index + 1]} : ${current.title}`
            }, '');
            const message = await interaction.editReply({ content: `react with number to choose anime\n${animeMessage}` });
            for await (const [key, val] of Object.entries(EMOTE_NUMBER)) {
                await message.react(val);
            }

            const reactionFilter = (reaction, user) => {
                return user.id === interaction.user.id;
            };

            message.awaitReactions({ filter: reactionFilter, max: 1, time: 10000, errors: ['time'] }).then(async collected => {
                const selectedEmoji = collected.first().emoji.name;
                let index = '0';
                for (const [key, val] of Object.entries(EMOTE_NUMBER)) {
                    if (val === selectedEmoji) index = key;
                }
                const { title, description, posterHref } = await animeById(animes[index - 1].id);
                const embed = new MessageEmbed()
                    .setColor('#209cee')
                    .setTitle(title)
                    .addField('Description', normalize(description) || 'no description')
                    .setImage(posterHref)
                interaction.channel.send({ embeds: [embed] });
                message.delete();
            }).catch(err => {
                console.log('error react')
                console.log(err);
            });

            return message;
        }
        await interaction.reply(`tunggu ya... layanan belum siap`);
    } catch (err) {
        logger.error(err);
        if (interaction.deferred) return await interaction.editReply(`error command, please report to the administrator`);
        await interaction.reply(`error command, please report to the administrator`);
    }
};

const commandBuilder = new SlashCommandBuilder()
    .setName(command)
    .setDescription('update anime harianmu')
    .addStringOption(option =>
        option.setName('q').setDescription('query anime').setRequired(false)
    );

module.exports = { command, handler, commandBuilder }