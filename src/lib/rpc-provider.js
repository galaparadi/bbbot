const fs = require('node:fs');
const path = require('path');

function provider(options) {
    const mock = !!parseInt(process.env.NO_BBB) && !!parseInt(process.env.DEV_DB_MODE)
    const rpcPath = mock ? '/rpc-mock' : '/rpc';
    const rpcProvider = fs.readdirSync(path.join(__dirname, '..', rpcPath))
        .map(location => require(path.join(__dirname, '..', rpcPath, location))(options));
    return rpcProvider;
}

module.exports = provider