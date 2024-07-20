// - 𝔓𝔄𝔗𝔒 𝔇𝔘𝔖 𝔅𝔈ℭ𝔎 - //
// - developer by pato dus beck - //


////////////////////////ANTI CRASH - PATO DUS BECK \\\\\\\\\\\\\\\\\\\\\


const process = require('node:process');

process.on('uncaughtExceptionMonitor', (error, origin) => { 

  console.log(origin, error)
});
process.on('unhandledRejection', (reason, promise) => {
  console.log(`
  Eita, achei um bglh paia. Peraí!


  🔍 Erro Localizado! Ele está em: ${promise}\n\n\n `, 




`❌ Causa do erro: ${reason}`);
  
  let ErrorEmbed = client.channels.cache.get(main.channellog)
  const embedE = new Discord.EmbedBuilder()
      .setTitle('Erro detectado no sistema!')
      .setDescription(`Há um erro em: \n\nReason: \`\`\`${reason}\`\`\`\n\nPromise: \`\`\`${promise}\`\`\` `)
      .setColor(main.color)


  ErrorEmbed.send({
      embeds: [embedE],
  })
})

////////////////////////CONST'S \\\\\\\\\\\\\\\\\\\\\
const main = require('./main.js')
const Discord = require("discord.js");
const { QuickDB } = require("quick.db")
const db = new QuickDB()
const { GatewayIntentBits } = require("discord.js")
//const config = require("./Config.json");
const { clear } = require('node:console');
const client = new Discord.Client({
    intents: [ 
GatewayIntentBits.Guilds, 
GatewayIntentBits.GuildMessages,
GatewayIntentBits.GuildMessageReactions,
GatewayIntentBits.GuildMessageTyping,
GatewayIntentBits.MessageContent, 
GatewayIntentBits.GuildMembers,  
GatewayIntentBits.GuildVoiceStates, 
         ] });

module.exports = client;

client.slashCommands = new Discord.Collection();
('./src/Handler/index.js')
require("./src/Handler")(client);

/*
const mg = require('mongoose');

     mg.connect('mongodb+srv://patodusbeck:Manu2019@cluster0.7hnyin0.mongodb.net/?retryWrites=true&w=majority', {


     }).then(()  => console.log('Database Online com sucesso.'));
*/


client.login(main.BotToken);

////////////////////////MENSAGEM DE ENTRADA - PATO DUS BECK \\\\\\\\\\\\\\\\\\\\\
client.on("guildMemberAdd", (member) => {
    let canal_logs = main.wellog;
    if (!canal_logs) return;
  
    let embed = new Discord.EmbedBuilder()
    .setColor(main.color)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setTitle("👋 Boas Vindas!")
    .setDescription(`> Olá ${member}!\nSeja Bem-Vindo(a) ao \`${member.guild.name}\`!\nAtualmente estamos com \`${member.guild.memberCount}\` membros.`);
  
    member.guild.channels.cache.get(canal_logs).send({ embeds: [embed], content: `${member}` })
  })
////////////////////////MENSAGEM DE SAÍDA - PATO DUS BECK \\\\\\\\\\\\\\\\\\\\\
  client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === main.levlog); // nome do canal de logs
    if (!channel) {
      return console.log(`Canal de logs não encontrado para o servidor ${member.guild.name}.`);
    }
    channel.send(`\`${member.user.tag}\` | \`${member.user.id}\` saiu do servidor. :cry:`); // mensagem de saída no canal de logs
  });
////////////////////////ANTI LINK - PATO DUS BECK \\\\\\\\\\\\\\\\\\\\\
  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    let confirm = await db.get(`antilink_${message.guild.id}`);
    if (confirm === false || confirm === null) {
      return;
    } else if (confirm === true) {
      if (message.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return;
      if (message.content.toLocaleLowerCase().includes("http")) {
        message.delete()
        message.channel.send(`${message.author} Não envie links no servidor!`, ephemeral=true)
      }
  
    }
  })
 ////////////////////////LOG MENSAGEM EDITADA - PATO DUS BECK \\\\\\\\\\\\\\\\\\\\\
  client.on("messageUpdate", async (message, oldMessage) => {

    let setlogsmsgenv = main.medit;
    if (setlogsmsgenv === null) return;

    if (message.author.bot) return;

    let msgchannel = message.channel;
    let msgantiga = message.content;
    let msgeditada = oldMessage.content;

    let embed = new Discord.EmbedBuilder()
        .setTitle(`<:refresh:1121581824930500698> Mensagem editada`)
        .setColor(main.color)
        .addFields(
          { name: 'Autor da Mensagem', value: `${message.author}` },
          { name: 'Canal', value: `${msgchannel}` },
          { name: 'Mensagem Antiga', value: `\`\`\`${msgantiga}\`\`\`` },
          { name: 'Mensagem Editada', value: `\`\`\`${msgeditada}\`\`\`` },
      )
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `PrismaStudios </>`, iconURL: message.guild.iconURL({ dynamic: true }) })

    message.guild.channels.cache.get(setlogsmsgenv).send({ embeds: [embed] })
});

