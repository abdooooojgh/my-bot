let handler = async function (m, { conn, args }) {

  const chatId = m.chat

  // لازم جروب
  if (!chatId.endsWith('@g.us')) {
    return m.reply('🚫 This command works in *groups only*!')
  }

  const sender = m.sender

  // بيانات الجروب
  const groupMetadata = await conn.groupMetadata(chatId)
  const participants = groupMetadata.participants

  // منشن أو رقم
  const mentioned = m.mentionedJid || []
  const numbers = args
    .filter(v => /^[0-9]+$/.test(v))
    .map(v => v + '@s.whatsapp.net')

  let targets = [...new Set([...mentioned, ...numbers])]

  // لو مفيش حد → يرقي نفسه
  if (targets.length === 0) {
    targets.push(sender)
  }

  for (let target of targets) {

    const user = participants.find(p => p.id === target)

    if (!user) {
      await conn.sendMessage(chatId, {
        text: `❌ العضو مش موجود: ${target.split('@')[0]}`
      }, { quoted: m })
      continue
    }

    if (user.admin === 'admin') {
      await conn.sendMessage(chatId, {
        text: `ℹ️ @${target.split('@')[0]} بالفعل ادمن`,
        mentions: [target]
      }, { quoted: m })
      continue
    }

    try {
      // 🔥 الترقية
      await conn.groupParticipantsUpdate(chatId, [target], 'promote')

      // 🔥 الرسالة الاحترافية
      const finalMessage = `
╭━━〔👑 𝐍𝐄𝐖 𝐀𝐃𝐌𝐈𝐍 👑〕━━╮
┃
┃ 🧛‍♂️ *User:* @${target.split('@')[0]}
┃ ⚡ *Status:* Promoted Successfully
┃
┃ 🪄 *By:* @${sender.split('@')[0]}
┃ 👑 *Welcome to the Elite Ranks*
┃ ☠ 𝑪𝒀𝑩𝑬𝑹 𝑪𝑶𝑹𝑬 ☠
┃
┃ 🛡️ Power granted... Use it wisely
╰━━━━━━⊰🔥⊱━━━━━━╯
`.trim()

      await conn.sendMessage(chatId, {
        text: finalMessage,
        mentions: [target, sender]
      }, { quoted: m })

    } catch (e) {
      await conn.sendMessage(chatId, {
        text: `❌ فشل الترقية: ${e.message}`
      }, { quoted: m })
    }
  }
}

// ✅ إعدادات الأمر
handler.command = ['ادمن']
handler.group = true
handler.admin = true       // لازم تكون انت ادمن
handler.botAdmin = true    // البوت لازم ادمن

export default handler