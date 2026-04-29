let handler = async (m, { conn, participants, isBotAdmin }) => {

  try {

    await conn.sendMessage(m.chat, {
      react: {
        text: "😈",
        key: m.key
      }
    })

    if (!m.isGroup)
      return conn.reply(m.chat, '❌ This command works only in groups', m)

    if (!isBotAdmin)
      return conn.reply(m.chat, '❌ I must be admin to remove members!', m)

    await conn.sendMessage(m.chat, { text: '😈💥 ACTIVATING TIME BOMB 💥😈' }, { quoted: m })

    await new Promise(r => setTimeout(r, 1000))
    await conn.sendMessage(m.chat, { text: 'مش لسه هعد 😂' })

    await new Promise(r => setTimeout(r, 1000))
    await conn.sendMessage(m.chat, { text: '💥 BOOM 💥' })

    // ❗ استبعاد البوت + الأدمنز
    let admins = participants.filter(p => p.admin).map(p => p.id)

    let users = participants
      .map(u => u.id)
      .filter(id =>
        id !== conn.user.jid &&   // البوت
        !admins.includes(id)      // الأدمنز
      )

    for (let user of users) {
      await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
      await new Promise(r => setTimeout(r, 700))
    }

    await conn.sendMessage(m.chat, { text: '😈 Done...' })

  } catch (err) {
    console.log(err)
    await conn.sendMessage(m.chat, {
      text: `❌ Error: ${err.message}`
    }, { quoted: m })
  }
}

handler.command = ['boom', 'بوم', 'صدعت']

export default handler