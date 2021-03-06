const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios').default;
const cheerio = require('cheerio');
const logger = require('../logger/logger');

const command = 'emas';
const handler = async (interaction) => {
    try {
        let htmlData = (await axios.get('https://pluang.com/widgets/price-graph/desktop-vertical')).data;
        let harga = cheerio.load(htmlData)('#gold-price').text().replace(/\D/g, '');
        await interaction.reply(`Harga emas hari ini : ${harga}`);
    } catch (err) {
        await interaction.reply(`Error geting harga emas`);
        logger.error(err);
    }
};
const commandBuilder = new SlashCommandBuilder().setName(command).setDescription('ketahui harga emas hari ini');

module.exports = { command, handler, commandBuilder }