module.exports = {
    route: "/sample",
    handler: function (client) {
        return async function (req, res) {
            res.send('response from sample')
        }
    }
}