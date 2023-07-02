// - 𝔓𝔄𝔗𝔒 𝔇𝔘𝔖 𝔅𝔈ℭ𝔎 - //
// - developer by pato dus beck - //

const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const main = require('../../main');

module.exports = {
    name: "embed",
    description: "Crie um embed!",
    type: 1,
    options: [
        {
            name: "channel",
            description: "Escolha o canal para enviar o embed",
            type: 7,
            required: false
        }
    ],
    role_perms: [main.rpermission],
    developers_only: false,
    category: 'Administration',
    run: async (client, interaction, config) => {
        const channel = interaction.guild.channels.cache.get(interaction.options.get('channel')?.value || interaction.channel.id);

        if(!channel) return interaction.reply({
            content: `<:crosscircle:1122372730596110466> Canal invalido.`,
            ephemeral: true
        });

        const embedMain = new EmbedBuilder()
            .setTitle('Embed')
            .setDescription('Selecione uma opção no menu para editar.')
            .setColor(main.color);

        let embedToEdit = new EmbedBuilder()
            .setDescription('Me personalize!');

        interaction.reply({
            embeds: [
                embedMain,
                embedToEdit
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('embed_builder')
                        .setPlaceholder('Clique aqui para personalizar sua Embed.')
                        .addOptions(
                            {
                                label: "Autor",
                                value: "author"
                            },
                            {
                                label: "Titulo",
                                value: "title"
                            },
                            {
                                label: "Descrição",
                                value: "desc"
                            },
                            {
                                label: "Footer",
                                value: "footer"
                            },
                            {
                                label: "Cor",
                                value: "color"
                            },
                            {
                                label: "Imagem",
                                value: "image"
                            },
                            {
                                label: "Thumbnail",
                                value: "thumbnail"
                            }
                        )
                ),
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('embed_creator_save')
                        .setLabel('Enviar')
                        .setEmoji('<:badgecheck:1122372710085963786>')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId('embed_creator_restart')
                        .setLabel('Resetar')
                        .setEmoji('<:refresh:1121581824930500698>')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId('embed_creator_end')
                        .setLabel('Cancelar')
                        .setEmoji('<:crosscircle:1122372730596110466>')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId('embed_creator_help')
                        .setLabel('Ajuda')
                        .setEmoji('<:info:1122365966370746469>')
                        .setStyle(ButtonStyle.Secondary),
                )
            ],  ephemeral: true
        });

        const collectorMENU = interaction.channel.createMessageComponentCollector({
            type: ComponentType.StringSelect,
            filter: i => i.user.id === interaction.user.id
        });

        collectorMENU.on('collect', async (i) => {
            if (!i.values) return;

            const ID = i.values[0];

            // Author:
            if (ID === "author") {
                i.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Digite o nome do autor do embed neste canal.')
                            .setColor(main.color)
                            .setFooter({
                                text: "Digite \"cancelar\" Para cancelar."
                            })
                    ],
                    ephemeral: true
                }).catch(() => { });

                const filter = (m) => m.author.id === i.user.id

                await interaction.channel.awaitMessages({
                    filter: filter,
                    max: 1
                }).then(async (received) => {
                    received.first().delete().catch(() => { });

                    const message = received.first().content.substr(0, 256);

                    if (message === "cancelar") {
                        return i.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('<:crosscircle:1122372730596110466> Cancelado.')
                                    .setColor(main.color)
                            ]
                        });
                    };

                    embedToEdit.setAuthor({ name: message });

                    i.editReply({
                        content: `<:badgecheck:1122372710085963786> O  autor foi adicionado com sucesso!`,
                        embeds: [],
                        ephemeral: true
                    });

                    return interaction.editReply({ embeds: [embedMain, embedToEdit] }).catch(() => { });
                });
            };

            // Title:
            if (ID === "title") {
                i.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Digite o titulo do Embed neste chat.')
                            .setColor(main.color)
                            .setFooter({
                                text: "Digite \"cancelar\" Para cancelar"
                            })
                    ],
                    ephemeral: true
                }).catch(() => { });

                const filter = (m) => m.author.id === i.user.id

                await interaction.channel.awaitMessages({
                    filter: filter,
                    max: 1
                }).then(async (received) => {
                    received.first().delete().catch(() => { });

                    const message = received.first().content.substr(0, 256);

                    if (message === "cancelar") {
                        return i.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('<:crosscircle:1122372730596110466> Cancelado.')
                                    .setColor(main.color)
                            ]
                        });
                    };

                    embedToEdit.setTitle(message);

                    i.editReply({
                        content: `<:badgecheck:1122372710085963786> Título do embed adicionado.`,
                        embeds: [],
                        ephemeral: true
                    });

                    return interaction.editReply({ embeds: [embedMain, embedToEdit] }).catch(() => { });
                });
            };

            // Description:
            if (ID === "desc") {
                i.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Por favor escreva a descrição do embed nesse chat')
                            .setColor(main.color)
                            .setFooter({
                                text: "Digite \"cancelar\" para cancelar."
                            })
                    ],
                    ephemeral: true
                }).catch(() => { });

                const filter = (m) => m.author.id === i.user.id

                await interaction.channel.awaitMessages({
                    filter: filter,
                    max: 1
                }).then(async (received) => {
                    received.first().delete().catch(() => { });

                    const message = received.first().content.substr(0, 4096);

                    if (message === "cancelar") {
                        return i.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('<:crosscircle:1122372730596110466> Cancelado.')
                                    .setColor(main.color)
                            ]
                        });
                    };

                    embedToEdit.setDescription(message);

                    i.editReply({
                        content: `<:badgecheck:1122372710085963786> Descrição do embed adicionada com sucesso.`,
                        embeds: [],
                        ephemeral: true
                    });

                    return interaction.editReply({ embeds: [embedMain, embedToEdit] }).catch(() => { });
                });
            };

            // Footer:
            if (ID === "footer") {
                i.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Por favor digite nesse chat o Footer do Embed')
                            .setColor(main.color)
                            .setFooter({
                                text: "Digite \"cancelar\" Para cancelar."
                            })
                    ],
                    ephemeral: true
                }).catch(() => { });

                const filter = (m) => m.author.id === i.user.id

                await interaction.channel.awaitMessages({
                    filter: filter,
                    max: 1
                }).then(async (received) => {
                    received.first().delete().catch(() => { });

                    const message = received.first().content.substr(0, 2048);

                    if (message === "cancelar") {
                        return i.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('<:crosscircle:1122372730596110466> Cancelado.')
                                    .setColor(main.color)
                            ]
                        });
                    };

                    embedToEdit.setFooter({ text: message });

                    i.editReply({
                        content: `<:badgecheck:1122372710085963786> Footer adicionado com sucesso.`,
                        embeds: [],
                        ephemeral: true
                    });

                    return interaction.editReply({ embeds: [embedMain, embedToEdit] }).catch(() => { });
                });
            };

            // Color:
            if (ID === "color") {
                i.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Por favor digite o código HEX da cor nesse chat.')
                            .setFooter({
                                text: 'Digite \"cancelar\" Para cancelar | /n/ Observação: Para a API do Discord, é necessário fornecer as cores como "Blue", "Red"... etc. O nome da cor sempre deve começar com uma letra maiúscula.'})
                            .setColor(main.color)
                    ],
                    ephemeral: true
                }).catch(() => { });

                const filter = (m) => m.author.id === i.user.id

                await interaction.channel.awaitMessages({
                    filter: filter,
                    max: 1
                }).then(async (received) => {
                    received.first().delete().catch(() => { });

                    const message = received.first().content.substr(0, 256);

                    if (message === "cancelar") {
                        return i.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('<:crosscircle:1122372730596110466> Cancelado.')
                                    .setColor(main.color)
                            ]
                        });
                    };

                    try {
                        embedToEdit.setColor(message);
                    } catch (e) {
                        embedToEdit.setColor('Default');
                    };

                    i.editReply({
                        content: `<:badgecheck:1122372710085963786> Cor do embed foi adicionado com sucesso.`,
                        embeds: [],
                        ephemeral: true
                    });

                    return interaction.editReply({ embeds: [embedMain, embedToEdit] }).catch(() => { });
                });
            };

            // Image:
            if (ID === "image") {
                i.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Envie uma URL válida por favor')
                            .setFooter({
                                text: "Digite `\cancelar`\ para cancelar essa interação. Observação Certifique-se de que o link comece com \"http://\"Caso contrário não será exibido nada."
                            })
                            .setColor(main.color)
                    ],
                    ephemeral: true
                }).catch(() => { });

                const filter = (m) => m.author.id === i.user.id

                await interaction.channel.awaitMessages({
                    filter: filter,
                    max: 1
                }).then(async (received) => {
                    received.first().delete().catch(() => { });

                    const message = received.first().content.substr(0, 256);

                    if (message === "cancelar") {
                        return i.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('<:crosscircle:1122372730596110466> Cancelado.')
                                    .setColor(main.color)
                            ]
                        });
                    };

                    try {
                        embedToEdit.setImage(message);
                    } catch (e) {
                        embedToEdit.setImage(null);
                    };

                    i.editReply({
                        content: `<:badgecheck:1122372710085963786> Imagem do embed adicionada com sucesso`,
                        embeds: [],
                        ephemeral: true
                    });

                    return interaction.editReply({ embeds: [embedMain, embedToEdit] }).catch(() => { });
                });
            };

            // Thumbnail:
            if (ID === "thumbnail") {
                i.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Por favor digite o URL da thumbnail valida.')
                            .setFooter({
                                text: "Digite \"cancelar\" Para cancelar.\nImportante:  o início da URL tem que ser \"https://\"!"
                            })
                            .setColor(main.color)
                    ],
                    ephemeral: true
                }).catch(() => { });

                const filter = (m) => m.author.id === i.user.id

                await interaction.channel.awaitMessages({
                    filter: filter,
                    max: 1
                }).then(async (received) => {
                    received.first().delete().catch(() => { });

                    const message = received.first().content.substr(0, 256);

                    if (message === "cancelar") {
                        return i.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('<:crosscircle:1122372730596110466> Cancelado.')
                                    .setColor(main.color)
                            ]
                        });
                    };

                    try {
                        embedToEdit.setThumbnail(message);
                    } catch (e) {
                        embedToEdit.setThumbnail(null);
                    };

                    i.editReply({
                        content: `<:badgecheck:1122372710085963786> Thumbnail adicionada com sucesso.`,
                        embeds: [],
                        ephemeral: true
                    });

                    return interaction.editReply({ embeds: [embedMain, embedToEdit] }).catch(() => { });
                });
            };
        });

        const collectorBUTTONS = interaction.channel.createMessageComponentCollector({
            type: ComponentType.Button,
            filter: i => i.user.id === interaction.user.id
        });

        collectorBUTTONS.on('collect', async (i) => {
            const ID = i.customId;

            if (ID === "embed_creator_save") {
                channel.send({
                    embeds: [
                        embedToEdit
                    ]
                }).catch(() => { });

                await i.reply({
                    content: `<:badgecheck:1122372710085963786> Embed criada com sucesso! Enviei ela para: ${channel}.`,
                    ephemeral: true
                }).catch(() => { });

                interaction.deleteReply();

                return collectorBUTTONS.stop();
            };

            if (ID === "embed_creator_restart") {
                embedToEdit.setAuthor(null);
                embedToEdit.setTitle(null);
                embedToEdit.setDescription("Me edite!");
                embedToEdit.setFooter(null);
                embedToEdit.setColor(null);

                i.reply({
                    content: `<:badgecheck:1122372710085963786> Resetado.`,
                    ephemeral: true
                }).catch(() => { });

                return interaction.editReply({ embeds: [embedMain, embedToEdit] }).catch(() => { });
            };

            if (ID === "embed_creator_end") {
                interaction.deleteReply();

                return collectorBUTTONS.stop();
            };

            if (ID === "embed_creator_help") {
                i.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle('Como criar embed?')
                            .setDescription(`Para criar um embed basta apenas clicar no menu e selecionar a opção desejada para assim personalizar no jeitinho que você quiser!`)
                            .setColor(main.color)
                    ],
                    ephemeral: true
                }).catch(() => { });
            };
        });

    },
};