////////////////////////AUTOROLE - PATO DUS BECK \\\\\\\\\\\\\\\\\\\\\

  //client.on("guildMemberAdd", (member) => {
  //  let cargo_autorole = member.guild.roles.cache.get("")
  //  if (!cargo_autorole) return console.log("❌ O AUTOROLE não está configurado.")
  //
  //  member.roles.add(cargo_autorole.id).catch(err => {
  //
  //   console.log(`❌ Não foi possível adicionar o cargo de autorole no usuário ${member.user.tag}.`)
  //  })
  //})
  
////////////////////////STATUS BOT - PATO DUS BECK \\\\\\\\\\\\\\\\\\\\\
const status = [
  {
    name: main.one,
    type: Discord.ActivityType.Streaming,
    url: 'https://www.twitch.tv/discord',

  },
  {
    name: main.two,
    type: Discord.ActivityType.Streaming,
    url: 'https://www.twitch.tv/discord',
  },
  {
    name: main.three,
    type: Discord.ActivityType.Streaming,
    url: 'https://www.twitch.tv/discord',

  },

]

client.on('ready', (c) => {
  console.clear();
  console.log(`✦ Prisma Studios </> - Online!`)
  console.log('𝔓𝔄𝔗𝔒 𝔇𝔘𝔖 𝔅𝔈ℭ𝔎');
  
  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 5000);
  client.user.setStatus('idle');
});
  



                               ////////////////////////WHITELIST - PATO DUS BECK \\\\\\\\\\\\\\\\\\\\\


                                                  client.on("interactionCreate", async(interaction) => {
                                                    if (interaction.isButton()) {
                                                      if (interaction.customId === "formulario") {
                                                        if (!interaction.guild.channels.cache.get(await db.get(`canal_logs_${interaction.guild.id}`))) return interaction.reply({ content: `O sistema está desativado.`, ephemeral: true })
                                                        const modal = new Discord.ModalBuilder()
                                                        .setCustomId("modal")
                                                        .setTitle("Prisma Whitelist");
                                                  
                                                        const pergunta1 = new Discord.TextInputBuilder()
                                                        .setCustomId("pergunta1") // ID da pergunta
                                                        .setLabel(main.qone) 
                                                        .setMaxLength(20) 
                                                        .setPlaceholder(main.hone) // Mensagem que fica antes de escrever a resposta
                                                        .setRequired(true) 
                                                        .setStyle(Discord.TextInputStyle.Short) //(Short | Paragraph)
                                                  
                                                        const pergunta2 = new Discord.TextInputBuilder()
                                                        .setCustomId("pergunta2") // ID da pergunta
                                                        .setLabel(main.qtwo) 
                                                        .setMaxLength(999) 
                                                        .setPlaceholder(main.htwo) 
                                                        .setStyle(Discord.TextInputStyle.Short) 
                                                        .setRequired(true)
                                                  
                                                        const pergunta3 = new Discord.TextInputBuilder()
                                                        .setCustomId("pergunta3") // ID da pergunta
                                                        .setLabel(main.qthree) 
                                                        .setPlaceholder(main.hthree) 
                                                        .setStyle(Discord.TextInputStyle.Short) 
                                                        .setRequired(true)

                                                        const pergunta4 = new Discord.TextInputBuilder()
                                                        .setCustomId("pergunta4") // ID da pergunta
                                                        .setLabel(main.qfour) 
                                                        .setMaxLength(1000)
                                                        .setPlaceholder(main.hfour) 
                                                        .setStyle(Discord.TextInputStyle.Paragraph) 
                                                        .setRequired(true)

                                                        const pergunta5 = new Discord.TextInputBuilder()
                                                        .setCustomId("pergunta5") // ID da pergunta
                                                        .setLabel(main.qfive) 
                                                        .setMaxLength(1000)
                                                        .setPlaceholder(main.hfive) 
                                                        .setStyle(Discord.TextInputStyle.Short)
                                                        .setRequired(true)
                                                  
                                                        modal.addComponents(
                                                          new Discord.ActionRowBuilder().addComponents(pergunta1),
                                                          new Discord.ActionRowBuilder().addComponents(pergunta2),
                                                          new Discord.ActionRowBuilder().addComponents(pergunta3),
                                                          new Discord.ActionRowBuilder().addComponents(pergunta4),
                                                          new Discord.ActionRowBuilder().addComponents(pergunta5)
                                                        )
                                                  
                                                        await interaction.showModal(modal)
                                                      }
                                                    } else if (interaction.isModalSubmit()) {
                                                      if (interaction.customId === "modal") {
                                                        let resposta1 = interaction.fields.getTextInputValue("pergunta1")
                                                        let resposta2 = interaction.fields.getTextInputValue("pergunta2")
                                                        let resposta3 = interaction.fields.getTextInputValue("pergunta3")
                                                        let resposta4 = interaction.fields.getTextInputValue("pergunta4")
                                                        let resposta5 = interaction.fields.getTextInputValue("pergunta5")
                                                  
                                                        if (!resposta1) resposta1 = "Não informado."
                                                        if (!resposta2) resposta2 = "Não informado."
                                                        if (!resposta3) resposta3 = "Não informado."
                                                        if (!resposta4) resposta3 = "Não informado."
                                                        if (!resposta5) resposta3 = "Não informado."
                                                  
                                                        let embed = new Discord.EmbedBuilder()
                                                        .setColor(main.color)
                                                        .setTitle("Whitelist Recebida")
                                                        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                                                        .setDescription(`**Usuario:** ${interaction.user}\n**ID:** \`${interaction.user.id}\``)
                                                        .addFields(
                                                          {
                                                            name: `Nome`,
                                                            value: `\`\`\`${resposta1}\`\`\``,
                                                            inline: true
                                                          },
                                                          {
                                                            name: `ID`,
                                                            value: `\`\`\`${resposta2}\`\`\``,
                                                            inline: true
                                                          },
                                                          {
                                                            name: `Tempo de RP`,
                                                            value: `\`\`\`${resposta3}\`\`\``,
                                                            inline: true
                                                          },
                                                          {
                                                            name: `Regras`,
                                                            value: `\`\`\`${resposta4}\`\`\``,
                                                            inline: false
                                                          },
                                                          {
                                                            name: `Concordo com nossos Termos?`,
                                                            value: `\`\`\`${resposta5}\`\`\``,
                                                            inline: false
                                                          },
                                                        );
                                                  
                                                        interaction.reply({ content: `Olá **${interaction.user.username}**, Recebemos sua Whitelist. Desde já, a Equipe Prisma Roleplay lhe deseja boa sorte!`, ephemeral: true})
                                                        
                                                        const b = new Discord.ButtonBuilder()
                                                        .setLabel('Aceitar Whitelist')
                                                        .setEmoji("<:logo:1115393036910874664>")
                                                        .setStyle("Success")
                                                        .setCustomId('fun')
                                                
                                                        const b1 = new Discord.ButtonBuilder()
                                                        .setLabel('Recusar Whitelist')
                                                        .setEmoji("<:logo:1115393036910874664>")
                                                        .setStyle("Danger")
                                                        .setCustomId('adm')
                                                
                                                        const ac = new Discord.ActionRowBuilder()
                                                        .addComponents(b, b1)
                                                        
                                                       const aa = await interaction.guild.channels.cache.get(await db.get(`canal_logs_${interaction.guild.id}`)).send({ embeds: [embed], components: [ac]})
                                                       const ccl = aa.createMessageComponentCollector()
                                                       ccl.on('collect', async(help) => {
                                               
                                                           if(help.customId === "fun") {
                                               
                                                            const selectMenu = new Discord.UserSelectMenuBuilder()
                                                            .setCustomId('selectMenu')
                                                            .setPlaceholder("Adicionar Cargo à")
                                                            .setMinValues(1)
                                                            .setMaxValues(1)
                                                      
                                                          const row = new Discord.ActionRowBuilder().addComponents(selectMenu);
                                                      
                                                               
                                                          if(!['selectMenu'].includes(customId)) return;
        await interaction.deferUpdate();
		await interaction.deleteReply();
        const embed = new EmbedBuilder()
        TicketSchema.findOne({GuildID: guild.id, ChannelID: channel.id}, async (err, data) => {
            if (err) throw err;
            if (!data) return interaction.reply({embeds: [embed.setColor('#9c89ad').setDescription(config.ticketError)], ephemeral: true}).catch(error => {return});
            const findMembers = await TicketSchema.findOne({GuildID: guild.id, ChannelID: channel.id, MembersID: interaction.values[0]});
            if(!findMembers) {
            data.MembersID.push(interaction.values[0]);
            channel.permissionOverwrites.edit(interaction.values[0], {
                SendMessages: true,
                ViewChannel: true,
                ReadMessageHistory: true
            }).catch(error => {return});
            interaction.channel.send({embeds: [embed.setColor('#9c89ad').setDescription('<@' + interaction.values[0] + '>' + ' ' + config.ticketMemberAdd)]}).catch(error => {return});
            data.save();
            }else {
            data.MembersID.remove(interaction.values[0]);
            channel.permissionOverwrites.delete(interaction.values[0]).catch(error => {return});
            interaction.channel.send({embeds: [embed.setColor('#9c89ad').setDescription('<@' + interaction.values[0] + '>' + ' ' + config.ticketMemberRemove)]}).catch(error => {return});
            data.save();
            }
    })
    }
})}
                                                               help.reply({embeds: [selectMenu], components: [row], ephemeral: true})
                                                              }

                                                            })
                                                            
                                                      

                                            

