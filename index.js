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

    let setlogsmsgenv = "1117602396961509406";
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
const status = [
  {
    name: 'Adquira seu VIP! ✦',
    type: Discord.ActivityType.Streaming,
    url: 'https://www.twitch.tv/discord',

  },
  {
    name: '✦ Prisma Roleplay',
    type: Discord.ActivityType.Streaming,
    url: 'https://www.twitch.tv/discord',
  },
  {
    name: 'Venha se divertir!',
    type: Discord.ActivityType.Streaming,
    url: 'https://www.twitch.tv/discord',

  },

]

client.on('ready', (c) => {
  console.log(`✦ Prisma Studios </> - Online!`);

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
      .setColor('#9c89ad')
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
              .setColor('#9c89ad')
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

////////////////////////CAPCHAT\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

