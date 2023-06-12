const Discord = require("discord.js");
const moment = require("moment");// npm i moment

module.exports = {
    name: "bateponto",
    description: "✦ » Staff - Bater ponto",

    run: async (client, interaction) => {

        let botão_encerrar = new Discord.ButtonBuilder()
            .setCustomId("encerrar")
            .setLabel("Encerrar")
            .setStyle(4)

        let startTime = interaction.createdTimestamp;
        let elapsedTime = 0;
        let intervalId = setInterval(() => {
            elapsedTime++;
        }, 1000);

        let embed = new Discord.EmbedBuilder()
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setColor("#9c89ad")
            .addFields(
                {
                    name: "⏰ | Inicio:",
                    value: `<t:${Math.floor(startTime / 1000)}:F> (**<t:${Math.floor(startTime / 1000)}:R>**)`
                },
                {
                    name: "⏰ | Finalizou:",
                    value: `***Suporte em Andamento...***`,
                }
            )

        const row = new Discord.ActionRowBuilder().addComponents(botão_encerrar);

        let resposta = await interaction.reply({
            embeds: [embed],
            components: [row],
            fetchReply: true
        })

        const coletor = resposta.createMessageComponentCollector({ componentType: Discord.ComponentType.Button, filter: (m) => m.member.id == interaction.user.id });

        coletor.on("collect", async interactionn => {
            if (interactionn.customId === "encerrar") {
                clearInterval(intervalId);
                botão_encerrar.setDisabled(true), botão_encerrar.setLabel("Encerrado");
                const rows = new Discord.ActionRowBuilder().addComponents(botão_encerrar);

                let endTime = interactionn.createdTimestamp;
                let startTime = interaction.createdTimestamp;
                let duration = moment.duration(elapsedTime, "seconds");
                let formattedDuration = `${Math.floor(duration.asHours())}h ${duration.minutes()}m ${duration.seconds()}s`;

                await interactionn.update({
                    embeds: [
                        new Discord.EmbedBuilder()
                            .setColor("#9c89ad")
                            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 4096 }))
                            .setAuthor({ name: 'Bate Ponto Staff', iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                            .addFields(
                                {
                                    name: "⏰ | Inicio:",
                                    value: `<t:${Math.floor(startTime / 1000)}:F>`
                                },
                                {
                                    name: "⏰ | Finalizou:",
                                    value: `<t:${Math.floor(endTime / 1000)}:F>`,
                                },
                                {
                                    name: "⏳ | Tempo Total:",
                                    value: `\n\`\`\`ansi\n[31;1m${formattedDuration}[0m\`\`\``,
                                }
                            )
                    ], components: [rows]
                })
            }
        })

    }
}