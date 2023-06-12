const Discord = require("discord.js");
const { link } = require("fs");

module.exports = {
  name: "serverinfo", // Coloque o nome do comando
  description: "✨ » Utils - Envia as informações do atual servidor.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    const nome = interaction.guild.name;
    const id = interaction.guild.id;
    const icon = interaction.guild.iconURL({ dynamic: true });
    const membros = interaction.guild.memberCount;

    const criacao = interaction.guild.createdAt.toLocaleDateString("pt-br");
    
    const canais_total = interaction.guild.channels.cache.size;
    const canais_texto = interaction.guild.channels.cache.filter(c => c.type === Discord.ChannelType.GuildText).size;
    const canais_voz = interaction.guild.channels.cache.filter(c => c.type === Discord.ChannelType.GuildVoice).size;
    const canais_categoria = interaction.guild.channels.cache.filter(c => c.type === Discord.ChannelType.GuildCategory).size;


    const embed1 = new Discord.EmbedBuilder()
    .setColor("#9c89ad")
    .setAuthor({ name: 'Prisma Roleplay', iconURL: icon })
    .setThumbnail(icon)
    .addFields(
        {
            name: `💻 Nome:`,
            value: `\`\`\`${nome}\`\`\``,
            inline: true
        },
        {
            name: `🆔 ID:`,
            value: `\`\`\`${id}\`\`\``,
            inline: true
        },
        {
            name: `👥 Membros:`,
            value: `\`\`\`${membros}\`\`\``,
            inline: true
        },
        {
            name: `📅 Criação:`,
            value: `\`\`\`${criacao}\`\`\``,
            inline: true    
        },
        {
            name: `📤 Canais Totais:`,
            value: `\`\`\`O Servidor tem ${canais_total} canais no total.\`\`\``,
            inline: true
        },
        {
            name: `📝 Canais de Texto:`,
            value: `> \`\`\`O Servidor tem ${canais_texto} canais de texto.\`\`\``,
            inline: false
        },
        {
            name: `🔊 Canais de Voz:`,
            value: `> \`\`\`O Servidor tem ${canais_voz} canais de voz.\`\`\``,
            inline: false
        },
        {
            name: `📅 Categorias:`,
            value: `> \`\`\`O Servidor tem ${canais_categoria} categorias.\`\`\``,
            inline: false
        },
        {
            name: `✉️ Convite:`,
            value: `> \`\`\`https://discord.gg/6RTyw4rE8d\`\`\``,
            inline: false
        }
        
    );

    const botao = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
        .setURL(icon)
        .setLabel("Ícone do servidor")
        .setEmoji("📎")
        .setStyle(Discord.ButtonStyle.Link)
    )

    interaction.reply({ embeds: [embed1], components: [botao] })
  }
}