const fs = require('node:fs');
const path = require('path');
const messagesProvider = fs.readdirSync(path.join(__dirname, '..', '/messages'))
    .map(location => require(path.join(__dirname, '..', '/messages', location)));

module.exports = messagesProvider