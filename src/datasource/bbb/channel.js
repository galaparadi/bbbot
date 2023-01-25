const CHANNLES = require('../../enum/discord-channel');

module.exports.getChannels = async ({ client }) => {
    const members = await client.guilds.cache.at(0).channels.fetch();
    return Array.from(members).map(([key,value]) => {return {...value}});
}

module.exports.getChannel = async ({ client }, channelId) => {
    const member = await client.guilds.cache.at(0).channels.fetch(channelId);
    return member;
}