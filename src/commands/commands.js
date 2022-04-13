const userHiCount = new Map();
const commandHandler = [];
const axios = require('axios').default;
const cheerio = require('cheerio');

commandHandler['hi'] = async function (interaction) {
    if (userHiCount.has(interaction.user.username)) {
        userHiCount.set(interaction.user.username, userHiCount.get(interaction.user.username) + 1);
    } else {
        userHiCount.set(interaction.user.username, 1);
    };
    await interaction.reply(`Hallo, ${interaction.user.username} sudah menyapa sebanyak ${userHiCount.get(interaction.user.username)}`);
}

commandHandler['emas'] = async function (interaction) {
    try {
        let htmlData = (await axios.get('https://pluang.com/widgets/price-graph/desktop-vertical')).data;
        let harga = cheerio.load(htmlData)('#gold-price').text().replace(/\D/g, '');
        await interaction.reply(`Harga emas sekarang : ${harga}`);
    } catch (err) {
        console.log(err.message);
        await interaction.reply(`Error geting harga emas`);
    }
}

commandHandler['jav'] = async interaction => {
    
}

module.exports = commandHandler;