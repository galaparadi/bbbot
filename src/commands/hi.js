const { SlashCommandBuilder } = require('@discordjs/builders');
const userHiCount = new Map();

const command = 'hi';
const handler = async (interaction) => {
    if (userHiCount.has(interaction.user.username)) {
        userHiCount.set(interaction.user.username, userHiCount.get(interaction.user.username) + 1);
    } else {
        userHiCount.set(interaction.user.username, 1);
    };
    await interaction.reply(`Hallo, ${interaction.user.username} sudah menyapa sebanyak ${userHiCount.get(interaction.user.username)}`);
};
const commandBuilder = new SlashCommandBuilder().setName(command).setDescription('Say hi to the bot. expect the bot response');

module.exports = { command, handler, commandBuilder }