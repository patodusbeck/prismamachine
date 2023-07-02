// - 𝔓𝔄𝔗𝔒 𝔇𝔘𝔖 𝔅𝔈ℭ𝔎 - //
// - developer by pato dus beck - //

const Discord = require("discord.js");
const main = require('../../main')

module.exports = {
  name: "controle",//nome do comando
  description: "Controle Staff",//descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'staff',
      description: 'mencione o staff para o changelog.',
      type: Discord.ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: 'ocorrido',
      description: 'O que aconteceu com esse staff?',
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: "saiu",
          value: 'sair',
        },
        {
          name: "promovido",
          value: 'promvido',
        },
        {
          name: "rebaixado",
          value: 'rebaixado',
        },
        {
          name: "entrou",
          value: 'entrou'
        },
        {
          name: "punição",
          value: 'punicao'
        },
      ]
    },
    {
      name: 'cargo',
      description: 'escolha o cargo que ele ganhou ou perdeu.',
      type: Discord.ApplicationCommandOptionType.Role,
      required: true
    }
  ],

  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
      interaction.reply({ content: `Você não possui permissão para utilizar este comando!`, ephemeral: true });
      return;
    }

    let staff = interaction.options.getUser("staff");
    let ac = interaction.options.getString("ocorrido");
    let cargo = interaction.options.getRole("cargo");
    let canal = interaction.guild.channels.cache.get(main.rgcontrol);//Coloque o id do canal onde vai ser enviado o staff-log
    let title = "Controle Staff - Registro de Log";

    if(ac === "sair"){
        const embed = new Discord.EmbedBuilder()
        .setTitle(title)
        .setColor(main.color)
        .addFields(
          { name: `⚙ | Nome:`, value: `${staff}` },
          { name: `⚙ | Ocorrido:`, value: `\`\`\`Saiu da Equipe Prisma\`\`\`` },
          { name: `⚙ | Antigo cargo do Staff:`, value: `${cargo}` }
      )
        .setFooter({ text: `© ${client.user.username} ${new Date().getFullYear()}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        
        canal.send({ embeds: [embed] }).catch((e) =>{
            interaction.reply({
                content: `Ocorreu um erro ao enviar a mensagem`,
                ephemeral: true
              });
        });
    }else if(ac === "promvido"){
        const embed = new Discord.EmbedBuilder()
        .setTitle(title)
        .setColor(main.color)
        .addFields(
          { name: `⚙ | Staff:`, value: `${staff}` },
          { name: `⚙ | Ocorrido:`, value: `\`\`\`Promovido de Cargo\`\`\`` },
          { name: `⚙ | Novo cargo do Staff:`, value: `${cargo}` }
      )
        .setFooter({ text: `© ${client.user.username} ${new Date().getFullYear()}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        
        canal.send({ embeds: [embed] }).catch((e) =>{
            interaction.reply({
                content: `Ocorreu um erro ao enviar a mensagem`,
                ephemeral: true
              });
        });
    }else if(ac === "rebaixado"){
        const embed = new Discord.EmbedBuilder()
        .setTitle(title)
        .setColor(main.color)
        .addFields(
          { name: `⚙ | Staff:`, value: `${staff}` },
          { name: `⚙ | Ocorrido:`, value: `\`\`\`Rebaixado de Cargo\`\`\`` },
          { name: `⚙ | Novo cargo do Staff:`, value: `${cargo}` }
      )
        .setFooter({ text: `© ${client.user.username} ${new Date().getFullYear()}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        
        canal.send({ embeds: [embed] }).catch((e) =>{
            interaction.reply({
                content: `Ocorreu um erro ao enviar a mensagem`,
                ephemeral: true
              });
        });
    }else if(ac === "entrou"){
        const embed = new Discord.EmbedBuilder()
        .setTitle(title)
        .setColor(main.color)
        .addFields(
          { name: `⚙ | Nome:`, value: `${staff}` },
          { name: `⚙ | Ocorrido:`, value: `\`\`\`Entrou para a Equipe Prisma\`\`\`` },
          { name: `⚙ | Cargo do novo Staff:`, value: `${cargo}` }
      )//recomendo não mexer na parte onde tem ${x}, apenas no resto
        .setFooter({ text: `© ${client.user.username} ${new Date().getFullYear()}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        
        canal.send({ embeds: [embed] }).catch((e) =>{
            interaction.reply({
                content: `Ocorreu um erro ao enviar a mensagem`,
                ephemeral: true
              });
        });
      }else if(ac === "punicao"){
        const embed = new Discord.EmbedBuilder()
        .setTitle(title)
        .setColor(main.color)
        .addFields(
          { name: `⚙ | Staff:`, value: `${staff}` },
          { name: `⚙ | Ocorrido:`, value: `\`\`\`Punição\`\`\`` },
          { name: `⚙ | Cargo do Staff:`, value: `${cargo}` }
      )
        .setFooter({ text: `© ${client.user.username} ${new Date().getFullYear()}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        
        canal.send({ embeds: [embed] }).catch((e) =>{
            interaction.reply({
                content: `Ocorreu um erro ao enviar a mensagem`,
                ephemeral: true
              });
        });
        
    }
    interaction.reply({
        content: `**✅ | A mensagem será enviada em instantes.**`,
        ephemeral: true
      });
      

 }
};
