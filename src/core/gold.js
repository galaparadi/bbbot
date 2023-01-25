const axios = require('axios').default;
const cheerio = require('cheerio');

module.exports.getPrice = () => {
    let htmlData = (await axios.get('https://pluang.com/widgets/price-graph/desktop-vertical')).data;
    let harga = cheerio.load(htmlData)('#gold-price').text().replace(/\D/g, '');
    return harga;
}