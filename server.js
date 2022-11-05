const express = require('express')
const app = express()
const dotenv = require('dotenv')
const path = require('path')
const PORT = process.env.PORT || 3456
const blogsRoute = require('./routes/blogs')
const DatabaseConntection = require('./helpers/db_connection')
const methodOverride = require('method-override')

dotenv.config()

DatabaseConntection(process.env.DB_URL)

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, './public')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride("_method"))

app.get('/', (req, res)=> {
   res.redirect('/blogs')
})

app.use('/blogs', blogsRoute)

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}...`)
})