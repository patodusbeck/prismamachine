const Discord = require("discord.js");
const main = require('../../main')

module.exports = {
  name: "rename-server",
  description: "✦ » Staff - Renomear o servidor",
  type: Discord.ApplicationCommandType.ChatInput,
  AdminOnly: true,
  options: [
    {
      name: "nome",
      description: "✦ » Staff - Digite um novo nome para o servidor",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (client, interaction, args) => {
    const Newname = interaction.options.getString("nome");
    const Oldname = interaction.guild.name;
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
      interaction.reply({
        content: `Você não possui permissão para utilizar este comando.`,
        ephemeral: true,
      });
    } else {
      let embed = new Discord.EmbedBuilder()
        .setTitle("Servidor Renomeado!")
        .setColor(main.color)
        .setThumbnail(interaction.guild.iconURL())
        .setTimestamp()
        .addFields(
          { name: `<:slayerinfo2:1115043414455619664> | Nome Antigo:`, value: `> ${Oldname}`, inline: true },
          { name: `<:slayerinfo2:1115043414455619664> | Novo Nome:`, value: `> ${Newname}`, inline: true })
      interaction.guild
        .setName(Newname)
        .then(() => {
          interaction.reply({ embeds: [embed] });
        })
        .catch((err) => {
          console.log(err);
          interaction.reply({
            content: "Ocorreu um erro ao renomear o servidor.",
            ephemeral: true,
          });
        });
    }
  },
};