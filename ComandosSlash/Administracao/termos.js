const Discord = require("discord.js")

module.exports = {
  name: "termos", // Coloque o nome do comando
  description: "✦ » Staff - Termos", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
        const embedajuda = new Discord.EmbedBuilder()
        .setTitle('Termos de Serviço & Termos de Uso')
        .setDescription(`
        <:serverrules:1115024947480363008> **JURÍDICO**

\`\`\`Sabemos o quão tentador é pular estes Termos e Políticas, mas é importante estabelecer o que você pode esperar de nós ao usar os serviços do Prisma Roleplay e o que esperamos de você. Nossos termos são de fácil compreensão, fique tranquilo.\`\`\`


**Termos de Serviço & Termos de Uso**\`\`\`cs
Última atualização: 05/06/2023.
\`\`\`

<:serverrules:1115024947480363008> **Esses termos contêm:**
\`\`\`
• Informações sobre os Serviços do Prisma Roleplay.
• Punições que serão adicionadas a você em caso de descumprimento.
• Ações proibidas.
• Conteúdos que não são permitidos.
\`\`\`

Olá, o Prisma Roleplay te deseja uma boas vindas. Uma forma de retribuir todo nosso trabalho e carinho é realizando uma doação, vale lembrar que as doações NÃO são obrigatórias para jogar na cidade, mas é uma forma de vocês nos ajudarem a mante-la. <:visualbasic:1115043415764258867>
        
        `)
        .setColor(`#9c89ac`)

        const b = new Discord.ButtonBuilder()
        .setLabel('Termos de Serviço')
        .setEmoji("<:logo:1115393036910874664>")
        .setStyle("Secondary")
        .setCustomId('fun')

        const b1 = new Discord.ButtonBuilder()
        .setLabel('Termos de Uso')
        .setEmoji("<:logo:1115393036910874664>")
        .setStyle("Secondary")
        .setCustomId('adm')

        const b3 = new Discord.ButtonBuilder()
        .setLabel("Regulamentos Gerais")
        .setEmoji("<:logo:1115393036910874664>")
        .setStyle("Secondary")
        .setCustomId("music")

        const ac = new Discord.ActionRowBuilder()
        .addComponents(b, b1, b3)

        const aa = await interaction.reply({embeds: [embedajuda], components: [ac]})

        const ccl = aa.createMessageComponentCollector()
        ccl.on('collect', async(help) => {

            if(help.customId === "fun") {

                const fun = new Discord.EmbedBuilder()
                .setTitle('Termos de Serviço do Prisma Roleplay <:logo:1115393036910874664>')
                  .setColor("#9c89ad")
                  .setDescription(`
                  **1. Utilização dos serviços do Prisma Roleplay <:serverrules:1115024947480363008>**

1.1 Para utilizar os Serviços do Prisma Roleplay, você deve obrigatoriamente concordar com os Termos de Serviço e confirma estar de acordo, podendo ser impedido de uso em caso de descumprimento das mesmas.

1.2 Você está de acordo que as doações até então realizadas são condicionados apenas em produtos virtuais, não sendo contemplado com produtos físicos ou entregas domiciliares.

1.3 Qualquer outra utilização ou intenção a fim de prejudicar o funcionamento parcial e/ou total do Servidor do Prisma Roleplay está sujeito a banimento permanente e suspensão total de todos os serviços que o Prisma Roleplay possa oferecer.

**2. Seus direitos ao utilizar os Serviços do Prisma Roleplay <:serverrules:1115024947480363008>**

2.1 Você tem o direito de utilizar os serviços do Prisma Roleplay, nenhuma cobrança será necessária para jogar em nosso servidor do Prisma Roleplay, desde que não viole nenhuma cláusula deste termo.

2.2 A Política de Uso está condicionado ao utilizar os Serviços do Prisma Roleplay.

2.3 Caso note que sua conta foi indevidamente bloqueado (banida) do Servidor do Prisma Roleplay, é de sua obrigação comunicar a equipe do Prisma Roleplay.

**3. Política de reembolso e informações complementares <:serverrules:1115024947480363008>**

3.1 Todas as doações realizadas na Prisma Roleplay é de forma voluntária.

3.2 As doações realizadas na Prisma Roleplay devem ser realizadas através do nosso Discord Oficial conforme os planos disponíveis. Não é de responsabilidade do Prisma Roleplay doações feitas a terceiros com exceção da breve autorização pelo Prisma Roleplay.

3.3 Não realizamos nenhum tipo de reembolso após ter feito qualquer doação. Também não realizamos nenhum reembolso ao ser suspenso (banido) do servidor por descumprimento das regras.
                  
                  
                  `)
                
                help.reply({embeds: [fun], ephemeral: true})
            }

            if(help.customId === "adm") {

                const adm = new Discord.EmbedBuilder()
                .setTitle('Termos de Uso do Prisma Roleplay <:serverrules:1115024947480363008>')
                  .setColor("#9c89ad")
                  .setDescription(`
                
                  > **1. Responsabilidades do jogador <:serverrules:1115024947480363008>**
                  
                  1.1 - Cada jogador é responsável por sua própria conta e deve mantê-la segura. Não compartilhe sua senha ou outras informações pessoais.
                  
                  1.2 - O jogador é responsável por seu comportamento no jogo e por seguir as regras do servidor.
                  
                  1.3 - O jogador é responsável por quaisquer ações realizadas em sua conta, incluindo atividades ilegais.
                  
                  1.4 - O jogador deve respeitar os direitos autorais e de propriedade intelectual de terceiros.
                  
                  > **2. Modificações no jogo <:serverrules:1115024947480363008>**
                  
                  2.1 - É permitido o uso de mods que não afetem o jogo de forma desleal ou prejudiquem a experiência de outros jogadores.
                  
                  2.2 - É proibido o uso de mods que possam causar falhas ou bugs no jogo.
                  
                  > **3. Suspensão e Banimento <:serverrules:1115024947480363008>**
                  
                  3.1 - A equipe do Prisma Roleplay tem o direito de suspender ou banir jogadores que violem as regras de conduta ou que se comportem de maneira inadequada.
                  
                  3.2 - A suspensão ou banimento pode ser temporário ou permanente, dependendo da gravidade da infração.
                  
                  3.3 - A equipe do servidor não é obrigada a fornecer aviso prévio antes de aplicar uma suspensão ou banimento.
                  
                  > **4. Alterações nos Termos de Uso <:serverrules:1115024947480363008>**
                  
                  4.1 - Os Termos de Uso do Prisma Roleplay podem ser atualizados ou modificados a qualquer momento.
                  
                  4.2 - Os jogadores serão notificados sobre quaisquer alterações nos Termos de Uso.
                  
                  > **5. Contato <:serverrules:1115024947480363008>**
                  
                  5.1 - Em caso de dúvidas ou problemas, entre em contato com a equipe do Prisma Roleplay por meio do nosso discord oficial ou por meio do suporte in-game.
                  
                  > **6. Regras Internas (in-game) <:serverrules:1115024947480363008>**
                  
                  6.1 - Alem deste Termo de Uso, temos nossas regras internas. Leia-as em <#1114964338025963561>`)
                
                help.reply({embeds: [adm], ephemeral: true})
            }

            if(help.customId === "music") {

                const music = new Discord.EmbedBuilder()
                .setTitle('Regras Gerais Prisma Roleplay <:serverrules:1115024947480363008>')
                             .setColor("#9c89ad")
                             .setDescription(`
                             As regras do Prisma Roleplay são estabelecidas para garantir que os jogadores mantenham um ambiente de jogo **saudável e justo**. As regras definem comportamentos **inaceitáveis** e as punições correspondentes para jogadores que as violarem.

                             ** <:logo:1115393036910874664> Para ler as nossas regras, acesse nosso canal de regras [clicando aqui](https://discord.com/channels/1114964337237434411/1114964338025963561)**
                             
                             **<:slayerinfo2:1115043414455619664> Lembre-se!** É importante seguir as regras da cidade para manter um ambiente de jogo saudável e justo para todos os jogadores.
                             `)
                
                help.reply({embeds: [music], ephemeral: true})
            }

        })
        
    }
}