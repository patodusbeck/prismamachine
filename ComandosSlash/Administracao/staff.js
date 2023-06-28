const Discord = require("discord.js")
const main = require('../../main')

module.exports = {
  name: "staff", // Coloque o nome do comando
  description: "✦ » Staff - Veja o Menu de Moderação!", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    const embed = new Discord.EmbedBuilder()
    .setTitle('🤖 Ver todos os comandos de moderação!')
    .setColor(main.color)
    .setDescription(`Selecione uma categoria de comandos para ver.`)

    const row = new Discord.ActionRowBuilder()
	.addComponents(
	new Discord.StringSelectMenuBuilder()
    .setCustomId('menu')
	.setPlaceholder('Selecione uma categoria')
	.addOptions([
		{
			label: 'Moderação Geral',
      emoji: '<:bccin:1016871494514659399>',
			value: 'economia',
		},
    {
      label: 'Moderação Whitelist',
      emoji: '<:bccin:1016871494514659399>',
      value: 'outros',
  },
  {
    label: "Moderação in-game",
    //description: "",
    emoji: "<:bccin:1016871494514659399>",
    value: "regras"
  },
	]),
			);
            interaction.reply({embeds: [embed], components: [row], fetchReply: true}).then( () => {
              interaction.channel.createMessageComponentCollector().on("collect", (c) => {
                  let valor = c.values[0];
              
               if(valor == "economia"){
                 interaction.editReply({embeds: [new Discord.EmbedBuilder()
                  .setTitle('<:__:1051498240392044555> Comandos de Moderação Staff')
                  .setColor(main.color)
                  .addFields(
                      { name: '__Anunciar__', value: 'Faça um anuncio!' },
                      { name: '__Ban__', value: 'Banir úsuario.' },
                      { name: '__Bateponto__', value: 'Bate Ponto.' },
                  { name: '__Clear__', value: 'Limpar mensagens.' },
                      { name: '__Kick__', value: 'Expulsar úsuario do servidor.' },
                          { name: '__Lock__', value: 'Fechar canal.' },
                      { name: '__Say__', value: 'Faça o bot enviar uma mensagem.' },
                  { name: '__Setnick__', value: 'Altere o nickname do úsuario.' },
                      { name: '__Setstatus__', value: 'Setar status do bot.' },
                  { name: '__Slowmode__', value: 'Setar modo lendo.' },
                      { name: '__Sorteio__', value: 'Faça um sorteio.' },
                  { name: '__Staff__', value: 'Menu de comandos de moderação.' },
                      { name: '__Unlock__', value: 'Abrir canal.' },
                      )
                  ]})
               }
               c.deferUpdate()
                if(valor == "outros"){
                 interaction.editReply({embeds: [new Discord.EmbedBuilder()
                  .setTitle('Lista de Comandos Whitelist <:serverrules:1115024947480363008>')
                  .setColor(main.color)
                  .addFields(
                    { name: '__App__', value: 'Aprovar Whitelist!' },
                    { name: '__V__', value: 'Dar cargo de Cidadão e Alterar Nome.' },
                    { name: '__Canal de Verificação Whitelist__', value: '<#1094454567208493189>' },
                    { name: '__Canal onde Fazer Whitelist__', value: '<#1084678332194500748>' },
                    )
 
                            ]})
                          }
                          if(valor == "regras"){
                            interaction.editReply({embeds: [new Discord.EmbedBuilder()
                             .setTitle('Moderação in-game <:serverrules:1115024947480363008>')
                             .setColor(main.color)
                             .setDescription(`** <:__:1051498240392044555> Observação: **

                             Todos os comandos devem ser antecedidos de "**/**" e todas as letras minusculas. (Exceto o NC)
                             \`\`\`Exemplo: /setall [id]\`\`\``)
                             .addFields(
                              { name: '__Anunciar__', value: 'Notifica todos os jogadores [Somente Owner].' },
                              { name: '__Resetmoney [id] __', value: 'Retirar todo dinheiro de um player [Somente Owner].' },
                              { name: '__Setall [id]__', value: 'Setar vida, colete, fome e sede no player' },
                              { name: '__Setfome__', value: '100% de Comida no player.' },
                              { name: '__Setsede__', value: '100% de Água no player.' },
                              { name: '__Setfuel__', value: 'Setar gasolina no carro do player' },
                              { name: '__Setvida__', value: '100% de vida.' },
                              { name: '__Setcolete__', value: 'Setar colete no player.' },
                              { name: '__Setstatus__', value: 'Setar status do bot.' },
                              { name: '__SS [id]__', value: 'Set skin em você mesmo.' },
                              { name: '__Fix [id]__', value: 'Reparar veiculo.' },
                              { name: '__DV [id]__', value: 'Destruir Veiculo do player.' },
                              { name: '__TP [id]__', value: 'Teleportar ao player.' },
                              { name: '__Puxar [id]__', value: 'Puxar player até você.' },
                              { name: '__Gela [id]__', value: 'Congelar player.' },
                              { name: '__Desvirar [id]__', value: 'Desvirar carro do player.' },
                              { name: '__Desbugar [id]__', value: 'Desbugar player.' },
                              { name: '__Curar [id]__', value: 'Curar player [SAMU].' },
                              { name: '__Abrir__', value: 'Abrir carro trancado.' },
                              { name: '__SV__', value: 'Entrar em serviço Staff [Iniciar Atendimento].' },
                              { name: '__NC__', value: 'nc voar invisivel e NC voar normal.' },
                              { name: '__Dvall [id]__', value: 'Destruir todos os veículos da cidade [Somente Owner]' },
                              { name: '__Chamados__', value: 'Para aceita chamandos de players.' },
                              { name: '__Punir__', value: 'Abrir o painel de punição' },
                              { name: '__St__', value: 'Chat Staff.' },
                              )
                            ]})
                          }
                        })
                    })
                
                
                    
                  }
                }