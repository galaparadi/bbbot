module.exports.getRoles = async ({ client }) => {
    const roles = await client.guilds.cache.at(0).roles.fetch();
    return roles;
};

module.exports.getRole = ({ client }, roleId) => {
    const role = await client.guilds.cache.at(0).roles.fetch(roleId);
    return role;
};