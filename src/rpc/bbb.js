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
                console.log(error.message) //TODO: add logger
                return cb({ error: error.message })
            }
        },
        getRoles: async (args, cb) => {
            try {
                const roles = await client.guilds.cache.at(0).roles.fetch();
                cb(null, roles)
            } catch (error) {
                console.log(error.message);
                return cb({ error: error.message });
            }
        },
        getRole: async (args, cb) => {
            try {
                const role = await client.guilds.cache.at(0).roles.fetch(args.id);
                cb(null, role);
            } catch (error) {
                console.log(error.message);
                return cb({ error: error.message });
            }
        },
        getMembers: async (args, cb) => {
            try {
                const { getMembers } = require('../datasource/bbb/member');
                const members = await getMembers({ client });
                cb(null, members)
            } catch (error) {
                console.log(error.message);
                return cb({ error: error.message });
            }
        },
        getMember: async (args, cb) => {
            try {
                const { memberId } = args;
                const { getMember } = require('../datasource/bbb/member');

                const member = await getMember({ client }, memberId);
                cb(null, member)
            } catch (error) {
                console.log(error.message);
                return cb({ error: error.message });
            }
        },
        getChannels: async (args, cb) => {
            try {
                const CHANNELS = require('../enum/discord-channel');
                cb(null, CHANNELS);
            } catch (error) {
                console.log(error.message);
                return cb({ error: error.message });
            }
        },
        getFeatures: async (args, cb) => {
            try {
                const Feature = require('../datasource/feature');
                const { roles, memberId } = args;
                const fcodes = await Feature.getFeatures({ roles, memberId });
                cb(null, fcodes);
            } catch (error) {
                console.log(error.message);
                return cb({ error: error.message });
            }
        },
        getFeature: async (args, cb) => {
            try {
                const Feature = require('../datasource/feature');
                const { code, roles, memberId } = args;
                const fcode = await Feature.getFeature({ code, roles, memberId });
                cb(null, fcode);
            } catch (error) {
                console.log(error.message);
                const { code, message } = error;
                return cb({ code, message });
            }
        }
    }
    return { routerPath, functions }
}

module.exports = rpc;
