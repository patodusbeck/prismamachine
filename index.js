////////////////////////ANTI CRASH - PATO DUS BECK \\\\\\\\\\\\\\\\\\\\\

const process = require('node:process');

process.on('unhandledRejection', (reason, promise) => {

	console.log(`
    Eita, achei um bglh paia. Peraí!


    🔍 Erro Localizado! Ele está em: ${promise}\n\n\n `, 
  
  


  `❌ Causa do erro: ${reason}`);
});
////////////////////////ANTI CRASH - PATO DUS BECK \\\\\\\\\\\\\\\\\\\\\

const Discord = require("discord.js");
//const Database = require('./config/database');
//const db = new Database;
const { QuickDB } = require("quick.db")
const db = new QuickDB()
const { GatewayIntentBits } = require("discord.js")
const config = require("./Config.json")
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

require("./src/Handler")(client);

//const mg = require('mongoose');
//
 //    mg.connect('mongodb+srv://patodusbeck:Manu2019@cluster0.7hnyin0.mongodb.net/?retryWrites=true&w=majority', {

//
  //   }).then(()  => console.log('Database Online com sucesso.'));



client.login(config.BotToken);

//db.connect(); 
//SexoDB
//const sexodb = require("sexodb")

///client.dbUsers = new sexodb("./src/Database/users.json")


////////////////////////MENSAGEM DE ENTRADA - PATO DUS BECK \\\\\\\\\\\\\\\\\\\\\
client.on("guildMemberAdd", (member) => {
    let canal_logs = "1114964338738991127"; //canal logs - id channel
    if (!canal_logs) return;
  
    let embed = new Discord.EmbedBuilder()
    .setColor("#9c89ad")
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setTitle("👋 Boas Vindas!")
    .setDescription(`> Olá ${member}!\nSeja Bem-Vindo(a) ao \`${member.guild.name}\`!\nAtualmente estamos com \`${member.guild.memberCount}\` membros.`);
  
    member.guild.channels.cache.get(canal_logs).send({ embeds: [embed], content: `${member}` })
  })
////////////////////////MENSAGEM DE SAÍDA - PATO DUS BECK \\\\\\\\\\\\\\\\\\\\\
  client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === '🔔・log-discord'); // nome do canal de logs
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

    let setlogsmsgenv = "1079543408663728138";
    if (setlogsmsgenv === null) return;

    if (message.author.bot) return;

    let msgchannel = message.channel;
    let msgantiga = message.content;
    let msgeditada = oldMessage.content;

    let embed = new Discord.EmbedBuilder()
        .setTitle(`📝 Mensagem editada`)
        .setColor("9c89ad")
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
  client.on('ready', () => {
    console.log(`✦ Space Studios - Online!`);
  
    client.user.setStatus("idle");

    client.user.setPresence({
        activities: [{
            name: "development...",
        }],
    });
  })
  



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
                                                        .setLabel("Qual é o Nome e Sobrenome do seu personagem?") 
                                                        .setMaxLength(20) 
                                                        .setPlaceholder("Nome | Sobrenome") // Mensagem que fica antes de escrever a resposta
                                                        .setRequired(true) 
                                                        .setStyle(Discord.TextInputStyle.Short) //(Short | Paragraph)
                                                  
                                                        const pergunta2 = new Discord.TextInputBuilder()
                                                        .setCustomId("pergunta2") // ID da pergunta
                                                        .setLabel("Qual é sua identificação (ID) ?") 
                                                        .setMaxLength(999) 
                                                        .setPlaceholder("Envie seu ID") 
                                                        .setStyle(Discord.TextInputStyle.Short) 
                                                        .setRequired(true)
                                                  
                                                        const pergunta3 = new Discord.TextInputBuilder()
                                                        .setCustomId("pergunta3") // ID da pergunta
                                                        .setLabel("Há quanto tempo você joga RP?") 
                                                        .setPlaceholder("Meses/anos/semanas") 
                                                        .setStyle(Discord.TextInputStyle.Short) 
                                                        .setRequired(true)

                                                        const pergunta4 = new Discord.TextInputBuilder()
                                                        .setCustomId("pergunta4") // ID da pergunta
                                                        .setLabel("Está ciente das regras? Cite 5 regras de RP.") 
                                                        .setMaxLength(1000)
                                                        .setPlaceholder("Caso não tenha lido ainda, recomendamos ler!") 
                                                        .setStyle(Discord.TextInputStyle.Paragraph) 
                                                        .setRequired(true)

                                                        const pergunta5 = new Discord.TextInputBuilder()
                                                        .setCustomId("pergunta5") // ID da pergunta
                                                        .setLabel("Você está de acordo com nossos Termos?") 
                                                        .setMaxLength(1000)
                                                        .setPlaceholder("Responda com Sim ou Não.") 
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
                                                        .setColor("#9c89ad")
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
                                                        await interaction.guild.channels.cache.get(await db.get(`canal_logs_${interaction.guild.id}`)).send({ embeds: [embed] })
                                                      }
                                                    }
                                                  })

                                            
