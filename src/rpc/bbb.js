const { getMember, getMembers } = require('../datasource/bbb/member');
const { getChannel, getChannels } = require('../datasource/bbb/channel');
const logger = require('../logger/logger');

function rpc({ client }) {
    const routerPath = '/bbb';
    const functions = {
        isMember: async (args, cb) => {
            const { key, id } = args;
            try {
                if (key !== 'secret') return cb({ message: "wrong secret key", code: 401 })
                let membersId = (await client.guilds.cache.at(0).members.fetch()).map(member => member.id);
                cb(null, membersId.includes(id) ? true : false);
            } catch (error) {
                logger.error('rpc -> bbb -> isMember')
                logger.error(error.message);
                const { code, message } = error;
                return cb({ code, message });
            }
        },
        getRoles: async (args, cb) => {
            try {
                const roles = await client.guilds.cache.at(0).roles.fetch();
                cb(null, roles)
            } catch (error) {
                logger.error('rpc -> bbb -> getRoles')
                logger.error(error.message);
                const { code, message } = error;
                return cb({ code, message });
            }
        },
        getRole: async (args, cb) => {
            try {
                const role = await client.guilds.cache.at(0).roles.fetch(args.id);
                cb(null, role);
            } catch (error) {
                logger.error('rpc -> bbb -> getRole')
                logger.error(error.message);
                const { code, message } = error;
                return cb({ code, message });
            }
        },
        getMembers: async (args, cb) => {
            try {
                const { getMembers } = require('../datasource/bbb/member');
                const members = await getMembers({ client });
                cb(null, members)
            } catch (error) {
                logger.error('rpc -> bbb -> getMembers')
                logger.error(error.message);
                const { code, message } = error;
                return cb({ code, message });
            }
        },
        getMember: async (args, cb) => {
            try {
                const { memberId } = args;
                const { getMember } = require('../datasource/bbb/member');

                const member = await getMember({ client }, memberId);
                cb(null, member)
            } catch (error) {
                logger.error('rpc -> bbb -> getMember')
                logger.error(error.message);
                const { code, message } = error;
                return cb({ code, message });
            }
        },
        getChannels: async (args, cb) => {
            try {
                const channels = (await getChannels({ client }))
                    .map(channel => { return { id: channel.id, name: channel.name, type: channel.type } })
                    .filter(channel => !['GUILD_CATEGORY'].includes(channel.type));
                cb(null, channels);
            } catch (error) {
                logger.error('rpc -> bbb -> getChannels')
                logger.error(error.message);
                const { code, message } = error;
                return cb({ code, message });
            }
        },
        getChannel: async (args, cb) => {
            try {
                const { channelId } = args;
                const CHANNELS = require('../enum/discord-channel');
                const channel = await getChannel({ client }, channelId);
                cb(null, { id: channel.id, name: channel.name });
            } catch (error) {
                logger.error('rpc -> bbb -> getChannel')
                logger.error(error.message);
                const { code, message } = error;
                return cb({ code, message });
            }
        },
        getFeatures: async (args, cb) => {
            try {
                const Feature = require('../datasource/feature');
                const { roles, memberId } = args;
                const fcodes = await Feature.getFeatures({ roles, memberId });
                cb(null, fcodes);
            } catch (error) {
                logger.error('rpc -> bbb -> getFatures')
                logger.error(error.message);
                const { code, message } = error;
                return cb({ code, message });
            }
        },
        getFeature: async (args, cb) => {
            try {
                const Feature = require('../datasource/feature');
                const { code, roles, memberId } = args;
                const fcode = await Feature.getFeature({ code, roles, memberId });
                cb(null, fcode);
            } catch (error) {
                logger.error('rpc -> bbb -> getFeature');
                logger.error(error.message);
                const { code, message } = error;
                return cb({ code, message });
            }
        },
        addFeature: async (args, cb) => {
            try {
                const Feature = require('../datasource/feature');
                const { code, roles, members } = args;
                await Feature.addFeature({code, roles, members});
                cb(null, { status: 1 })
            } catch (error) {
                logger.error('rpc -> bbb -> addFeature');
                logger.error(error.message);
                const { code, message } = error;
                return cb({code, message});
            }
        },
        updateFeature: async (args, cb) => { 
            try {
                const Feature = require('../datasource/feature');
                const { code, roles, members } = args;
                await Feature.updateFeature({code, roles, members});
                cb(null, { status: 1 })
            } catch (error) {
                logger.error('rpc -> bbb -> updateFeature')
                logger.error(error.message);
                const { code, message } = error;
                return cb({code, message});
            }
        },
    }
    return { routerPath, functions }
}

module.exports = rpc;
