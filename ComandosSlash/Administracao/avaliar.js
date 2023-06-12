const { Client, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "avaliar",
    description: "✦ » Feedback - Avalie nossos Staff's!",
    category: "Utilidade",
    options: [
        {
          name: "staff",
          description: "Qual staff você avaliará?",
          type: 6,
          required: true,
        },
        {
            name: "avaliar",
            description: "Selecione de 1 estrela a 5 para a qualidade do atendimento.",
            type: 3,
            required: true,
            choices: [
                { name: "⭐", value: "⭐" },
                { name: "⭐⭐", value: "⭐⭐" },
                { name: "⭐⭐⭐", value: "⭐⭐⭐" },
                { name: "⭐⭐⭐⭐", value: "⭐⭐⭐⭐" },
                { name: "⭐⭐⭐⭐⭐", value: "⭐⭐⭐⭐⭐"},
            ]
        },
        {
            name: "feedback",
            description: "descreva a sua avaliação",
            type: 3,
            required: true,
        },
    ],

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */

    run: async (client, interaction) => {

        const { options, guild } = interaction;
        const vendedor = options.getUser("staff");
        const estrelas = options.getString("avaliar");
        const texto = options.getString("feedback");
    
        const ID = "1116543569973489764"; // Channel onde sera enviado a avaliação
        const Cargo = "1114964337237434413"; // Cargo de cliente 
    
        if (!interaction.member.roles.cache.has(Cargo)) {
          return interaction.reply({
            embeds: [
                new EmbedBuilder()
                  .setDescription(':x: Você não tem permissão para usar este comando')
                  .setColor('#9c89ad'),
              ],
              ephemeral: true,
          });
        }
    
        const embed = new EmbedBuilder()
          .setTitle('Feedback Staff')
          .setDescription('Digite **/avaliar** para avaliar um de nossos Staff\'s.')
          .addFields([
            {
              name: ':writing_hand: ┃ Avaliação enviada por:',
              value: `> ${interaction.user} \`[${interaction.user.tag}]\``,
            },
            {
              name: ':bust_in_silhouette: ┃ Staff avaliado:',
              value: `> ${vendedor} \`[${vendedor.tag}]\``,
            },
            {
              name: '🏆 ┃ Estrelas:',
              value: `> ${estrelas}`,
            },
            {
              name: ':scroll: ┃ Feedback:',
              value: "```" + texto + "```",
            },
          ])
          .setColor('#9c89ad')
          .setThumbnail(guild.iconURL({ dynamic: true }))
          .setFooter({ text: `© ${guild.name}`, iconURL: guild.iconURL() });
    
        guild.channels.cache.get(ID).send({
          embeds: [embed],
        });
    
        await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setDescription(`A sua avaliaçao foi enviada com sucesso!\n\n Caso tenha alguma dúvida nos contate por [Ticket](https://discord.com/channels/906262123573805087/1018625032362143844) \n\n Obrigado pelo feedback! :)`)
              .setColor('#9c89ad'),
          ],
          ephemeral: true,
        });

    }
}