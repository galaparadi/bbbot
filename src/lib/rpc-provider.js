const fs = require('node:fs');
const path = require('path');

function provider(options) {
    const rpcProvider = fs.readdirSync(path.join(__dirname, '..', '/rpc'))
        .map(location => require(path.join(__dirname, '..', '/rpc', location))(options));
    return rpcProvider;
}

module.exports = provider