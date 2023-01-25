const jayson = require('jayson');
const CRONER_URL = '127.0.0.1';
const CRONER_PORT = 5678;

module.exports.getAnimeSchedules = () => {
    return new Promise((res, rej) => {
        const client = new jayson.client.tcp({ port: CRONER_PORT, address: CRONER_URL });
        client.request('getSchedule', [], (err, rpcRes) => {
            if (err) rej(err);
            res(rpcRes.result)
        });
    })

}

module.exports.addAnimeSchedule = (data) => {
    const client = new jayson.client.tcp({ port: CRONER_PORT, address: CRONER_URL });
    const {hour, id, date} = data;
    const cron = `${hour.split(':')[1]} ${hour.split(':')[0]} * * ${date}`; //parse data to cron pattern
    return new Promise((res, rej) => {
        client.request('addSchedule', {cron, id}, (err, rpcRes) => {
            if(err) rej(err);
            if(!rpcRes.result) rej(rpcRes);
            res(rpcRes);
        });
    })

}

module.exports.removeAnimeSchedule = (id) => {
    const client = new jayson.client.tcp({ port: CRONER_PORT, address: CRONER_URL });
    client.request('destroyCron', {id}, (err, rpcRes) => {
        console.log(err);
        console.log(rpcRes);
    });
}