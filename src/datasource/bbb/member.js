class MemberError extends Error {
    constructor(message, code) {
        super(message);
        this.name = "Discord member Error";
        this.code = code;
    }
}

module.exports.getMembers = async ({ client }) => {
    const members = await client.guilds.cache.at(0).members.fetch();
    return members;
}

module.exports.getMember = async ({ client }, memberId) => {
    const member = await client.guilds.cache.at(0).members.fetch(memberId);
    return member;
}