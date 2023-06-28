const Discord = require("discord.js")
const main = require('../../main')

module.exports = {
  name: "help", // Coloque o nome do comando
  description: "✨ » Utils - Veja o Menu de Comandos.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    const embed = new Discord.EmbedBuilder()
    .setTitle('🤖 Ver todos os comandos do bot!')
    .setColor(main.color)
    .setDescription('Selecione uma categoria de comandos para ver.')

    const row = new Discord.ActionRowBuilder()
	.addComponents(
	new Discord.StringSelectMenuBuilder()
    .setCustomId('menu')
	.setPlaceholder('selecione uma categoria de comandos.')
	.addOptions([
		{
			label: 'Diversão',
      emoji: '<:ecoediv:1088300634903679067>',
			value: 'economia',
		},
    {
      label: 'Outros',
      emoji: '<:outros:1088300678679646250>',
      value: 'outros',
  },
	]),
			);
            interaction.reply({embeds: [embed], components: [row], fetchReply: true}).then(msg => {

              const collector = msg.createMessageComponentCollector({ idle: 1000 * 60 * 10 });
              
              collector.on('collect', async i => {
              
                if(i.user.id != interaction.user.id) return i.reply({embeds: [new Discord.EmbedBuilder()
                  .setTitle(`👨 Calma ae...`)
                  .setColor(main.color)
                  .setDescription(`Só quem solicitou o menu pode usá-lo.`)
              ], ephemeral: true})
              
                 i.deferUpdate()
              
               if(i.values[0] == "economia"){
                 interaction.editReply({embeds: [new Discord.EmbedBuilder()
                  .setTitle('<:ecoediv:1088300634903679067> Comandos de Diversão:')
                  .setColor(main.color)
                  .addFields(
                      { name: '__Casar__', value: 'Casar com o amor da sua vida! Ou não...' },
                          { name: '__Divorciar__', value: 'Se divorciar do corno que te chifrou.' },
                      { name: '__Hug__', value: 'Dê um abraço em alguém.'},
                      { name: '__Kiss__', value: 'Beije alguém.' },
                      { name: '__Slap__', value: 'Dê um tapa em alguém.'},
                      { name: '__Ship__', value: 'Será que teremos um novo casal??'},
                      { name: '__Mina__', value: 'Jogo das Minas'},
                      { name:  '__Ppt__', value: 'Pedra, Papel e tesoura.'},
                      { name: '__Snake__', value: 'Saneke'},
                      { name: '__Rolar__', value: 'Role um dado e veja em que numero irá cair!'},
                  )
                  ]})
               }
                if(i.values[0] == "outros"){
                 interaction.editReply({embeds: [new Discord.EmbedBuilder()
                  .setTitle('🌐 Outros comandos:')
                  .setColor(main.color)
                  .addFields(
                      { name: '__Avaliar__', value: 'Avalie nossos Staff\'s '},
                      { name: '__Ping__', value: 'Ver o ping do bot e da Database.' },
                      { name: '__Help__', value: 'Ver uma lista de todos os comandos.' },
                      { name: '__Sugerir__', value: 'Faça uma sugestão'},
                      { name: '__UserInfo__', value: 'Veja as informações do úsuario'},
                      { name: '__ServerInfo__', value: 'Veja as informações do servidor.'},
                    )
                            ]})
                }

              })//collector
                
              })//.then
                  
                }
              }
                          