////////////////////////WHITELIST V2 - PATO DUS BECK \\\\\\\\\\\\\\\\\\\\\
/*client.on('messageCreate', async (message) => {
  if (message.content === '!wl') {
    const channel = client.channels.cache.get('1117602157408026624');  /////////iID DO CANAL ONDE A MENSAGEM VAI SER ENVIADA
    const logChannel = client.channels.cache.get('1117602396961509406');   /////////////////ID DO CANAL DE LOG DAS MENSAGENS

    if (!channel || !logChannel) return;

    const perguntas = [
      'Qual é o Nome e Sobrenome do seu personagem?',
      'Qual é sua identificação (ID) ?',
      'Há quanto tempo você joga RP?',
      'Está ciente das regras? Cite 5 regras de RP.',
      'Você está de acordo com nossos Termos?'
    ];

    
    const respostas = [];

    const filter = (m) => m.author.id === message.author.id;
    const collector = channel.createMessageCollector({ filter, time: 60000 });

    let i = 0;

    const perguntasEmbed = new Discord.EmbedBuilder()
      .setColor(main.color)
      .setTitle('Speed Whitelist')
      .setDescription(`${perguntas[i++]}`);

    channel.send({ embeds: [perguntasEmbed] }, ephemeral=true);

    collector.on('collect', (msg) => {
      respostas.push(msg.content);

      // Remover mensagens anteriores
      channel.bulkDelete(collector.collected.map((m) => m.id))
        .then(() => {
          if (i < perguntas.length) {
            perguntasEmbed.setDescription(`${perguntas[i++]}`);
            channel.send({ embeds: [perguntasEmbed], ephemeral: true});
          } else {
            collector.stop();

            const respostasEmbed = new Discord.EmbedBuilder()
              .setColor(main.color)
              .setTitle(`Respostas de ${message.author.username}`)
              .setDescription(respostas.join('\n'));

            channel.send({ embeds: [respostasEmbed] });
            logChannel.send({ embeds: [respostasEmbed] });
          }
        })
        .catch((error) => {
          console.error('Erro ao excluir mensagens:', error);
        });
    });

    collector.on('end', (collected) => {
      if (collected.size === 0) {
        channel.send(`**Whitelist de ${message.author} cancelada por inatividade.**`);
        logChannel.send(`**Whitelist de ${message.author} cancelada por inatividade.**`);
      }
    });
  }
});
*/

