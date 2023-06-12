const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')

module.exports = {
    name: "v",
    description: "✦ » Staff - Adicione o cargo de Cidadão ao membro escolhido.",
    type: Discord.ApplicationCommandType.ChatInput,
    adminOnly: true,
    options: [
      {
          name: "user",
          description: "úsuario no qual deseja adicionar como cidadão.",
          type: Discord.ApplicationCommandOptionType.User,
          required: true,
      },
      {
        name: "nickname",
        description: "(ID) Nome",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    }
  ],

  run: async (client, interaction) => {
    const { guild, user, options } = interaction;

    const member = guild.members.cache.get(options.getUser('user').id);
    const role = '1114964337237434413'; // CARGO DE CIDADÃO/VERIFICADO
    const nickname = options.getString('nickname');

    if (member.roles.cache.has(role)) {
      return interaction.reply({ content: `${user.username}, o usuário já tem este cargo!`, ephemeral: true });
    }

    try {
      await member.roles.add(role);
      await member.setNickname(nickname);
      await interaction.reply({ content: `Jogador verificado com sucesso!`, ephemeral: true });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: `Algo deu errado...`, ephemeral: true });
    }
  },
};