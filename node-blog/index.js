const express = require('express')
const app = express()
const port = 5555

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (_, response) => {
    response.send('hello')
})

app.get('/blog/create', (_, response) => {
    response.sendFile(__dirname + '/views/blogCreate.html')
})

app.post('/blog/create', (request, response) => {
    console.log('post request is executed')
    console.log(request.body)
    response.send('successfully posted blog data.')
})

app.listen(port, () => {
    console.log(`🚀 Listening on localhost port ${port}`)
})