////////////////////////TICKET V3 - PATO DUS BECK \\\\\\\\\\\\\\\\\\\\\
const discordTranscripts = require('discord-html-transcripts');
        
        client.on("interactionCreate", async interaction => {
           if (interaction.isStringSelectMenu()) {
              let choice = interaction.values[0]
              const member = interaction.member
              const guild = interaction.guild
            if(choice == 'duvida') {
                let embedDuvida = new Discord.EmbedBuilder()
                 .setColor('Random')
                 .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                 .setDescription(`- **Caso haja alguma dúvida em relação ao Ticket, abra ele e nós vamos retira-la!**`)
                interaction.reply({ embeds: [embedDuvida], ephemeral: true})
            } 
              
             else if (choice == 'ticket') {     
                if (interaction.guild.channels.cache.find(ca => ca.name === `ticket-${member.id}`)) {
                    let canal = interaction.guild.channels.cache.find(ca => ca.name === `ticket-${member.id}`);
    
    let jaTem = new Discord.EmbedBuilder()
    .setDescription(`❌ **Calma! Você já tem um ticket criado em: ${canal}.**`)
    .setColor('Red')
                  
    interaction.reply({ embeds: [jaTem], ephemeral: true })
                } else {

                    let cargoTicket = await db.get("cargoModerate.cargoM"); //Cargo dos STAFF's
                    let CategoriaTicket = await db.get('Categoria.Categoria') //Categoria que o Ticket será criado
                   
                    guild.channels.create({
                      
                        name: `ticket-${member.id}`,
                        type: 0, 
                        parent: `${CategoriaTicket.id}`, //Categoria
                        topic: interaction.user.id, 
                        permissionOverwrites: [
                            {
                                id: interaction.guild.id,
                                deny: ["ViewChannel"]
                            },
                            {
                                id: member.id,
                                allow: ["ViewChannel", "SendMessages", "AddReactions", "AttachFiles"]
                            },
                           {
                                id: cargoTicket.id,  //Cargo STAFF
                                allow: ["ViewChannel", "SendMessages", "AddReactions", "AttachFiles", "ManageMessages"]
                            }
                        ]
                        
                      }).then( (ca) => {
                        interaction.reply({ content: `**💾 - Criando Ticket...**`, ephemeral: true }).then( () => {
                            setTimeout( () => {
                                let direciandoaocanal = new Discord.ActionRowBuilder().addComponents(
                                    new Discord.ButtonBuilder()
                                    .setLabel(` - Ticket`)
                                    .setEmoji(`🎫`)
                                    .setStyle(5)
                                    .setURL(`https://discord.com/channels/${interaction.guild.id}/${ca.id}`)
                                )
                                interaction.editReply({ content: `**💾 - Ticket criado na categoria!**`, ephemeral: true, components: [direciandoaocanal] })
                            }, 670)
                        })

                        let embedCanalTicket = new Discord.EmbedBuilder()
                        .setTitle("Central de Atendimento do Prisma Roleplay")
                        .setThumbnail(url="https://cdn.discordapp.com/attachments/1115114682781544458/1115416326668816434/logo_essenze_v1.png")
                        .setColor("#9c89ad")
                        .setDescription(`
                        <:users:1096647887422759024> **Usuário:** ${interaction.user}\n <:Reply:1093347552444825620> ${interaction.user.id}\n📜 **Como podemos ajudá-lo? Nos conte abaixo.**
                        `)


                          let FecharTicket = new Discord.ActionRowBuilder()
                          .addComponents(
                            new Discord.ButtonBuilder()
                            .setLabel(`Cancelar & Fechar Ticket`)
                            .setEmoji(`<:locked:1082462801244729446>`)
                            .setCustomId('fechar')
                            .setStyle(Discord.ButtonStyle.Secondary),
                            //new Discord.ButtonBuilder()
                            //.setCustomId('addmember')
                          //  .setLabel('Adicionar Membro')
                          //  .setStyle(Discord.ButtonStyle.Secondary)
                          //  .setEmoji('<:mention:1059964035442937886>'),
                        )                
                          
                          ca.send({ embeds: [embedCanalTicket], components: [FecharTicket] })
                       })                 
                }
                
            }
        } 
        if(interaction.isButton) {
          if(interaction.customId === "fechar") {
            const modalTicket = new Discord.ModalBuilder()
                  .setCustomId('modal_ticket')
                  .setTitle(`Cancelamento do Ticket`)
                const resposta1 = new Discord.TextInputBuilder()
                  .setCustomId('resposta')
                  .setLabel('Diga-nos a razão de fechar o ticket:')
                  .setStyle(Discord.TextInputStyle.Paragraph)
          
                const firstActionRow = new Discord.ActionRowBuilder().addComponents(resposta1);
                modalTicket.addComponents(firstActionRow)
                await interaction.showModal(modalTicket);
          } else if(interaction.customId === "lock") {
            const cliente = interaction.guild.members.cache.get(
                interaction.channel.topic.slice(0, 18)
            );
             let cargoTicket2 = await db.get("cargoModerate.cargoM");          
                if (!interaction.member.roles.cache.some(role => role.id == cargoTicket2.id)) {
                    interaction.reply({ content: `**❌ - Apenas STAFF's podem selecionar esta opção!**`, ephemeral: true })
                } else {
                    interaction.channel.permissionOverwrites.edit(cliente.user, {
                        ViewChannel: false
                      })
                  interaction.reply(`**🔐 - Canal trancado, permissão de visualizar canal fechada para ${cliente.user}!**`)
           
                }            
          }//else if(interaction.customId === "addmember") {
//
          //  const menu = new Discord.UserSelectMenuBuilder()
          //  .setCustomId('addmember')
         //   .setPlaceholder(configg.ticketManageMenuEmoji + configg.ticketManageMenuTitle)
         //   .setMinValues(1)
         //   .setMaxValues(1)
        //    return interaction.reply({components: [new Discord.ActionRowBuilder().addComponents(menu)], ephemeral: true}).catch(error => {return});

        //  }
        };
        if (!interaction.isModalSubmit()) return;
         if (interaction.customId === 'modal_ticket') {         
          const respostaFinal = interaction.fields.getTextInputValue('resposta');
      
          interaction.reply({
            content: `**✅ - Resposta enviada, canal será deletado em 3s**`, ephemeral: true
          }).then ( (aviso) => {
             setTimeout( () => {
                interaction.editReply({
                    content: `**✅ - Resposta enviada, canal será deletado em 2s**`, ephemeral: true
                }, 1000).then ( (aviso1) => {
                    setTimeout( () => {
                       interaction.editReply({
                            content: `**✅ - Resposta enviada, canal será deletado em 1s**`, ephemeral: true
                        })
                    }, 1000);
                 })
                  .then( () => {
                    setTimeout(async () => {
                        const cliente = interaction.guild.members.cache.get(
                            interaction.channel.topic.slice(0, 18)
                        );

                        let channel = interaction.channel;
                        const attachment = await discordTranscripts.createTranscript(channel, {
                           fileName: `${channel.name}.html`,
                         });
                        
                        interaction.channel.delete();
                        const channelDeleted = interaction.channel.name;

                        let embedLog = new Discord.EmbedBuilder()
                        
                         .setAuthor({ name: `${cliente.user.username}`, iconURL: `${cliente.user.displayAvatarURL()}`})
                         .setColor('Red')
                         .setTitle(`${channelDeleted}`)
                         .setDescription(`*Ticket fechado, informações:* \n**(Transcripts Anexados)**\n`)
                         .addFields(
                            {
                                name: `🆔 - ID de quem fechou:`,
                                value: `\`\`\`${interaction.user.id}\`\`\``,
                                inline: true,
                            },
                            {
                                name: `🆔 - ID de quem abriu:`,
                                value: `\`\`\`${cliente.id}\`\`\``,
                                inline: true,
                            },
                            {
                                name: `💬 - Quem fechou:`,
                                value: `${interaction.user}`,
                                inline: false,
                            },
                            {
                                name: `💬 - Quem abriu:`,
                                value: `${cliente.user}`,
                                inline: false,
                            },
                            {
                                name: `🎫 - Ticket:`,
                                value: `${channelDeleted}`,
                                inline: true,
                            },
                            {
                               name: '📕 - Motivo do Fechamento:',
                               value: `\`\`\`${respostaFinal}\`\`\``,
                               inline: false,
                            },
                         )
                         .setTimestamp()
                         .setFooter({ text: `Ticket fechado por: ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                         .setThumbnail(`${cliente.user.displayAvatarURL()}`)

                         let embedLogUser = new Discord.EmbedBuilder()
                        
                         .setColor('#9c89ad')
                         .setTitle(`Ticket Fechado!`)
                         .setThumbnail(url="https://cdn.discordapp.com/attachments/1115114682781544458/1115416326668816434/logo_essenze_v1.png")
                         .setDescription(`Olá, ${cliente.user.username}. Seu ticket foi fechado!`)
                         .addFields(
                            {
                                name: `💬 - Quem fechou:`,
                                value: `${interaction.user}`,
                                inline: false,
                            },
                            {
                                name: `💬 - Quem abriu:`,
                                value: `${cliente.user}`,
                                inline: false,
                            },
                            {
                               name: '📕 - Motivo do Fechamento:',
                               value: `\`\`\`${respostaFinal}\`\`\``,
                               inline: false,
                            },
                         )
                         .setTimestamp()
                         .setThumbnail(`${cliente.user.displayAvatarURL()}`)
                         .setFooter({ text: `Ticket fechado por: ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})

                         let canalLogsT = await db.get('channelLogTicket.channel')


                         cliente.user.send({ embeds: [embedLogUser] })
                         await  interaction.guild.channels.cache.get(`${canalLogsT.id}`).send({ content: `\`💾 - Transcript ⤵\``, files: [attachment] ,embeds: [embedLog] })
                    }, 1000);
                 });
             });
          });
        };
    });
    
////////////////////////TICKET V3 - PATO DUS BECK \\\\\\\\\\\\\\\\\\\\\