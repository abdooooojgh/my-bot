import fs from 'fs'
import path from 'path'

let handler = async (m, { conn }) => {
  try {
    
    // 🔥 REACT على نفس الرسالة
    await conn.sendMessage(m.chat, {
      react: {
        text: "🤖",
        key: m.key
      }
    })

    const text =
      (m.message?.conversation ||
        m.message?.extendedTextMessage?.text ||
        '').toLowerCase()

    let reply = "🤷 مش فاهم كلامك"

    // =========================
    // 🧠 ردود ثابتة
    // =========================
    if (text.includes("عامل اي")) {
      reply = "🙂الحمد الله شغال "
    }

    else if (text.includes("من انت")) {
      reply = "🤖 أنا CYBER CORE AI"
    }

    else if (text.includes("اسمك اي")) {
      reply = "اسمي🙂 CYBER CORE"
    }

    else if (text.includes("احبك")) {
      reply = "❤️ وأنا كمان"
    }

    else if (text.includes("سلام")) {
      reply = "👋 مع السلامة"
    }

    else if (text.includes("بوت")) {
      reply = "𝙔𝙚𝙨... 𝙄’𝙢 𝙝𝙚𝙧𝙚 ⚡"
    }
    
    if (text.includes("عبدي")) {
      reply = "اومرك مش هنخلص النهارده"
    }
    
    if (text.includes("في اوامر تاني")) {
      reply = "لسه بنطور يا معلم "
    }
    
    if (text.includes("كسمك")) {
      reply = "😈كسمين امك يا ابن المتناكه😈"
    }

    const demonicText = `
╭───『 𝕮𝖄𝕭𝕰𝕽 𝕮𝕺𝕽𝕰 』
│
│ ${    reply}

`

    const imagePath = path.join(process.cwd(), 'image.jpeg')
    let imageBuffer = null

    if (fs.existsSync(imagePath)) {
      imageBuffer = fs.readFileSync(imagePath)
    }

    await conn.sendMessage(
      m.chat,
      {
        text: demonicText,
        contextInfo: {
          externalAdReply: {
            title: "☠ CYBER CORE AI ☠",
            body: "RULE BASED AI SYSTEM",
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

    const errorDesign = `
╭─⚡| 𝕮𝖄𝕭𝕰𝕽 𝕮𝕺𝕽𝕰 |⚡─╮
│
│ *« ERROR »*
│ ${err.message || 'UNKNOWN ERROR'}
│
╰─────────────⚔️────────╯`

    await conn.sendMessage(m.chat, { text: errorDesign }, { quoted: m })
  }
}

// 👇 الأوامر
handler.command = ['سمسم', 'ai']

export default handler