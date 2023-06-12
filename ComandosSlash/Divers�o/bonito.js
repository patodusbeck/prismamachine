const Discord = require("discord.js");

module.exports = {
  name: "bonito",
  description: "🔮 » Diversão - Avalie a beleza de um membro.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "membro",
      description: "Mencione o membro que deseja avaliar.",
      type: Discord.ApplicationCommandOptionType.User,
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const member = interaction.options.getMember("membro");

    const porcentagem = Math.floor(Math.random() * 100);
    const embedHyou = new Discord.EmbedBuilder()
      .setTitle("Avaliação de Beleza!")
      .setDescription(`**${member}** é ${porcentagem}% bonito(a)!`)
      .setImage(member.displayAvatarURL({ size: 512 }))
      .setColor("#9c89ad")
      .setTimestamp();

    return interaction.reply({ embeds: [embedHyou] }).catch(console.error);
  },
};
