let handler = async function (m, { conn }) {

  const from = m.chat

  const toM = a => '@' + a.split('@')[0]

  // الهدف
  let target = m.mentionedJid?.[0] || m.quoted?.sender

  if (!target) {
    return m.reply("⚠️ اعمل منشن او رد على شخص")
  }

  const steps = [
    "Getting victim IP address...",
    "Loading hack... 0%",
    "Loading images... 20%",
    "Loading videos... 40%",
    "Loading audios... 60%",
    "Loading files... 80%",
    "Finalizing... 100%",
    "Hack completed successfully ✅"
  ]

  let { key } = await conn.sendMessage(from, {
    text: steps[0],
    mentions: [target]
  }, { quoted: m })

  for (let i = 1; i < steps.length; i++) {
    await new Promise(r => setTimeout(r, 1000))

    await conn.sendMessage(from, {
      text: steps[i],
      edit: key,
      mentions: [target]
    })
  }

  await new Promise(r => setTimeout(r, 1500))

  await conn.sendMessage(from, {
    text: `💀 HACKED SUCCESSFULLY\n${toM(target)} all your data is mine 😈`,
    edit: key,
    mentions: [target]
  })
}

handler.command = ['اختراق']
handler.group = true

export default handler