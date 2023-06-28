const Discord = require('discord.js');
const { PIX } = require('gpix/dist');
const Canvas = require('canvas');
const main = require('../../main')

module.exports = {
    name: 'pix',
    description: '🛒 Gerar PIX.',
    type: Discord.ApplicationCommandType.ChatInput,
    adminOnly: true,
    options: [
        {
            name: 'valor',
            description: '✦ Valor do Produto vendido. (NÃO USE PONTO OU VIRGULA! COLOQUE O NUMERO INTEIRO)',
            type: Discord.ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name: 'descrição',
            description: "✦ Item Vendido",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: "🛒 VIP Prime - 30 Dias", value: "🛒 VIP Prime - 30 Dias"},
                { name: "🛒 VIP Ghast- 30 Dias", value: "🛒 VIP Ghast - 30 Dias" },
                { name: "🛒 VIP Rainbow - 30 Dias", value: "🛒 VIP Rainbow - 30 Dias"},
                { name: "🛒 VIP Advanced - 30 Dias", value: "🛒 VIP Advanced - 30 Dias" },
                { name: "🛒 VIP Legendary - 30 Dias", value: "🛒 VIP Legendary - 30 Dias" },
                { name: "🛒 VIP Patrocinador - 30 Dias", value: "🛒 VIP Patrocinador - 30 Dias" },
                { name: "🛒 Unban por máximo de punições", value: "🛒 Unban por máximo de punições"},
                { name: "🛒 Unban Comercio Ilegal", value: "🛒 Unban Comercio Ilegal"},
                { name: "🛒 Unban Dark RP", value: "🛒 Unban Dark RP"},
                { name: "🛒 Registros (ID)", value: "🛒 Registros (ID) - Até o final da Season" },
                { name: "🛒 Base Privada  - 30 dias", value: "🛒 Base Privada  - 30 dias" },
                { name: "🛒 Skin Privada  - 30 dias", value: "🛒 Skin Privada  - 30 dias" },
                { name: "🛒 PCoins", value: "🛒 PCoins" },
            ]
        },
        {
            name: "chave",
            description: "✦ Chave Pix (Para receber a doação).",
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async (client, interaction) => {

        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
            return interaction.reply({content: `Você não tem permissão para executar este comando.`, ephemeral: true});
        }
                  
        const valor = interaction.options.getNumber('valor');
        const desc = interaction.options.getString('descrição')
        const chave = interaction.options.getString('chave')
        
        const pix = PIX.static().setReceiverName(client.user.username)
            .setReceiverCity('Brasil')
            .setKey(chave)
            .setDescription(desc)
            .setAmount(valor);

            const canvas = Canvas.createCanvas(1200, 1200);
            const context = canvas.getContext('2d');
            const qrCodeImage = await Canvas.loadImage(await pix.getQRCode());
            context.fillStyle = '#FFFFFF';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.drawImage(qrCodeImage, 0, 0, canvas.width, canvas.height);

            const img = "https://cdn.discordapp.com/icons/906262123573805087/a50c5d49c3b68fb960cc73b33753a700.webp"
        const embed = new Discord.EmbedBuilder()
            .setTitle(`Shop Prisma <:store:1115041238220021931>`)
            .setThumbnail(img)
            .setImage(`attachment://qrcode.png`)
            .addFields(
                { name: '<:caixa:1076904224048287764> Item:', value: `${desc}` },
                { name: '<:Dinheiro:1016870214324977674> Valor:', value: `R$${valor.toFixed(2)}` },
            )
            //.setDescription(`Item: ${desc}`)
            .setColor(main.color);

        await interaction.channel.send({
            embeds: [embed],
            files: [{
                name: 'qrcode.png',
                attachment: canvas.toBuffer()
            }]
        });

        await interaction.reply({content: `A chave pix que você enviou foi \n **${chave}** \n Caso a chave pix tiver escrita incorretamente, o pix não irá funcionar.`, ephemeral: true})
    }
}

// Feito por PatoDusBeck