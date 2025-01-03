const Discord = require("discord.js")
const main = require('../../main')

module.exports = {
  name: "anunciar", // Coloque o nome do comando
  description: "✦ » Staff - Anuncie algo em uma embed.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  adminOnly: true,
  options: [
    {
        name: "título",
        description: "Escreva algo.",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    },
    {
        name: "descrição",
        description: "Escreva algo.",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    },
    {
        name: "chat",
        description: "Mencione um canal.",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: true,
    },
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {
        let titulo = interaction.options.getString("título")
        let desc = interaction.options.getString("descrição")
        let chat = interaction.options.getChannel("chat")
        if (Discord.ChannelType.GuildText !== chat.type) return interaction.reply(`❌ Este canal não é um canal de texto para enviar uma mensagem.`)

        let embed = new Discord.EmbedBuilder()
        .setTitle(titulo)
        .setDescription(`${desc}`)
        .setColor(main.color);

        chat.send({ embeds: [embed] }).then( () => { 
            interaction.reply(`✅ Seu anúncio foi enviado em ${chat} com sucesso.`)
        }).catch( (e) => {
            interaction.reply(`❌ Algo deu errado.`)
        })
    }

  }
}