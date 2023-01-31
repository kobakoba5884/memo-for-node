import fs from 'fs'
import crypto from 'crypto'
import { data, pathToOutTxt, pathToSrcTxt } from './pathToData.js'

const copyFile = (src, dest, cb) => {
    fs.readFile(src, (err, data) => {
        if(err){
            return cb(err)
        }

        fs.writeFile(dest, data, cb)
    })
} 

const copyFileWithStream = (src, dest, cb) => {
    const hashType = 'sha256'

    fs.createReadStream(src)
        .pipe(crypto.createHash(hashType))
        .pipe(fs.createWriteStream(dest))
        .on('finish', cb)
}

console.log(pathToSrcTxt)

fs.writeFileSync(pathToSrcTxt, data)

copyFileWithStream(pathToSrcTxt, pathToOutTxt, () => console.log('copy handling is completed!!'))