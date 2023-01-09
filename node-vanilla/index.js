
const http = require('http')
const port = 4000

http.createServer((req, res) => {
        const url = req.url
        const method = req.method

        res.setHeader('Content-Type', 'text/plain;charset=utf-8')
        if(url === '/' && method === 'GET'){
            res.write('hello')
        }else if(url === '/about' && method === 'GET'){
            res.write('here is about page.')
        }else if(url === '/hobby' && method === 'GET'){
            res.setHeader('Content-Type', 'text/html')
            res.write('<form action="/outdoor" method="post"> \
                            <input type="text" name="sports"> \
                            <button type="submit">submit</button> \
                      </form>')
        }else if(url === '/outdoor' && method === 'POST'){
            console.log(req.body)
        }else{
            res.write('nothing page.')
        }
        res.end()
    }).listen(port, () => {
        console.log(`🚀 Listening on localhost port ${port}`)
})
