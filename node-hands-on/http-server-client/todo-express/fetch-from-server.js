import fetch from 'isomorphic-fetch'
import { serverUrl } from './constants.js'

const errorUrl = 'http://localhost:7777/api/foo'
let result = await fetch(serverUrl)
const division = Array(20).fill('-----').join('')

console.log(result)
console.log(await result.json())

console.log(division)

console.log(await fetch(errorUrl))

console.log(division)

const paramUrl = serverUrl + '?completed=true'
console.log(paramUrl)
result = await fetch(paramUrl)

console.log(result.status, await result.json())