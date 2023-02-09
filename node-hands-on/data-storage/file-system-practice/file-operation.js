import fs from 'fs'
import path from 'path'

const bar = Array(20).fill('----').join('')
const __dirname = path.dirname(new URL(import.meta.url).pathname)
const pathToTodos = path.join(__dirname, 'todos')
const errHandle = err => console.log(err.message)

await fs.promises.mkdir(pathToTodos)
    .catch(errHandle)

console.log(bar)
await fs.promises.mkdir('todos/foo/bar', { recursive: true })
    .catch(errHandle)
console.log(bar)
await fs.promises.rmdir('todos/foo')
    .catch(errHandle)
console.log(bar)
// deprecation
await fs.promises.rmdir('todos/foo', { recursive: true })
.catch(errHandle)

console.log(bar)
const todo1 = JSON.stringify({ id: 1, title: 'Name', completed: false })
const pathToJSON = path.join(pathToTodos, '1.json')
console.log(pathToJSON)
await fs.promises.writeFile(pathToJSON, todo1)
console.log(bar)
const readResult = await fs.promises.readFile(pathToJSON, 'utf-8')
console.log(readResult)
console.log(JSON.parse(readResult))

await fs.promises.readFile(path.join(pathToTodos, '2.json'), 'utf-8')
    .catch(errHandle)
console.log(bar)

console.log(await fs.promises.readdir(pathToTodos))

await fs.promises.unlink(pathToJSON)
    .then(() => console.log('completely delete', pathToJSON))

console.log(await fs.promises.readdir(pathToTodos))

await fs.promises.rmdir(pathToTodos)
    .then(() => console.log('completely delete', pathToTodos))

await fs.promises.unlink(pathToJSON)
    .catch(errHandle)

console.log(bar)

const filepath = 'path/to/file.txt'
console.log(path.dirname(filepath))
console.log(path.basename(filepath))
console.log(path.extname(filepath))
console.log(path.parse(filepath))
