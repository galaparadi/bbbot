const fs = require('node:fs');
const path = require('path');
const commandHandler = [];

fs
    .readdirSync(path.join(__dirname, '..', '/commands'))
    .forEach(location => {
        let { command, handler } = require(path.join(__dirname, '..', '/commands', location));
        commandHandler[command] = handler;
    });


module.exports = commandHandler