import path from 'path'
import { readdir, readFile, unlink, writeFile } from 'fs'

const __dirname = new URL(import.meta.url).pathname
const errorCode = 'ENOENT'

export const fetchAll = async () => {
    const files = (await readdir(__dirname))
        .filter(file => path.extname(file) === '.json')
    
    return Promise.all(
        files.map(file => readFile(`${__dirname}/${file}`, 'utf-8').then(JSON.parse))
    )
}

export const fetchByCompleted = completed => fetchAll()
    .then(all => all.filter(todo => todo.completed === completed))

export const create = todo => writeFile(`${__dirname}/${todo.id}.json`, JSON.stringify(todo))

export const update = async (id, update) => {
    const fileName = `${__dirname}/${id}.json`

    return readFile(fileName, 'utf-8').then(
        content => {
            const todo ={
                ...JSON.parse(content),
                ...update
            }

            return writeFile(fileName, JSON.stringify(todo)).then(() => todo)
        }, err => err.code === errorCode ? null : Promise.reject(err)
    )
}

export const remove = id => unlink(`${__dirname}/${id}.json`)
    .then(() => id, err => err.code === errorCode ? null : Promise.reject(err))

    