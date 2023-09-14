const { ApplicationCommandOptionType, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const puppeteer = require('puppeteer');

module.exports = {
    name: "takescreen",
    description: "Take a screenshot of a website",
    options: [
        {
            name: "website-link",
            description: "The website to take a screenshot of",
            type: ApplicationCommandOptionType.String,
            required: true
        },
    ],
    run: async(client, interaction) => {

        await interaction.deferReply({ ephemeral: true });

        const { options } = interaction;
        const website = options.getString('website-link');

        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(website);
            await page.setViewport({ width: 1920, height: 1080 });
 
            const screenshot = await page.screenshot();
            await browser.close();
 
            const buffer = Buffer.from(screenshot, 'base64');
            const attachment = new AttachmentBuilder(buffer, { name: "image.png"})
 
            const embed = new EmbedBuilder()
            .setColor('Blurple')
            .setImage('attachment://image.png')
 
            await interaction.editReply({ embeds: [embed], files: [attachment] })
        } catch (e) {
            console.log(e)
            await interaction.editReply({ content: "⚠️ There was an error getting that screenshot- try again with a valid website!"})
        }

    }
}
