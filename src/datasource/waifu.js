const axios = require('axios').default;
const SFW_WAIFU = 'https://api.waifu.pics/sfw/waifu';
const NSFW_WAIFU = 'https://api.waifu.pics/nsfw/waifu';

const waifu = async () => {
    const { url } = (await axios.get(SFW_WAIFU)).data;
    return url;
}

const nsfwWaifu = async () => {
    const { url } = (await axios.get(NSFW_WAIFU)).data;
    return url;
}

module.exports = { waifu, nsfwWaifu }