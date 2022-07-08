function rpc({ client }) {
    const routerPath = '/status';
    const functions = {
        getStat: (args, cb) => {
            const memory = require('../utils/mem-status')();
            cb(null, memory);
        },
        getMembers: (args, cb) => {
            cb(null, 'client');
        }
    }
    return { routerPath, functions }
}

module.exports = rpc;