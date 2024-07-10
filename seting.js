// Silahkan Ubah Sesuka Hati Jangan Hapus Tanda ' ' agar script tidak eror.

const fs = require('fs')
const chalk = require('chalk')

global.owner = ['6283854545783']
global.name = 'Jaa Official'
global.namebot = 'Nexzo Botz'

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.blueBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})