const express = require('express')
const app = express()
const dotenv = require('dotenv')
const path = require('path')
const PORT = process.env.PORT || 3456
const blogsRoute = require('./routes/blogs')
const DatabaseConntection = require('./db_connection')

dotenv.config()

DatabaseConntection(process.env.DB_URL)

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res)=> {
   res.redirect('/blogs')
})

app.use('/blogs', blogsRoute)

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}...`)
})