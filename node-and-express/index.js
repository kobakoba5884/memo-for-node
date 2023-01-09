const fs = require('fs')
const express = require('express')
const app = express()
const activities = require('./data/activity.json')
const port = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (_, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/update', (req, res) => {
    let inputText = req.body.updatedActivity

    activities[0].activity = inputText
    res.send(activities)
})

app.post('/autumn', (req, res) => {
    console.log('post method is running!')
    console.log(req.body)
    let inputText = req.body.activity
    fs.writeFile(__dirname + '/data/data.txt', inputText, () => {
        res.send('successfully posted!!')
    })
})

app.post('/delete', (req, res) => {
    activities.splice(req.body.number, 1)
    res.send(activities)
})

app.listen(port, () => {
    console.log(`🚀 Listening on localhost port ${port}`)
})
