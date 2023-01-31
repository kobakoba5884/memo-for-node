import path from 'path'

export const __dirname = process.cwd()
export const pathToDataDir = path.join(__dirname, '../..', 'data')
export const pathToSrcTxt = path.join(pathToDataDir, 'src.txt')
export const pathToOutTxt = path.join(pathToDataDir, 'out.txt')
export const pathToDestTxt = path.join(pathToDataDir, 'dest.txt')
export const pathToCryptoDestTxt = path.join(pathToDataDir, 'dest.crypto.txt')
export const data = 'hello, World!!!!'