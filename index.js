/*
    Yt: @LinsOfficiall
    Ig: @rijalsavior
    wa: +6281911317205
© Lins Official
*/
// Jangan Dihapus Creditnya Sebagai Tanda Ucapan Terima Kasih 😊
const { default: makeWaSocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require('@whiskeysockets/baileys')
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const figlet = require('figlet')
const path = require('path')
const readline = require("readline");
const fs = require('fs')
const chalk = require('chalk')
const PhoneNumber = require('awesome-phonenumber')
const util = require("util");
const { sizeFormatter} = require("human-readable")
const format = sizeFormatter()
const FileType = require('file-type')
const {
	imageToWebp,
	videoToWebp,
	writeExifImg,
	writeExifVid
} = require('./database/exif')
const usePairingCode = true
const { smsg, isUrl, getBuffer, fetchJson, await, sleep } = require('./database/functions')
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const log = console.log
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
  
async function connectToWhatsApp() {
const auth = await useMultiFileAuthState("LinsSesi");
const { state, saveCreds } = await useMultiFileAuthState("LinsSesi")
const Linsofc = makeWaSocket({
printQRInTerminal: !usePairingCode,
browser: ['Mac Os', 'chrome', '121.0.6167.159'],
version: [2, 2413, 1],
auth: auth.state,
logger: pino({ level: "silent" }),
});

if(usePairingCode && !Linsofc.authState.creds.registered) {
    log(chalk`{cyan Masukkan Nomor Anda : }`)
    rl.question('', async (nomor) => {
	const code = await Linsofc.requestPairingCode(nomor)
	log(chalk`{bgMagenta Pairing Code} : {bgCyanBright ${code}}`)
    })
}
	
Linsofc.ev.on("creds.update", auth.saveCreds);
Linsofc.ev.on('messages.upsert', async chatUpdate => {
try {
m = chatUpdate.messages[0]
if (!m.message) return
m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
if (m.key && m.key.remoteJid === 'status@broadcast') return
if (!Linsofc.public && !m.key.fromMe && chatUpdate.type === 'notify') return
if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return
m = smsg(Linsofc, m, store)
require('./Linsofficial')(Linsofc, m, chatUpdate, store)
} catch (err) {
console.log(err)
}
})

Linsofc.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}

Linsofc.ev.on('contacts.update', update => {
for (let contact of update) {
let id = Linsofc.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})

Linsofc.setStatus = (status) => {
Linsofc.query({
tag: 'iq',
attrs: {
to: '@s.whatsapp.net',
type: 'set',
xmlns: 'status',
},
content: [{
tag: 'status',
attrs: {},
content: Buffer.from(status, 'utf-8')
}]
})
return status
}

Linsofc.sendText = (jid, text, quoted = '', options) => Linsofc.sendMessage(jid, { text: text, ...options }, { quoted })

Linsofc.public = true

Linsofc.serializeM = (m) => smsg(Linsofc, m, store)

Linsofc.ev.on("connection.update", async (update) => {
const { connection, lastDisconnect } = update;
if (connection === "close") {
  let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
  if (reason === DisconnectReason.badSession) {
log(chalk`{bgRed Hapus Session Kemudian Coba Kembali}`)
process.exit();
  } else if (reason === DisconnectReason.connectionClosed) {
log(chalk`{bgGreen Menghubungkan Kembali...}`)
connectToWhatsApp();
  } else if (reason === DisconnectReason.connectionLost) {
log(chalk`{bgYellow Koneksi Hilang dari Server, menyambung kembali...}`)
connectToWhatsApp();
  } else if (reason === DisconnectReason.connectionReplaced) {
log(chalk`{bgCyan Koneksi Diganti, Sesi Baru Lagi Dibuka, Silakan Restart Bot}`)
process.exit();
  } else if (reason === DisconnectReason.loggedOut) {
log(chalk`{bgMagenta Perangkat Keluar, Harap Hapus Folder LinsSesi Dan Restart Ulang!}`)
process.exit();
  } else if (reason === DisconnectReason.restartRequired) {
log(chalk`{bgBlue Sedang Merestart Koneksi}`)
connectToWhatsApp();
  } else if (reason === DisconnectReason.timedOut) {
log(chalk`{bgMagentaBright Waktu Koneksi Habis, Menyambungkan Kembali}`)
connectToWhatsApp();
  } else {
log(chalk`{bgGreenBright Unknown DisconnectReason: ${reason}|${connection}}`)
connectToWhatsApp();
  }
} else if (connection === "open") {
log(chalk`{magentaBright Berhasil Koneksi Ke {bgGreen.white Whatsapp!}}`)
log('  ')
const wa = Linsofc.user
log(chalk`{bgCyan.yellow Nomor Whatsapp} : {cyan ${wa.id.split(':')[0]}}`)
log(chalk`{bgYellow.cyan Nama Pengguna } : {yellow ${wa.name}}`)
log('  ')
log(chalk`{cyanBright Script Ini Dibuat Oleh} : {cyan Lins Official}`)
log('  ')
log(chalk`{bgRed Youtube  } : {red.bold Lins Official}`)
log(chalk`{bgYellowBright Instagram} : {yellowBright.bold @rijalsavior}`)
log(chalk`{bgGreen Whatsapp } : {green.bold 6281911317205}`)
log('  ')
log(chalk`{blueBright Script Ini Dirancang Oleh {cyan.bold Lins Official} Dan Di Publish Di } {bgRed Youtube.}`)
log('  ')

log(chalk`{red ╔╗─────────────╔═╗}`)
log(chalk`{magenta ║║─────────────║╔╝}`)
log(chalk`{yellow ║║──╔╦═╗╔══╦══╦╝╚╦══╗}`)
log(chalk`{green ║║─╔╬╣╔╗╣══╣╔╗╠╗╔╣╔═╝}`)
log(chalk`{cyan ║╚═╝║║║║╠══║╚╝║║║║╚═╗}`)
log(chalk`{blue ╚═══╩╩╝╚╩══╩══╝╚╝╚══╝}`)
}
});



Linsofc.send5ButGif = async (jid , text = '' , footer = '', but = [], options = {}) =>{
let message = await prepareWAMessageMedia({ video: thumb, gifPlayback: true }, { upload: Linsofc.waUploadToServer })
 const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
 templateMessage: {
 hydratedTemplate: {
 videoMessage: message.videoMessage,
 "hydratedContentText": text,
 "hydratedFooterText": footer,
 "hydratedButtons": but
}
}
}), options)
Linsofc.relayMessage(jid, template.message, { messageId: template.key.id })
}

