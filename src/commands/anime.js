const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { ActionRow, ButtonComponent } = require('@discordjs/builders');
const { animeById, searchAnime } = require('../datasource/anime-v2');
const normalize = require('../utils/text-ellipsis');
const logger = require('../logger/logger');
const { ButtonStyle, ComponentType } = require('discord-api-types/v10');
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
            
            const row = new ActionRow();
            for (const [key, val] of Object.entries(EMOTE_NUMBER)) {
                row.addComponents(
                    new ButtonComponent().setCustomId(key).setLabel(key).setStyle(ButtonStyle.Primary)
                )
            }
            const message = await interaction.editReply({ content: `Click the number to choose anime\n${animeMessage}`, components: [row] });
            const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button, time: 5000 });
            collector.on('collect', async i => {
                const { title, description, posterHref, episodes, premiered, airing } = await animeById(animes[Number(i.customId) - 1].id);
                const embed = new MessageEmbed()
                    .setColor('#209cee')
                    .setTitle(title)
                    .addField('Description', normalize(description) || 'no description')
                    .addFields(
                        { name: "episodes", value: episodes || 'episodes', inline: true },
                        { name: "premiered", value: premiered || 'premiered', inline: true },
                        { name: "airing", value: airing || "airing", inline: true },
                    )
                    .setImage(posterHref);

                interaction.channel.send({ embeds: [embed] });
                message.delete();
                collector.stop();
            })
            collector.on('end', collected => {
                collector.stop();
            })

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