const Discord = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()

module.exports = {
  name: "access", // Coloque o nome do comando
  description: "✦ » Staff - Sistema de Liberação Acesso", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "canal_formulário",
        description: "Canal para enviar o formulário para os membros.",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: true,
    },
    {
        name: "canal_logs",
        description: "Canal para enviar as logs dos formulários recebidos.",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: true,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {
        const canal_formulario = interaction.options.getChannel("canal_formulário")
        const canal_logs = interaction.options.getChannel("canal_logs")

        if (canal_formulario.type !== Discord.ChannelType.GuildText) {
            interaction.reply({ content: `O canal ${canal_formulario} não é um canal de texto.`, ephemeral: true })
        } else if (canal_logs.type !== Discord.ChannelType.GuildText) {
            interaction.reply({ content: `O canal ${canal_logs} não é um canal de texto.`, ephemeral: true })
        } else {
            await db.set(`canal_formulario_${interaction.guild.id}`, canal_formulario.id)
            await db.set(`canal_logs_${interaction.guild.id}`, canal_logs.id)

            let embed = new Discord.EmbedBuilder()
            .setDescription("Random")
            .setColor('#9c89ad')
            .setTitle("Modals configurados!")
            .setDescription(`> Canal do Formulário: ${canal_formulario}.\n> Canal de Logs: ${canal_logs}.`)

            interaction.reply({ embeds: [embed], ephemeral: true }).then( () => {
                let embed_formulario = new Discord.EmbedBuilder()
                .setColor("#9c89ad")
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setImage("https://media.discordapp.net/attachments/1043682567959879740/1068952798907089116/Captura_de_Tela_1502.png")
                .setDescription(`<:Foguete:1051498241998471218> • Seja bem-vindo(a) ao **Prisma Roleplay**\n- *Esperamos que sua estadia seja extensa e agradável*.\n\n <:serverrules:1115024947480363008> **|** Para ter acesso completo ao nosso discord, é necessário **concordar com nossos termos** e **liberar seu acesso** clicando no **botão verde** abaixo.`);

                let botao = new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                    .setCustomId("formulario")
                    .setEmoji("<a:positivoverde:971592150246654002>")
                    .setLabel("Concordar com os Termos & Liberar Acesso")
                    .setStyle(Discord.ButtonStyle.Success)
                );

                canal_formulario.send({ embeds: [embed_formulario], components: [botao] })
            })
        } 
    }
  }
}