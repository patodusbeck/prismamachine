const Discord = require("discord.js");

module.exports = {
  name: "emoji-info",
  description: "✦ » Staff - Fornece informações sobre o emoji.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "cargo",
      description: "Mencione o cargo para exibir informações.",
      type: Discord.ApplicationCommandOptionType.Role,
      required: true,
    }
  ],

  run: async (client, interaction, args) => {
    const role = interaction.options.getRole("cargo");

    
    const permissions = role.permissions.toArray().map((p) => `\`${p}\``);

    
    const created = role.createdAt.toLocaleString("pt-BR", { timeZone: "UTC" });

    
    const roleInfo = {
  "✦ Menção": "\n" + `${role}` + "\n",
  "✦ ID do Cargo": "\n" + `\`${role.id}\`` + "\n",
  "✦ Exibir Separadamente": "\n" + (role.hoist ? "Sim" : "Não") + "\n",
  "✦ Integração": "\n" + (role.managed ? "Sim" : "Não") + "\n",
  "✦ Cor": "\n" + `\`${role.hexColor.toUpperCase()}\`` + "\n",
  "✦ Criado em": "\n" + `\`${created}\`` + "\n",
  "✦ Permissões": "\n" + (permissions.length ? permissions.join(", ") : "Nenhuma") + "\n",
};


    
    const embed = new Discord.EmbedBuilder()
      .setColor(role.color)
      .setTitle(`Informações do cargo \`${role.name}\``)
      .setThumbnail('https://cliply.co/wp-content/uploads/2021/08/372108630_DISCORD_LOGO_400.gif')
      .setDescription(
        Object.entries(roleInfo)
          .map(([key, value]) => `**${key}:** ${value}`)
          .join("\n")
      );

    
    await interaction.reply({ embeds: [embed] });
  }
};