Linsofc.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
		let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		let buffer
		if (options && (options.packname || options.author)) {
			buffer = await writeExifImg(buff, options)
		} else {
			buffer = await imageToWebp(buff)
		}
		await Linsofc.sendMessage(jid, {
			sticker: {
				url: buffer
			},
			...options
		}, {
			quoted
		})
		return buffer
	}
	Linsofc.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
		let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		let buffer
		if (options && (options.packname || options.author)) {
			buffer = await writeExifVid(buff, options)
		} else {
			buffer = await videoToWebp(buff)
		}
		await Linsofc.sendMessage(jid, {
			sticker: {
				url: buffer
			},
			...options
		}, {
			quoted
		})
		return buffer
	}
	Linsofc.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
		let quoted = message.msg ? message.msg : message
		let mime = (message.msg || message).mimetype || ''
		let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
		const stream = await downloadContentFromMessage(quoted, messageType)
		let buffer = Buffer.from([])
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}
		let type = await FileType.fromBuffer(buffer)
		trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
		await fs.writeFileSync(trueFileName, buffer)
		return trueFileName
	}
	Linsofc.downloadMediaMessage = async (message) => {
		let mime = (message.msg || message).mimetype || ''
		let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
		const stream = await downloadContentFromMessage(message, messageType)
		let buffer = Buffer.from([])
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}
		return buffer
	}
	Linsofc.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
		let types = await Linsofc.getFile(path, true)
		let {
			mime,
			ext,
			res,
			data,
			filename
		} = types
		if (res && res.status !== 200 || file.length <= 65536) {
			try {
				throw {
					json: JSON.parse(file.toString())
				}
			}
			catch (e) {
				if (e.json) throw e.json
			}
		}
		let type = '',
			mimetype = mime,
			pathFile = filename
		if (options.asDocument) type = 'document'
		if (options.asSticker || /webp/.test(mime)) {
			let {
				writeExif
			} = require('./database/exif')
			let media = {
				mimetype: mime,
				data
			}
			pathFile = await writeExif(media, {
				packname: options.packname ? options.packname : global.packname,
				author: options.author ? options.author : global.author,
				categories: options.categories ? options.categories : []
			})
			await fs.promises.unlink(filename)
			type = 'sticker'
			mimetype = 'image/webp'
		}
		else if (/image/.test(mime)) type = 'image'
		else if (/video/.test(mime)) type = 'video'
		else if (/audio/.test(mime)) type = 'audio'
		else type = 'document'
		await Linsofc.sendMessage(jid, {
			[type]: {
				url: pathFile
			},
			caption,
			mimetype,
			fileName,
			...options
		}, {
			quoted,
			...options
		})
		return fs.promises.unlink(pathFile)
	}
	
return Linsofc
}

connectToWhatsApp()

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})

/*
    Yt: @LinsBotz
    Ig: @rijalsavior
    wa: +6281911317205
© Lins Official
*/
// Jangan Dihapus Creditnya Sebagai Tanda Ucapan Terima Kasih 😊