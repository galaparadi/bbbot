const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios').default;
const cheerio = require('cheerio');

const command = 'anime';
const handler = async (interaction) => {
    try {
        // let htmlData = (await axios.get('https://pluang.com/widgets/price-graph/desktop-vertical')).data;
        // let harga = cheerio.load(htmlData)('#gold-price').text().replace(/\D/g, '');
        await interaction.reply(`tunggu ya... layanan belum siap`);
    } catch (err) {
        console.log(err.message);
        await interaction.reply(`Error geting harga emas`);
    }
};
const commandBuilder = new SlashCommandBuilder().setName(command).setDescription('update anime harianmu');

module.exports = { command, handler, commandBuilder }