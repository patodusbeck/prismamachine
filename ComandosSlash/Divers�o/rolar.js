const Discord = require('discord.js')
module.exports = {
    name: "rolar",
    description: "🎰 » Games - Rolar dado",
    type: Discord.ApplicationCommandType.ChatInput,
    run: async (client, interaction, args) => {

        var lista1 = [
            'https://i.pinimg.com/564x/59/cc/84/59cc848973e7f9f579abe796c4f9c0c9.jpg',
            'https://i.pinimg.com/736x/78/cf/39/78cf3998e299713f2e7c632a515c4a98.jpg',
            'https://i.pinimg.com/564x/85/1b/d3/851bd32da4a929cf503ff3fa31be2c95.jpg',
            'https://i.pinimg.com/564x/52/47/98/5247985305c074c7a61286f61fc8e224.jpg',
            'https://i.pinimg.com/564x/d3/65/48/d36548655a2b28b827ea8964e3e5fafc.jpg',
            'https://i.pinimg.com/564x/37/ce/b2/37ceb2a5709dbbf6d8cffab97d568801.jpg'
        ];
//        const dadus = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"]
  //      dadu = dadus[Math.floor(Math.random() * dadus.length)]
    //    dador = fs.readFileSync('./database/dado/' + dadu + '.webp')
        var lista2 = [
            'https://imgur.com/3jzT5g6.gif',
            'https://imgur.com/VrETTlv.gif',
            'https://imgur.com/FozOXkB.gif',
            'https://imgur.com/7GhTplD.gif',
            'https://imgur.com/B6UKulT.gif'
        ];

        var random1 = lista1[Math.floor(Math.random() * lista1.length)];

        const embed = new Discord.EmbedBuilder()
            .setDescription(`**${interaction.user} Rolou o dado e ele parou em:**`)
            .setImage(`${random1}`)
            .setColor("#9c89ad")

            interaction.reply({ embeds: [embed], }).then(() => {
                const filter = i => i.customId === '1' && i.user.id === user.id;
                const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1 });

            collector.on("end", () => {
                interaction.editReply({
                    components: [
                        new Discord.ActionRowBuilder()
                            .addComponents(
                                new Discord.ButtonBuilder()
                                    .setCustomId('1')
                                    .setLabel('Retribuir Beijo')
                                    .setStyle(Discord.ButtonStyle.Primary)
                                    .setDisabled(true)

                            )
                    ]
                })
            })
        })
    }
}