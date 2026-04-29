let handler = async function (m, { conn }) {
  try {
    const chatId = m.chat
    const sender = m.sender

    // لازم جروب
    if (!chatId.endsWith('@g.us')) return

    // الهدف (منشن أو رد)
    let target = m.mentionedJid?.[0] || m.quoted?.sender

    if (!target) {
      return m.reply('⚠️ اعمل منشن أو رد على الشخص')
    }

    // بيانات الجروب
    const groupMetadata = await conn.groupMetadata(chatId)
    const participants = groupMetadata.participants

    const user = participants.find(p => p.id === target)

    if (!user) {
      return m.reply('❌ العضو مش موجود في الجروب')
    }

    // 🔥 الطرد
    await conn.groupParticipantsUpdate(chatId, [target], 'remove')

    // رسالة بعد الطرد
    await conn.sendMessage(chatId, {
      text: `💀 تم طرد @${target.split('@')[0]} بنجاح`,
      mentions: [target]
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply('❌ حصل خطأ')
  }
}

// إعدادات الأمر
handler.command = ['طرد']
handler.group = true
handler.admin = true       // لازم انت ادمن
handler.botAdmin = true    // البوت ادمن

export default handler