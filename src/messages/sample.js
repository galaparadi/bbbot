const route = '/sample';
const handler = function (client) {
    return async function (req, res) {
        res.send('response from sample');
    }
}

module.exports = { route, handler };