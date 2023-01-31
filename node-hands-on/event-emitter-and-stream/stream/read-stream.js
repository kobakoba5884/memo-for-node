import fs from 'fs'
import { pathToSrcTxt } from './pathToData.js'

const readStream = fs.createReadStream(pathToSrcTxt)

readStream.on('readable', () => {
    console.log('readable')
    let chunk

    while ((chunk = readStream.read()) !== null) {
        console.log(`chunk: ${chunk.toString()}`)
    }
})

readStream.on('end', () => console.log('end'))