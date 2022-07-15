const axios = require('axios').default;
const cheerio = require('cheerio');

const extractInformation = ($anime) => {
    const information = $anime('.leftside > h2').get(1);
    return $anime(information)
        .nextUntil('br')
        .map(function (i, el) { return $anime(this).text() })
        .toArray()
        .map(item => [item.split(/\r?\n/)[1].trim().replace(":", "").toLowerCase(), item.split(/\r?\n/)[2].trim()])
        .reduce((acc, curr) => { acc[curr[0]] = curr[1]; return acc; }, {})
}

const searchAnime = async (query) => {
    const searchRes = await axios.get(`https://myanimelist.net/search/all?q=${query}`);
    const $search = cheerio.load(searchRes.data);
    const animeObjects = $search('article .information > .title > a:nth-child(1)').toArray().map(function (elem) {
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
    const info = extractInformation($anime);

    const episodes = info.episodes;
    const premiered = info.premiered;
    const title = $anime('.title-name').text();
    const description = $rightMenu.find('p[itemprop="description"]').text();
    const airing = info.status;

    return { posterHref, title, description, airing, episodes, premiered }
}

module.exports = { searchAnime, animeById }
