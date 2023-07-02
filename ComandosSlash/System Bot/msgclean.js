{}

/*const main = require('../../main.js')

client.on('messageDelete', async (message) => {
  const logsChannelId = `${main.levlog}`; // Insira o ID do canal de logs onde as mensagens apagadas serão enviadas

  // Verifica se o canal de logs foi definido anteriormente
  if (!logsChannelId) {
    console.log('Canal de logs não definido.');
    return;
  }

  // Verifica se o autor da mensagem deletada é um usuário (não é válido para mensagens do sistema)
  if (message.author && !message.author.bot) {
    const logsChannel = await client.channels.fetch(logsChannelId);

    logsChannel.send(
      `Mensagem apagada por **${message.author.id}** no canal <#${message.channel.id}>:\n\`\`\`${message.content}\`\`\``
    );
  }
});*/