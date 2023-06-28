const Discord = require("discord.js");
const main = require('../../main');

module.exports = {
  name: "sugerir", // Coloque o nome do comando
  description: "✨ » Utils - Faça sua sugestão.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "sugestão",
        description: "Escreva algo.",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    }
],

  run: async (client, interaction) => {

    let canal = interaction.guild.channels.cache.get(main.sugestlog) // Canal de sugestões do servidor
    if (!canal) {
        interaction.reply(`Olá ${interaction.user}, o canal de sugestões ainda não foi configurado no script!`)
    } else {
        let sugestao = interaction.options.getString("sugestão");
        let embed = new Discord.EmbedBuilder()
        .setColor(main.color)
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setTitle("Nova sugestão!")
        .setDescription(`**Sugestão de ${interaction.user}:**\n${sugestao}`);

        canal.send({ embeds: [embed] }).then( () => {
            interaction.reply({ content: `Olá ${interaction.user}, sua sugestão foi publicada em ${canal} com sucesso.`, ephemeral: true })
        }).catch( () => {
            interaction.reply({ content: `Ops ${interaction.user}, algo deu errado!`, ephemeral: true })
        })
    }


  }
}