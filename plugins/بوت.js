import fs from 'fs'
import path from 'path'

let handler = async (m, { conn }) => {
  try {

    const demonicText = `
╭───『 ☠ CYBER CORE ☠ 』
  دا راجل خول مش مستهاله

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
handler.command = ['اشتمو']

export default handler