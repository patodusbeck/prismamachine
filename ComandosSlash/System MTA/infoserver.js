/*const MTA = require("mtasa-informations")
const Discord = require('discord.js')
const client = require("../../index");

;(async()=>{
    const MTAClient = new MTA({ip: "190.115.197.10", port: 22003})
    await MTAClient.getServerByIp("190.115.197.10")
    .then((result)=> {
          const resultado = JSON.stringify(result);
          const resposta = client.channels.cache.get('1124874269667631136')
          if (!resposta) return;

          const Embed = new Discord.EmbedBuilder()
          .setTitle('Informações Server')
          .setDescription(`${resultado}`)
    resposta.send({embeds: [Embed]})
    })
    .catch((err)=> {
        console.log(err)
    })
    await MTAClient.getServerInfo()
    .then((result)=> {
        console.log(result)
    })
    .catch((err)=> {
        console.log(err)
    })
})()

/*const channellog = client.channels.cache.get('1124874269667631136');

if (!channellog) return;

  const Embed = new Discord.EmbedBuilder()
   .setTitle('Informações Server')
   .setDescription(`sexo`)
 channellog.send({embeds: [Embed]})*/