////////////////////////Message Secret\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

client.on('messageCreate', async (message) => {
  if (message.content === main.secret) {
    const channel = client.channels.cache.get(main.clogsecret);  /////////iID DO CANAL ONDE A MENSAGEM VAI SER ENVIADA

    const moment = require('moment-timezone');

    moment.tz.setDefault('America/Sao_Paulo');

    if (!channel) return;

    const date = moment();

    
    const weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    
    

    const botv2 = new Discord.EmbedBuilder()
          .setThumbnail('https://media.discordapp.net/attachments/1115114682781544458/1115416326668816434/logo_essenze_v1.png?')
          .setColor(main.color)
          .setImage('https://media.discordapp.net/attachments/1115114682781544458/1116580426258055179/background.jpg?')
          .setDescription('# The Real Dus Beck 🍁\n## Command Secret - Discord Bot Version 2\n\n ### Developed by Pato dus beck')
          .addFields(
        { name: 'Dia Semana/Mês', value: `\`${weekdays[date.day()]},  ${date.format('DD/MM/YYYY')}\`` },
        { name: 'Hora', value: `\`${date.format('HH:mm:ss')}\`` },
        { name: 'Painel Square Cloud', value: '[Square Cloud](https://squarecloud.app/dashboard)' },
        { name: 'GitHub', value: '[Repositories](https://github.com/patodusbeck?tab=repositories)' },
        { name: 'Rich Presents', value: '[1082088345984827436](https://discord.dev/)' },
        { name: 'Prisma Studios', value: '[Invite](https://discord.gg/invite/th2ccs5FG3)'},
        { name: 'Discord Token', value: '||MTExNTExMjExODY1MjUxODQ5MA.GEDVIG.gvNrqCG2kqeMOsMDCFo5zsanCBjy3RJHpvf_7k||'},
        { name: 'Arq. Principal Bot', value: '[Index.js](https://discord.com/channels/1074041160865161266/1117656556050337873)'},
        { name: 'Arq. Principal Site', value: '[.html](https://discord.com/channels/1074041160865161266/1117656588522627112)'},
        { name: 'Playlist', value: '[Spotify ./☯](https://open.spotify.com/playlist/6Of0jO8YEeWeCWXmkQWouF?si=2b9c615285a847fe)' },
    )

    channel.send({ embeds: [botv2] }, ephemeral=true);

  }
});

