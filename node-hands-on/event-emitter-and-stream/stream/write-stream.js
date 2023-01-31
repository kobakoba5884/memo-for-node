import fs from 'fs'
import { pathToDestTxt } from './pathToData.js'

const fileWriteStream = fs.createWriteStream(pathToDestTxt)
const encoding = 'utf-8'

fileWriteStream.write('Hello\n')
fileWriteStream.write('Hello\n')
fileWriteStream.end(() => {
    const data = fs.readFileSync(pathToDestTxt, encoding)

    console.log(data)
})