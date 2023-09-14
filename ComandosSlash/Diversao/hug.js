const Discord = require('discord.js')
const main = require('../../main')

module.exports = {
    name: "hug",
    description: "🔮 » Diversão - Abrace um membro.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "membro",
            description: "Mencione um membro.",
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        }
    ],
    run: async (client, interaction, args) => {

        let user = interaction.options.getUser("membro")

        let lista1 = [
            'https://imgur.com/RgfGLNk.gif',
            'https://i.imgur.com/r9aU2xv.gif',
            'https://i.imgur.com/wOmoeF8.gif',
            'https://i.imgur.com/nrdYNtL.gif',
            'https://imgur.com/82xVqUg.gif'
        ];

        let lista2 = [
            'https://imgur.com/c3WzMZu.gif',
            'https://imgur.com/BPLqSJC.gif',
            'https://imgur.com/ntqYLGl.gif',
            'https://imgur.com/v47M1S4.gif',
            'https://imgur.com/6qYOUQF.gif'
        ];

        let random1 = lista1[Math.floor(Math.random() * lista1.length)];
        let random2 = lista2[Math.floor(Math.random() * lista2.length)];

        let embed = new Discord.EmbedBuilder()
            .setDescription(`**O membro ${interaction.user} abraçou  ${user}.**`)
            .setImage(`${random1}`)
            .setColor(main.color)

        let button = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('1')
                    .setLabel('Retribuir abraço 🫂')
                    .setStyle(Discord.ButtonStyle.Success)
                    .setDisabled(false)

            )

        let embed1 = new Discord.EmbedBuilder()
            .setDescription(`**${user} Retribuiu o abraço de ${interaction.user}.**`)
            .setColor(main.color)
            .setImage(`${random2}`);

        interaction.reply({ embeds: [embed], components: [button] }).then(() => {

            const filter = i => i.customId === '1' && i.user.id === user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1 });

            collector.on('collect', async i => {

                if (i.customId === '1') {
                    i.reply({ embeds: [embed1] })
                }
            });

            collector.on("end", () => {
                interaction.editReply({
                    components: [
                        new Discord.ActionRowBuilder()
                            .addComponents(
                                new Discord.ButtonBuilder()
                                    .setCustomId('1')
                                    .setLabel('Retribuir 🫂')
                                    .setStyle(Discord.ButtonStyle.Success)
                                    .setDisabled(true)

                            )
                    ]
                })
            })
        })

    }
} 