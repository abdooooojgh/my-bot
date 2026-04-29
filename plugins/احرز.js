let games = {} // تخزين الألعاب مؤقتًا

let handler = async function (m, { conn }) {
  const chat = m.chat
  const sender = m.sender

  // لو في لعبة شغالة للشخص
  if (games[sender]) {
    return m.reply('⏳ انت بالفعل بتلعب! استنى تخلص اللعبة')
  }

  const number = Math.floor(Math.random() * 10) + 1

  games[sender] = {
    number,
    timeout: setTimeout(() => {
      conn.sendMessage(chat, {
        text: `⏱️ انتهى الوقت!\n🎯 الرقم كان: *${number}*`
      })
      delete games[sender]
    }, 15000)
  }

  await conn.sendMessage(chat, {
    text: '🎯 احزر رقم من 1 إلى 10 خلال 15 ثانية!\n\n✍️ اكتب الرقم بس (بدون أمر)'
  }, { quoted: m })
}

// 🔥 ده مهم: التقاط الردود بدون أمر
handler.before = async function (m, { conn }) {
  const sender = m.sender
  const chat = m.chat

  if (!games[sender]) return

  const guess = parseInt(m.text)

  if (isNaN(guess)) return

  const game = games[sender]

  clearTimeout(game.timeout)

  if (guess === game.number) {
    await conn.sendMessage(chat, {
      text: `🎉 صح!\nالرقم هو: *${game.number}*`
    }, { quoted: m })
  } else {
    await conn.sendMessage(chat, {
      text: `❌ غلط!\nالرقم كان: *${game.number}*`
    }, { quoted: m })
  }

  delete games[sender]
}

handler.command = ['احزر']
handler.group = false

export default handler