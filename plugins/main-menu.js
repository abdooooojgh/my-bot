import { promises } from 'fs'
import fs from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'

let tags = {
  main: '☠ INFO SYSTEM',
  plugins: '🧩 PLUGINS CORE'
}

const defaultMenu = {
  before: `
╭━━━〔 ☠ 𝘾𝙔𝘽𝙀𝙍 𝘾𝙊𝙍𝙀 ☠ 〕━━━╮
⚡ SYSTEM ONLINE ⚡

👋 Hello *%name* 🤖
👥 Users: %totalreg 👤
⏱ Uptime: %muptime ⏳
━━━━━━━━━━━━━━━━━━
%readmore
📌 MENU LIST ⚙️
`.trimStart(),

  header: `\n╭─〔 📂 %category 〕`,
  body: `│ ▢ %cmd %isdiamond %isPremium ⚡`,
  footer: `╰──────────────\n`,

  after: ` 
╰━━━〔 ⚡ CYBER CORE ACTIVE ⚡ 〕━━━╯

🧩 SHORTCUT COMMANDS:
🧪 تست
🛡️ ادمن
🚫 طرد
🎯 احزر
📚 ادرس
🤖 سمسم
_____________________________________
`,
}

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {

    // 🔥 REACT على نفس الرسالة
    await conn.sendMessage(m.chat, {
      react: {
        text: "📁",
        key: m.key
      }
    })

    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}

    let user = global.db.data.users[m.sender]
    let { exp, diamond, level, role } = user

    let { min, xp, max } = xpRange(level, global.multiplier)

    let name = await conn.getName(m.sender)

    let uptime = clockString(process.uptime() * 1000)

    let totalreg = Object.keys(global.db.data.users).length

    let help = Object.values(global.plugins).filter(p => !p.disabled).map(p => ({
      help: Array.isArray(p.help) ? p.help : [p.help],
      tags: Array.isArray(p.tags) ? p.tags : [p.tags],
      prefix: 'customPrefix' in p,
      diamond: p.diamond,
      premium: p.premium,
    }))

    let text = [
      defaultMenu.before,
      ...Object.keys(tags).map(tag => {
        return defaultMenu.header.replace(/%category/g, tags[tag]) + '\n' +
          help.filter(p => p.tags && p.tags.includes(tag)).map(p =>
            p.help.map(cmd =>
              defaultMenu.body
                .replace(/%cmd/g, _p + cmd)
                .replace(/%isdiamond/g, p.diamond ? '(💎)' : '')
                .replace(/%isPremium/g, p.premium ? '(👑)' : '')
            ).join('\n')
          ).join('\n') +
          defaultMenu.footer
      }),
      defaultMenu.after
    ].join('\n')

    let replace = {
      '%': '%',
      p: _p,
      name,
      totalreg,
      muptime: uptime,
      exp,
      diamond,
      level,
      role,
      readmore: readMore
    }

    text = text.replace(
      new RegExp(`%(${Object.keys(replace).join('|')})`, 'g'),
      (_, v) => replace[v]
    )

    let imagePath = join(process.cwd(), 'logo.jpg')

    await conn.sendMessage(m.chat, {
      image: fs.readFileSync(imagePath),
      caption: text,
      contextInfo: {
        externalAdReply: {
          title: "☠ CYBER CORE AI SYSTEM 🤖",
          body: "⚡ ACTIVE MENU PANEL ⚡",
          thumbnail: fs.readFileSync(imagePath),
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: false
        }
      }
    }, { quoted: m })

  } catch (e) {
    console.log(e)
    conn.reply(m.chat, '❌ Menu Error', m)
  }
}

handler.command = ['menu','cyber','بوت','اوامر']

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  return `${h}h ${m}m`
}