const { airingAnime, animeById } = require('../datasource/anime-v2');
const animeCron = require('../datasource/anime-cron');
const logger = require('../logger/logger');

//This section below is for sending to anime message
const channel = require('../enum/discord-channel');
const { hyperlink } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const normalize = require('../utils/text-ellipsis');
//TODO: clean the code so the section above can be removed

function rpc({ client }) {
    const routerPath = '/anime';
    const functions = {
        getAiring: async (args, cb) => {
            try {
                const animes = await airingAnime();
                cb(null, animes);
            } catch (error) {
                logger.error('rpc -> anime -> getAiring');
                logger.error(error.message);
                return cb({ message: error.message });
            }
        },
        getScheduledAnime: async (args, cb) => {
            try {
                const animes = await animeCron.getAnimeSchedules();
                return cb(null, animes);
            } catch (error) {
                logger.error('rpc -> anime -> getScheduledAnime');
                logger.error(error.message);
                return cb({ message: error.message });
            }
        },
        addAnimeSchedule: async (args, cb) => {
            try {
                const rpcRes = await animeCron.addAnimeSchedule(args);
                cb(null, { message: "adding schedule" });
            } catch (error) {
                logger.error('rpc -> anime -> addScheduleAnime')
                logger.error(error.message);
                return cb({ message: error.message });
            }
        },
        removeAnimeSchedule: async (args, cb) => {
            try {
                animeCron.removeAnimeSchedule(args.id)
                cb(null, { message: "anime deleted" });
            } catch (error) {
                logger.error('rpc -> anime -> removeAnimeSchedule');
                logger.error(error.message);
                return cb({ message: error.message });
            }
        },
        pushNotifAnimeSchedule: async (args, cb) => {
            try {
                const { id } = args;
                try {
                    const { title, description, posterHref } = await animeById(id);
                    const watchStream = false;
                    const embed = new MessageEmbed()
                        .setColor('#209cee')
                        .setTitle('NOW PLAYING!!, [Anime Notif]')
                        .setDescription(title)
                        .addField('Description', normalize(description) || 'no description')
                        .addField('Watch Legal', watchStream || 'no video provider', true)
                        .addField('Watch Ilegal', `comming soon`, true)
                        .setImage(posterHref)
                    client.channels.cache.get(channel.ANIME).send({ embeds: [embed] })
                    cb(null, { message: `notif from bbbot anime service. Anime Id : ${id}` });
                } catch (error) {
                    logger.error('rpc -> anime -> pushNotifAnimeSchedule -> message');
                    logger.error(error.message);
                    return cb({ message: error.message });
                }
            } catch (error) {
                logger.error('rpc -> anime -> pushNotifAnimeSchedule');
                logger.error(error.message);
                return cb({ message: error.message });
            }
        }
    }
    return { routerPath, functions }
}

module.exports = rpc;