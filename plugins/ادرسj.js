import fs from 'fs'
import path from 'path'

let handler = async (m, { conn }) => {
  try {

    await conn.sendMessage(m.chat, {
  react: {
    text: "📚",
    key: m.key
  }
})
  

    

    const text =
      (m.message?.conversation ||
        m.message?.extendedTextMessage?.text ||
        '').toLowerCase()

    let reply = null

    if (text.includes("ادرس") || text.includes("study")) {

      const quotes = [
        "📚 لا شيء يأتي بسهولة… لكن كل شيء ممكن",
        "⚡ النجاح يبدأ من صفحة صغيرة",
        "🔥 ذاكر اليوم لتفوز غدًا",
        "💡 كل دقيقة مذاكرة تصنع فرق",
        "🚀 استمر حتى لو تعبت"
      ]

      const signatures = [
        "☠ CYBER CORE ☠",
        "    ",
        "✦ Focus Mode"
      ]

      // 🔥 اختيار عشوائي صح 100%
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
      const randomSign = signatures[Math.floor(Math.random() * signatures.length)]

      reply = `
📚 STUDY MODE
 
${randomQuote}

${randomSign}

✦ Focus Mode
`
    }

    if (!reply) return

    const imagePath = path.join(process.cwd(), 'image.jpeg')
    let imageBuffer = null

    if (fs.existsSync(imagePath)) {
      imageBuffer = fs.readFileSync(imagePath)
    }

    await conn.sendMessage(
      m.chat,
      {
        text: reply,
        contextInfo: {
          externalAdReply: {
            title: "📚 STUDY AI",
            body: "CYBER CORE SYSTEM",
            thumbnail: imageBuffer,
            mediaType: 1,
            renderLargerThumbnail: true,
            showAdAttribution: false
          }
        }
      },
      { quoted: m }
    )

  } catch (err) {
    await conn.sendMessage(m.chat, {
      text: `❌ ERROR: ${err.message}`
    }, { quoted: m })
  }
}

handler.command = ['ادرس', 'study']

export default handler