const client = require("../../index");
const Discord = require("discord.js")
const main = require('../../main')

client.on("messageCreate", message => {

  if(message.author.bot) return;
  if(!message.guild) return;
  
  if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`){
  
  const embed = new Discord.EmbedBuilder()
    .setTitle(`${client.user.username}`)
    .setColor(main.color)
    .setThumbnail(client.user.avatarURL())
    .setDescription(`> **Opa!** Me chamo \`${client.user.username}\`, se precisar de ajuda use /help`)

   message.reply({embeds: [embed]})
  }
});