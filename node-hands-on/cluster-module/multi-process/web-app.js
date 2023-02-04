import http from 'http'
import { fibonacci } from './fibonacci.js'

const PORT = 3333

http.createServer((req, res) => {
    const id = req.url.substring(1)

    if(!id.length){
        return res.end('nothing')
    }

    const n = Number(req.url.substring(1))

    if(Number.isNaN(n)){
        return res.end('number!!')
    }

    const result = fibonacci(n)

    res.end(result.toString())
}).listen(PORT)