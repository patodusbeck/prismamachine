const Discord = require('discord.js');
const main = require('../../main')
module.exports = {
  name: 'emoji',
  description: '✦ » Staff - Sistema Emojis',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'add',
      description: '✦ » Staff - Adicionar emoji ao servidor',
      type: Discord.ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'nome',
          description: '✦ » Staff - Selecionar nome do emoji',
          type: Discord.ApplicationCommandOptionType.String,
          required: true,

        },
        {
          name: 'link',
          description: '✦ » Staff - Insira um link válido do Discord',
          type: Discord.ApplicationCommandOptionType.String,
        },
        {
          name: 'arquivo',
          description: '✦ » Staff - Escolha uma mídia do arquivo',
          type: Discord.ApplicationCommandOptionType.Attachment,
        }
      ],
    },
  ],

  async run(client, interaction, args) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case 'add':
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
          return interaction.reply({ content: 'Erro!\nVocê não tem permissão para executar este comando.', ephemeral: true });
        }

        const name = interaction.options.getString('nome');
        const link = interaction.options.getString('link');
        const upload = interaction.options.getAttachment('arquivo');

        let attachment;
        if (upload) {
          attachment = upload.attachment;
        } else if (link && link.includes('discord')) {
          attachment = link;
        } else {
          return interaction.reply({ content: 'Erro!\nVocê deve fornecer um link válido do Discord ou enviar uma mídia do seu arquivo.', ephemeral: true });
        }

        await interaction.reply({ content: '<:logo:1115393036910874664> Adicionando Emoji... Calma aí!' });
        const emoji = await interaction.guild.emojis.create({ attachment, name }).catch(err => {
          setTimeout(() => {
            console.log(err);
            return interaction.editReply({ content: `${err.rawError.message}` });
          }, 2000)
        });

        setTimeout(() => {
          if (!emoji) return;

          let thumbnailUrl;
          if (emoji.animated) {
            thumbnailUrl = `https://cdn.discordapp.com/emojis/${emoji.id}.gif?v=1`;
          } else {
            thumbnailUrl = `https://cdn.discordapp.com/emojis/${emoji.id}.png?v=1&size=64`;
          }

          const embed = new Discord.EmbedBuilder()
            .setTitle('Emoji Adicionado Com Sucesso!')
            .setColor(main.color)
            .addFields(
              { name: `<:logo:1115393036910874664> | Nome:`, value: `> ${name}`, inline: true },
              { name: '<:logo:1115393036910874664> | Animado?', value: emoji.animated ? '> Sim' : '> Não', inline: true },
              { name: `<:logo:1115393036910874664> | Criado Por:`, value: `> ${interaction.user}`, inline: true },
            )
            .setThumbnail(thumbnailUrl)
            .setTimestamp()

          interaction.editReply({ content: '', embeds: [embed] });
        }, 3000);
        break;
      case 'rename':
        const emojiString = interaction.options.getString('emoji');
        const newEmojiName = interaction.options.getString('nome');
        const guild = interaction.guild;
        const emojiID = emojiString.match(/:(\d+)>/)[1];
        const emoji1 = guild.emojis.cache.find((emoji1) => emoji1.id === emojiID);

        if (!emoji1) {
          return interaction.reply(`O emoji ${emojiString} não foi encontrado no servidor.`);
        }

        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
          return interaction.reply('Você precisa ser um administrador para usar este comando!');
        }

        const message = await interaction.reply({
          content: '<a:load:1092640837697015898> Renomeando Emoji...',
        });

        const oldName = emoji1.name;

        try {
          await emoji1.setName(newEmojiName);

          const embed = new Discord.EmbedBuilder()
            .setTitle('Emoji Renomeado Com Sucesso!')
            .setColor(main.color)
            .setThumbnail(emoji1.url)
            .addFields(
              { name: `<:tag:1094460828549386340> | Nome Antigo:`, value: `> ${oldName}`, inline: true },
              { name: `<:tag:1094460828549386340> | Novo Nome:`, value: `> ${newEmojiName}`, inline: true },
              { name: '<:null:1094461028198273164> | Animado?', value: emoji1.animated ? '> Sim' : '> Não', inline: true },
              { name: `<:user_icon:1094460952809852988> | Renomeado Por:`, value: `> ${interaction.user}`, inline: true },
            )
            .setTimestamp();

          message.edit({ content: null, embeds: [embed] });
        } catch (err) {
          console.error(err);
          interaction.reply({ comtent: `Ocorreu um erro ao renomear o emoji ${emoji1.name}.`, ephemeral: true });
        };
        break;
      case 'delete':
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
          return interaction.reply('Você precisa ser um administrador para usar este comando!');
        }
        const emoji_ = interaction.options.getString('emoji');
        const guild_ = interaction.guild;
        const emojiID_ = emoji_.match(/:(\d+)>/)[1];
        const emojiToRemove_ = guild_.emojis.cache.find(emoji_ => emoji_.id === emojiID_);
        if (emojiToRemove_) {
          const message_ = await interaction.reply({ content: '<a:load:1092640837697015898> Deletando Emoji...' });

          const embed_ = new Discord.EmbedBuilder()
            .setTitle('Emoji Deletado Com Sucesso!')
            .setColor(main.color)
            .setThumbnail(emojiToRemove_.url)
            .addFields(
              { name: '<:tag:1094460828549386340> | Nome:', value: `> ${emojiToRemove_.name}`, inline: true },
              { name: '<:null:1094461028198273164> | Animado?', value: emojiToRemove_.animated ? '> Sim' : '> Não', inline: true },
              { name: '<:user_icon:1094460952809852988> | Deletado Por:', value: `> ${interaction.user}`, inline: true },
            );

          message_.edit({ content: null, embeds: [embed_] });
          emojiToRemove_.delete();
        } else {
          interaction.reply(`O emoji  não foi encontrado no servidor.`);
        };
        break;
      case 'info':
        let emojiStringz = interaction.options.getString("emoji")

        let emojiz = client.emojis.cache.find(emojiz => `<:${emojiz.name}:${emojiz.id}>` === emojiStringz) || client.emojis.cache.find(emojiz => emojiz.name === emojiStringz) || client.emojis.cache.get(emojiStringz);

        if (!emojiz) {
          interaction.reply({ content: 'Não encontrei o emoji, tente usar /emoji info (nome_do_emoji)', ephemeral: true });
        } else if (emojiz) {
          try {
            if (!emojiz.animated) {
              let img = `https://cdn.discordapp.com/emojis/${emojiz.id}.png?size=2048`;


              let botao = new Discord.ActionRowBuilder()
                .addComponents(
                  new Discord.ButtonBuilder()
                    .setStyle(Discord.ButtonStyle.Link)
                    .setLabel("Download")
                    .setEmoji("📎")
                    .setURL(img));

              let embedz = new Discord.EmbedBuilder()
                .setColor(main.color)
                .setTitle("Informações do Emoji:")
                .setThumbnail(`${img}`)
                .addFields(

                  {
                    name: `<:tag:1094460828549386340> | Nome:`,
                    value: `> ${emojiz.name}`,
                    inline: true
                  },
                  {
                    name: `<:ids:1094961084374470686> | ID:`,
                    value: `> ${emojiz.id}`,
                    inline: true
                  },

                  {
                    name: `<:mention:1094960769864581180> | Menção:`,
                    value: `> \`${emojiz}\``,
                    inline: true
                  },

                  {
                    name: `<:type:1094966247118082118> | Tipo:`,
                    value: `> Imagem Fixa`,
                    inline: true
                  },

                  {
                    name: `<:server:1094961451577381035> | Criado em:`,
                    value: `> <t:${parseInt(emojiz.createdTimestamp / 1000)}>`,
                    inline: true
                  });

              interaction.reply({ embeds: [embedz], components: [botao] })

            }



            else if (emojiz.animated) {

              let img = `https://cdn.discordapp.com/emojis/${emojiz.id}.gif?size=2048`;

              let botao = new Discord.ActionRowBuilder()
                .addComponents(
                  new Discord.ButtonBuilder()
                    .setStyle(Discord.ButtonStyle.Link)
                    .setLabel("Download")
                    .setEmoji("📎")
                    .setURL(`${img}`));

              let embedz = new Discord.EmbedBuilder()
                .setColor(main.color)
                .setTitle("Informações do Emoji:")
                .setThumbnail(img)
                .addFields(

                  {
                    name: `<:tag:1094460828549386340> | Nome:`,
                    value: `> ${emojiz.name}`,
                    inline: true
                  },

                  {
                    name: `<:ids:1094961084374470686> | ID:`,
                    value: `> ${emojiz.id}`,
                    inline: true
                  },

                  {
                    name: `<:mention:1094960769864581180> | Menção:`,
                    value: `> \`${emojiz}\``,
                    inline: true
                  },

                  {
                    name: `<:type:1094966247118082118> | Tipo:`,
                    value: `Imagem Animada`,
                    inline: true
                  },

                  {
                    name: `<:server:1094961451577381035> | Criado em:`,
                    value: `<t:${parseInt(emojiz.createdTimestamp / 1000)}>`,
                    inline: true
                  });

              await interaction.reply({ embeds: [embedz], components: [botao] })
            }
          } catch (e) {

            interaction.reply({ content: ` Ops! Não consegui identificar o emoji.`, ephemeral: true });

          }
        };
        break;
      default:
        WhizDigy = new Discord.EmbedBuilder()
          .setTitle('Erro!')
          .setDescription('Houve um erro inesperado, por favor, tente novamente.')
          .setColor(main.color);
        interaction.reply({ embeds: [WhizDigy], ephemeral: true })
    }
  },
};