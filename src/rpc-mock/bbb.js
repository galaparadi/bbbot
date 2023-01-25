const { getMember, getMembers } = require('../datasource/bbb/member');
const { getChannel, getChannels } = require('../datasource/bbb/channel');

function rpc({ client }) {
    const routerPath = '/bbb';
    const functions = {
        isMember: async (args, cb) => {
            const { key, id } = args;
            try {
                if (key !== 'secret') return cb({ message: "wrong secret key", code: 401 })
                cb(null, true);
            } catch (error) {
                console.log(error.message) //TODO: add logger
                return cb({ error: error.message })
            }
        },
        getRoles: async (args, cb) => {
            try {
                const roles = [
                    {
                        guild: '502470930421907486',
                        icon: null,
                        unicodeEmoji: null,
                        id: '1',
                        name: 'kang babi',
                        color: 15158332,
                        hoist: false,
                        rawPosition: 7,
                        permissions: '1071698665025',
                        managed: false,
                        mentionable: false,
                        tags: null,
                        createdTimestamp: 1649494897302
                    },
                    {
                        guild: '502470930421907486',
                        icon: null,
                        unicodeEmoji: null,
                        id: '2',
                        name: 'kang becak',
                        color: 3066993,
                        permissions: '8',
                        managed: true,
                        mentionable: false,
                        createdTimestamp: 1649515742719
                    }
                ]
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
                const members = [{
                    userId: '1',
                    roles: ['1'],
                    displayName: 'dudung',
                }, {
                    userId: '2',
                    roles: ['2'],
                    displayName: 'mamat',
                }];
                cb(null, members)
            } catch (error) {
                console.log(error.message);
                return cb({ error: error.message });
            }
        },
        getMember: async (args, cb) => {
            try {
                const { memberId } = args;
                const members = [{
                    userId: '1',
                    roles: ['1'],
                    displayName: 'dudung',
                }, {
                    userId: '2',
                    roles: ['2'],
                    displayName: 'mamat',
                }];
                cb(null, members.find(member => member.userId == memberId))
            } catch (error) {
                console.log(error.message);
                return cb({ error: error.message });
            }
        },
        getChannels: async (args, cb) => {
            try {
                const channels = (await getChannels({ client }))
                    .map(channel => { return { id: channel.id, name: channel.name, type: channel.type } })
                    .filter(channel => !['GUILD_CATEGORY'].includes(channel.type));
                cb(null, channels);
            } catch (error) {
                console.log(error.message);
                return cb({ error: error.message });
            }
        },
        getChannel: async (args, cb) => {
            try {
                const { channelId } = args;
                const CHANNELS = require('../enum/discord-channel');
                const channel = await getChannel({ client }, channelId);
                cb(null, { id: channel.id, name: channel.name });
            } catch (error) {
                console.log(error.message);
                return cb({ error: error.message });
            }
        },
        getFeatures: async (args, cb) => {
            try {
                const fcodes = [
                    {
                        code: "A003",
                        roles: ["1"],
                        members: ["2"]
                    },
                    {
                        code: "A001",
                        roles: ["2"],
                        members: ["1"]
                    },
                    {
                        code: "B001",
                        roles: ["1", "2"],
                        members: ["1"]
                    },
                    {
                        code: "F001",
                        roles: ['1','2'],
                        members: ['1']
                    }
                ]
                cb(null, fcodes);
            } catch (error) {
                console.log(error.message);
                return cb({ error: error.message });
            }
        },
        getFeature: async (args, cb) => {
            try {
                const {code, roles, memberId} = args;
                const fcodes = [
                    {
                        code: "A003",
                        roles: ["1"],
                        members: ["2"]
                    },
                    {
                        code: "A001",
                        roles: ["2"],
                        members: ["1"]
                    },
                    {
                        code: "B001",
                        roles: ["1", "2"],
                        members: ["1"]
                    }
                ]
                cb(null, fcodes.find(fcode => true));
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
