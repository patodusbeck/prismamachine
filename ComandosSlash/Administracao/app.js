const Discord = require("discord.js")

module.exports = {
  name: "app", // Coloque o nome do comando
  description: "✦ » Staff - Aprovar Úsuario na Whitelist", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "usuário",
        description: "Escolha para quem enviar a mensagem.",
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    },
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando!`, ephemeral: true })
    } else {
        let user = interaction.options.getUser("usuário");

        let embed = new Discord.EmbedBuilder()
        .setColor("#9c89ad")
        .setDescription(`**<a:httpsdiscordggmdCpia:1004093094859386920> Olá! Você passou na Whitelist do Prisma Roleplay!**

        <:Foguete:1051498241998471218> **Poderia dar uma olhada em nossos produtos?**
        
        \`🛒\` • **Planos VIP:** <#1049113417593655326>
        \`🛒\` • **Outros Produtos:** <#1069831352763023410>
        
        <:__:1051498240392044555> Lembre-se de ler nossos termos de compra!
         
        **Seja muito bem vindo(a) ao Prisma Roleplay!** \`🥳\``);

        user.send({ embeds: [embed] }).then( () => {
            let emb = new Discord.EmbedBuilder()
            .setColor("#9c89ad")
            .setDescription(`✅ Olá ${interaction.user}, o jogador ${user} foi aprovado em nossa whitelist com sucesso!`);

            interaction.reply({ embeds: [emb] })
        }).catch(e => {
            let emb = new Discord.EmbedBuilder()
            .setColor("#9c89ad")
            .setDescription(`❌ Olá ${interaction.user}, a mensagem não foi enviada para ${user}, pois o usuário está com a DM fechada!`);

            interaction.reply({ embeds: [emb] })
        })
    }


  }
}