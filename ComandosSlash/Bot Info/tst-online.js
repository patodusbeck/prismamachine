const Season = "Season I" // Atual Season | Temporada



const Discord = require('discord.js')
const moment = require('moment-timezone');


moment.tz.setDefault('America/Sao_Paulo');

module.exports = {
  name: 'tst',
  description: 'Teste Space Machine.',
  type: Discord.ApplicationCommandType.ChatInput,
  run: async (client, interaction, args) => {
    
    const date = moment();

    
    const weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    let embed = new Discord.EmbedBuilder()
      .setTitle('Prisma Machine')
      .setThumbnail('https://media.discordapp.net/attachments/1115114682781544458/1115114717783019530/logo_essenze_v1.png?')
      .setColor('#f26658')
      .setDescription(`
      ## Square Cloud Console - Prisma Machine

\`\`\`cs
[Square Cloud Console]: Welcome to console!

[Prisma ✦] npm notice

[Prisma ✦] npm notice New minor version of npm available! 9.6.6 -> 9.7.1

[Prisma ✦] npm notice Changelog: <https://github.com/npm/cli/releases/tag/v9.7.1>

[Prisma ✦] npm notice Run \`npm install -g npm@9.7.1\` to update!

[Prisma ✦] npm notice

[Prisma ✦] System Whitelist iniciado!

[Prisma ✦] ✦ Prisma Studios - Online!
\`\`\`
      
      
      `)
      .addFields(
    { name: 'Dia Semana/Mês', value: `\`\`\`${weekdays[date.day()]},  ${date.format('DD/MM/YYYY')}\`\`\`` },
    { name: 'Horário Atual', value: `\`\`\`${date.format('HH:mm:ss')}\`\`\`` },
    { name: 'Painel Square Cloud', value: '[Square Cloud](https://squarecloud.app/dashboard/)' },
    { name: 'Painel Discord Developer', value: '[Discord Developer](https://discord.dev/)' },
    { name: 'Prisma Machine', value: `[Invite](https://discord.com/api/oauth2/authorize?client_id=1115112118652518490&permissions=8&scope=bot
    )` },
    { name: 'Atual Season', value: `** ${Season} **`},
)

 //https://discord.com/api/oauth2/authorize?client_id=1115112118652518490&permissions=8&scope=bot

    interaction.reply({ embeds: [embed], ephemeral: false })
  }
}
