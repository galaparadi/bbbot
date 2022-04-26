const axios = require('axios').default;
const cheerio = require('cheerio');
const channel = require('../enum/discord-channel');
const { hyperlink } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { anime } = require('../datasource/anime');

const route = '/anime';
const handler = function (client) {
    return async function (req, res) {
        if (req.body.key !== 'secret') return;
        const { title, description, posterHref, streams } = await anime(req.body.q);
        const watchStream = streams.reduce((acc, curr) => {
            acc = acc + `${hyperlink(curr.name, curr.href)} \n`;
            return acc;
        }, '');
        const embed = new MessageEmbed()
            .setColor('#209cee')
            .setTitle('NOW PLAYING!!, [Anime Notif]')
            .setDescription(title)
            .addField('Description', description)
            .addField('Watch Legal', watchStream, true)
            .addField('Watch Ilegal', `comming soon`, true)
            .setImage(posterHref)
        client.channels.cache.get(channel.BOT_TEST).send({ embeds: [embed] })
        res.send("done");
    }
}

module.exports = { route, handler }