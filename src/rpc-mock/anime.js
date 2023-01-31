const { airingAnime } = require('../datasource/anime-v2');
const animeCron = require('../datasource/anime-cron');
const logger = require('../logger/logger');

function rpc({ client }) {
    const routerPath = '/anime';
    const functions = {
        getAiring: async (args, cb) => {
            try {
                const animes = [{
                    title: 'Madtoy Chatty',
                    link: 'https://myanimelist.net/anime/52463/Madtoy_Chatty',
                    id: '52463',
                    thumbUrl: 'https://cdn.myanimelist.net/r/50x70/images/anime/1292/125603.jpg?s=61095a518ca6625698deafd7092fea4c'
                }, {
                    id: "50528",
                    link: "https://myanimelist.net/anime/50528/Golden_Kamuy_4th_Season",
                    thumbUrl: "https://cdn.myanimelist.net/r/50x70/images/anime/1855/128059.jpg?s=2dffeb8a4e240cfc06e0db55cba8b444",
                    title: "Golden Kamuy 4th Season"
                }, {
                    title: 'Itai no wa Iya nano de Bougyoryoku ni Kyokufuri Shitai to Omoimasu. 2',
                    link: 'https://myanimelist.net/anime/41514/Itai_no_wa_Iya_nano_de_Bougyoryoku_ni_Kyokufuri_Shitai_to_Omoimasu_2',
                    id: '41514',
                    thumbUrl: 'https://cdn.myanimelist.net/r/50x70/images/anime/1782/128859.webp?s=45be293d5b3b635d424fdeddee64f874'
                }, {
                    id: "53411",
                    link: "https://myanimelist.net/anime/53411/Buddy_Daddies",
                    thumbUrl: "https://cdn.myanimelist.net/r/50x70/images/anime/1183/132462.webp?s=591c0d77bb20787500d869e2f93ee6ae",
                    title: "Buddy Daddies"
                }];

                cb(null, animes);
            } catch (error) {
                logger.error('rpc -> anime -> getAiring');
                logger.error(error.message);
                cb({ message: error.message });
            }
        },
        getScheduledAnime: async (args, cb) => {
            try {
                const animes = [{
                    animeId: "50528",
                    link: "https://myanimelist.net/anime/50528/Golden_Kamuy_4th_Season",
                    thumbUrl: "https://cdn.myanimelist.net/r/50x70/images/anime/1855/128059.jpg?s=2dffeb8a4e240cfc06e0db55cba8b444",
                    title: "Golden Kamuy 4th Season",
                    cron: "15 22 * * 4",
                },
                {
                    animeId: "53411",
                    link: "https://myanimelist.net/anime/53411/Buddy_Daddies",
                    thumbUrl: "https://cdn.myanimelist.net/r/50x70/images/anime/1183/132462.webp?s=591c0d77bb20787500d869e2f93ee6ae",
                    title: "Buddy Daddies",
                    cron: "15 22 * * 4",
                }];
                cb(null, animes);
            } catch (error) {
                logger.error('rpc -> anime -> getScheduledAnime');
                logger.error(error.message);
                cb({ message: error.message });
            }
        },
        addAnimeSchedule: async (args, cb) => {
            try {
                animeCron.addAnimeSchedule(args);
                cb(null, { message: "adding schedule" });
            } catch (error) {
                logger.error('rpc -> anime -> addScheduleAnime')
                logger.error(error.message);
                cb({ message: error.message });
            }
        },
        removeAnimeSchedule: async (args, cb) => {
            try {
                const { id } = args;
                animeCron.removeAnimeSchedule(id);
                cb(null, { message: `anime ${args.id} deleted` });
            } catch (error) {
                logger.error('rpc -> anime -> removeAnimeSchedule');
                logger.error(error.message);
                cb({ message: error.message });
            }
        }
    }
    return { routerPath, functions }
}

module.exports = rpc;