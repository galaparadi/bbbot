const axios = require('axios').default;
const cheerio = require('cheerio');
const channel = require('../enum/discord-channel');

const route = '/emas';
const handler = function (client) {
    return async (req, res) => {
        axios.get('https://www.indogold.id/harga-emas-hari-ini').then(res => {
            let htmlData = res.data;
            const $ = cheerio.load(htmlData);
            let harga = $('tbody > tr.odd > td:nth-child(2)').text().replace(/\D/g, '');
            client.channels.cache.get(channel.BOT_TEST).send(`harga emas ${harga}`);
        }).catch(err => console.log(err.message));
        res.send('done');
    }
}

module.exports = { route, handler }