const Discord = require('discord.js');

module.exports = {
  name: 'embed',
  description: 'Teste Space Machine.',
  type: Discord.ApplicationCommandType.ChatInput,
  run: async (client, interaction, args) => {

              const embed = new Discord.EmbedBuilder()
                  .setTitle(`Personalize abaixo`)
                  .setDescription(`Lembre-se que seu Embed não pode ser vazio!`)
  
              const btn = new Discord.ActionRowBuilder()
                  .addComponents(
                      new Discord.ButtonBuilder()
                      .setCustomId(`${interaction.user.id}-titulo-embed-criar`)
                      .setLabel(`Titulo`)
                      .setStyle(Discord.ButtonStyle.Secondary),
                      new Discord.ButtonBuilder()
                      .setCustomId(`${interaction.user.id}-descricao-embed-criar`)
                      .setLabel(`Descrição`)
                      .setStyle(Discord.ButtonStyle.Secondary),
                      new Discord.ButtonBuilder()
                      .setCustomId(`${interaction.user.id}-cor-embed-criar`)
                      .setLabel(`Cor`)
                      .setStyle(Discord.ButtonStyle.Secondary),
                      new Discord.ButtonBuilder()
                      .setCustomId(`${interaction.user.id}-autor-embed-criar`)
                      .setLabel(`Autor`)
                      .setStyle(Discord.ButtonStyle.Secondary)
                  );
              const btn2 = new Discord.ActionRowBuilder()
                  .addComponents(
                      new Discord.ButtonBuilder()
                      .setCustomId(`${interaction.user.id}-campo-embed-criar`)
                      .setLabel(`Editar Campos`)
                      .setStyle(Discord.ButtonStyle.Secondary),
                      new Discord.ButtonBuilder()
                      .setCustomId(`${interaction.user.id}-image-embed-criar`)
                      .setLabel(`Imagem e Thumbnail`)
                      .setStyle(Discord.ButtonStyle.Secondary),
                      new Discord.ButtonBuilder()
                      .setCustomId(`${interaction.user.id}-rodape-embed-criar`)
                      .setLabel(`Rodapé`)
                      .setStyle(Discord.ButtonStyle.Secondary)
                  );
              const btn3 = new Discord.ActionRowBuilder()
                  .addComponents(
                      new Discord.ButtonBuilder()
                      .setCustomId(`${interaction.user.id}-importa-embed-criar`)
                      .setLabel(`Importar Json`)
                      .setEmoji('🔍')
                      .setStyle(Discord.ButtonStyle.Primary),
                      new Discord.ButtonBuilder()
                      .setCustomId(`${interaction.user.id}-exportar-embed-criar`)
                      .setLabel(`Exportar Json`)
                      .setEmoji('🔍')
                      .setStyle(Discord.ButtonStyle.Primary),
                      new Discord.ButtonBuilder()
                      .setCustomId(`${interaction.user.id}-enviar-embed-criar`)
                      .setLabel(`Enviar`)
                      .setEmoji('🔍')
                      .setStyle(Discord.ButtonStyle.Success)
                  );
  
              interaction.reply({ content: `Painel de Criação de Embed`,embeds: [embed], components: [btn, btn2, btn3] })
          }
        }
    