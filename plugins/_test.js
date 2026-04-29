import fs from 'fs'
import path from 'path'

let handler = async (m, { conn }) => {
  try {

    const demonicText = `
╭───『 ☠ CYBER CORE ☠ 』───╮
│ ✅ 𝐜𝐨𝐧𝐝𝐢𝐭𝐢𝐨𝐧 : ☠ CYBER CORE ☠
│ 🪶 𝐬𝐢𝐭𝐮𝐚𝐭𝐢𝐨𝐧 : 𝐈𝐃𝐊
│ 👤 𝐮𝐬𝐞𝐫 : your uncle ☠ CYBER CORE ☠🫦
│ 🕒 𝐭𝐢𝐦𝐞 : ALL TIME
│ 📅 𝐝𝐚𝐭𝐞 : ${new Date().toLocaleDateString()}
╰───────────────╯
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
            title: "☠ CYBER CORE ☠",
            body: "𝐃𝐀𝐑𝐄 𝐓𝐨 𝐄𝐍𝐓𝐄𝐑? 𝐘𝐎𝐔'𝐋𝐋 𝐁𝐔𝐑𝐍 🔥",
            thumbnail: imageBuffer,
            mediaType: 1,
            sourceUrl: "https://chat.whatsapp.com/Hx9KbuQ5dY5IH0edXFqigy",
            renderLargerThumbnail: true,
            showAdAttribution: false
          }
        }
      },
      { quoted: m }
    )

  } catch (err) {

    const errorDesign = `
╭─⚡| ☠ CYBER CORE ☠ |⚡─╮
│
│ *« ERROR »*
│ ${err.message || 'UNKNOWN ERROR'}
│
╰─────────────⚔️────────╯`

    await conn.sendMessage(m.chat, { text: errorDesign }, { quoted: m })
  }
}

// 👇 أهم جزء
handler.command = ['تست']

export default handler