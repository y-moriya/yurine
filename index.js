const { Client, Intents } = require('discord.js');
const { token, roleId } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], partials: ['MESSAGE', 'USER'] });

client.on('messageDelete', ctx => {
  if (!ctx.member?.roles.cache.has(roleId)) {
    return
  }

  const content = ctx.content

  // こうしないとボットのメッセージを消すと一生タグが増える、やればわかる
  if (ctx.author?.bot) {
    ctx.channel.send(`${content}`)
    return
  }

  ctx.channel.send(`${content}`)
})

client.on('messageUpdate', (oldMessage, newMessage) => {
  if (!oldMessage.member?.roles.cache.has(roleId)) {
    return
  }

  const content = oldMessage.content

  // こうしないとボットのメッセージを消すと一生タグが増える、やればわかる
  if (oldMessage.author?.bot) {
    oldMessage.channel.send(`${content}`)
    return
  }

  oldMessage.channel.send(`${content}`)
})

client.login(token);
