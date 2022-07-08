const axios = require('axios').default;
const cheerio = require('cheerio');

const searchAnime = async (query) => {
    const searchRes = await axios.get(`https://myanimelist.net/search/all?q=${query}`);
    const $search = cheerio.load(searchRes.data);
    const animeObjects = $search('article .information > .title > a:nth-child(1)').toArray().map(function(elem) {
        return {
            id: $search(elem).attr('href').split('/')[4],
            title: $search(elem).text(),
            href: $search(elem).attr('href'),
            picture: $search(elem).parent().parent().parent().children('.thumb').children('a').children('img').attr('data-src').split('/100x140')[1],
        }
    });
    
    return animeObjects
}

const animeById = async (id) => {
    const animeRes = await axios.get(`https://myanimelist.net/anime/${id}`);
    const $anime = cheerio.load(animeRes.data);
    const $leftMenu = $anime('#content > table > tbody > tr > td:nth-child(1)');
    const $rightMenu = $anime('#content > table > tbody > tr > td:nth-child(2)');
    const posterHref = $leftMenu.find('img').attr('data-src');
    const title = $anime('.title-name').text();
    const description = $rightMenu.find('p[itemprop="description"]').text();
    const airing = $anime('.leftside > div:nth-child(18)').text();
    
    return { posterHref, title, description, airing }
}

module.exports = { searchAnime, animeById }
