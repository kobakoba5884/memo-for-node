const express = require('express')
const app = express()
const port = 5555

// mongodb
const mongoose = require('mongoose')
const mongoUser = process.env.DB_USER
const mongoPassword = process.env.DB_PASSWORD
const mongoUrl = `mongodb://${mongoUser}:${mongoPassword}@mongodb:27017`
const mongoOptions = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 5, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}
// defining schema and model
const Schema = mongoose.Schema
const BlogSchema = new Schema({
    title: String,
    summary: String,
    image: String,
    textBody: String,
})
const BlogModel = mongoose.model('Blog', BlogSchema)

mongoose.set('strictQuery', true)

// connecting to mongodb
mongoose.connect(mongoUrl, mongoOptions).then(
    () => { console.log('successfully connected to mongodb!') },
    error => { console.log(error) }
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/blog/create', (_, response) => {
    response.sendFile(__dirname + '/views/blogCreate.html')
})

app.post('/blog/create', (request, response) => {
    console.log('post request is executed')
    console.log(request.body)
    BlogModel.create(request.body, (error, savedBlogData) => {
        if(error){
            console.log('failed writing to database.')
            response.send('failed writing to database.')
        }else{
            console.log('successfully write data.')
            response.send('successfully posted blog data.')
        }
    })
})

// get all blogs
app.get('/', async (_, response) => {
    const allBlogs = await BlogModel.find()
    response.send(allBlogs)
})

// get a blog
app.get('/blog/:id', async (request, response) => {
    const blogId = request.params.id
    const singleBlog = await BlogModel.findById(blogId)
    console.log(blogId)
    response.send(singleBlog)
})

// update a blog
app.get('/blog/update/:id', async (request, response) => {
    const blogId = request.params.id
    const singleBlog = await BlogModel.findById(blogId)
    response.send(singleBlog)
})

app.post('/blog/update/:id', async (request, response) => {
    const blogId = request.params.id
    BlogModel.updateOne({_id: blogId}, request.body).exec((error) => {
        if(error){
            console.log('failed editing data')
            response.send('failed editing data')
        }else{
            console.log('successfully edited data')
            response.send('successfully edited data')
        }
    })
    response.send(singleBlog)
})

app.listen(port, () => {
    console.log(`🚀 Listening on localhost port ${port}`)
})