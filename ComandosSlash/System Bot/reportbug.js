const main = require('../../main')

const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");

module.exports = {
  name: "reportar",
  description: "『Utilidade』Reporte um bug do bot",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "bug",
      description: "Digite sobre o bug",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "link",
      description: "digite o link de uma imagem do bug",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "imagem",
      description: "Envie uma imagem do bug",
      type: ApplicationCommandOptionType.Attachment,
      required: false,
    }
  ],

  run: async (bot, interaction) => {
    const bug = interaction.options.getString("bug");
    const link = interaction.options.getString("link");
    const img = interaction.options.getAttachment("imagem");
      const user = interaction.user;
      
      const embed = new EmbedBuilder()
        .setColor(main.color)
        .setTitle(`❌ |  Novo Bug descoberto!`)
        .setDescription(`O usuario ${user} Descobriu um novo bug!\n \`${bug}\``)
      if(link) {
        embed.setImage(link);
      }

      if(img) {
        embed.setImage(img.url);
      }
      try {
        await bot.channels.cache
          .get(main.channellog)
          .send({ embeds: [embed] });
        await interaction.reply({
          content: "Seu bug reportado com sucesso!",
          ephemeral: true,
        });
      } catch(error) {
        console.error(error);
        await interaction.reply({
          content:
            "Houve um erro ao enviar seu relatório. Tente novamente mais tarde.",
          ephemeral: true,
        });
      }
    }
  }

// comando feito por @gold3nmoon, caso você tenha ideias de comandos, crie um tópico nesse comando e envie a ideia.