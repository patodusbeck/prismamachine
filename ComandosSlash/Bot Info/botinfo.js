const Discord = require("discord.js")
const os = require("os");
const main = require('../../main')

module.exports = {
  name: "botinfo", // Coloque o nome do comando
  description: "✨ » Utils - Fornece informações sobre o bot.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

      // OS - SISTEMA
      const osCpuArquitetura = os.arch();
      const cpuModel = os.cpus()[0].model;
      const osType = os.type();

      // OS - RAM
      const osRamTotal = formatMemory(os.totalmem()).value + formatMemory(os.totalmem()).unit;
      const osRamUsada = formatMemory(os.totalmem() - os.freemem()).value + formatMemory(os.totalmem() - os.freemem()).unit;

    let dono = main.developer; // Coloque seu ID
    let bot = client.user.tag;
    let avatar_bot = client.user.displayAvatarURL({ dynamic: true });
    let linguagem = main.ling;
    let livraria = main.library;
    let ping = client.ws.ping;

      await interaction.reply({
          embeds: [new Discord.EmbedBuilder()
              .setTitle(`Informações do Sistema`)
              .addFields(
                { name: `🤖 | Nome:`, value: `\`\`\`${bot}\`\`\`` },
                { name: `🤖 | Dono:`, value: `\`\`\`PrismaStudios </>\`\`\`` },
                { name: `⚙  | Ping:`, value: `\`\`\`${ping}\`\`\`` },
                { name: `⚙  | Linguagem de Programação:`, value: `\`\`\`${linguagem}\`\`\`` },
                { name: `📚 | Livraria:`, value: `\`\`\`${livraria}\`\`\`` },
                { name: `🪟 | Sistema Operacional:`, value: `\`\`\`${osType}\`\`\`` },
                { name: `💻 | CPU:`, value: `\`\`\`${cpuModel}\`\`\`` },
                { name: `🏛️ | Arquitetura do CPU:`, value: `\`\`\`${osCpuArquitetura}\`\`\`` },
                { name: `💾 | Memória RAM:`, value: `\`\`\`${osRamUsada}/${osRamTotal}\`\`\`` }
            )
              .setColor(main.color)
          ],
          ephemeral: true
      });

      // Função - Format RAM
      function formatMemory(memory) {
          let value, unit;
          if (memory >= 1024 * 1024 * 1024) {
              value = (memory / (1024 * 1024 * 1024)).toFixed(2);
              unit = 'GB';
          } else {
              value = (memory / (1024 * 1024)).toFixed(2);
              unit = 'MB';
          };
          return { value, unit };
      };

  }
}