////////////////////// MENSAGEM APAGADA /////////////////////
client.on('messageDelete', async (message) => {
  const logsChannelId = main.channellog; // Insira o ID do canal de logs onde as mensagens apagadas serão enviadas

  // Verifica se o canal de logs foi definido anteriormente
  if (!logsChannelId) {
    console.log('Canal de logs não definido.');
    return;
  }

  // Verifica se o autor da mensagem deletada é um usuário (não é válido para mensagens do sistema)
  if (message.author && !message.author.bot) {
    const logsChannel = await client.channels.fetch(logsChannelId);

    const embedclear = new Discord.EmbedBuilder()
        .setTitle(`<:broom:1122365727924568186> Mensagem Apagada`)
        .setColor(main.color)
        .addFields(
          { name: 'Autor da Mensagem', value: `${message.author}/\`${message.author.id}\`` },
          { name: 'Canal', value: `<#${message.channel.id}>` },
          { name: 'Mensagem Apagada', value: `\`\`\`${message.content}\`\`\`` },
      )
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `PrismaStudios </>`, iconURL: message.guild.iconURL({ dynamic: true }) })

    logsChannel.send({ embeds: [embedclear] })
  }
});
/////////////////////////////////////////////// MESSAGE SQUARE/////////////////////////
client.on('messageCreate', async (message) => {
  if (message.content === main.squarecloud) {
    const channelsquare = client.channels.cache.get('1117602157408026624');  /////////iID DO CANAL ONDE A MENSAGEM VAI SER ENVIADA

    if (!channelsquare) return;
    

    const square = new Discord.EmbedBuilder()
          .setThumbnail('https://media.discordapp.net/attachments/1115114682781544458/1115416326668816434/logo_essenze_v1.png?')
          .setColor(main.color)
          .setImage('https://media.discordapp.net/attachments/1115114682781544458/1125277514487582920/unknown.png?')
          .setDescription('## Informações Square Cloud\n\n ### Developed by ***Prisma Studios </>***')
          .addFields(
        { name: 'Plano', value: `\`\`\`${main.plano}\`\`\`` },
        { name: 'Expira em', value: `\`\`\`${main.venci}\`\`\`` },
        { name: 'Dashboard Square Cloud', value: main.dash },
        { name: 'Uso de RAM', value: `\`\`\`${main.ram}\`\`\`` },
        { name: 'API Square', value: `\`\`\`${main.api}\`\`\`` },
    )

    channelsquare.send({ embeds: [square] });

  }
});

