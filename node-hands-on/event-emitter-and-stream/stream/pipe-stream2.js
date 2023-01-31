import fs from 'fs'
import crypto from 'crypto'
import { pathToSrcTxt, pathToDestTxt, pathToCryptoDestTxt } from './pathToData.js'

const srcReadStream = fs.createReadStream(pathToSrcTxt)

srcReadStream.pipe(fs.createWriteStream(pathToDestTxt))
    .on('finish', () => console.log('branch 1'))

srcReadStream.pipe(crypto.createHash('sha256'))
    .pipe(fs.createWriteStream(pathToCryptoDestTxt))
    .on('finish', () => console.log('branch 2'))