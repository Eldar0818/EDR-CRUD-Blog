const express = require('express')
const app = express()
const dotenv = require('dotenv')
const path = require('path')
const PORT = process.env.PORT || 3456
const DatabaseConntection = require('./helpers/db_connection')
const methodOverride = require('method-override')
const cors = require('cors')
const User = require('./model/User')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const initializePassport = require('./helpers/passportConfig')
const blogsRoute = require('./routes/blogs')
const endpoints = require('./routes/endpoints')
const { checkAuthenticatde, checkNotAuthenticated } = require('./helpers/authVerify')

dotenv.config()

initializePassport(
passport, 
async(email)=> {
    const targetEmail = await User.findOne({email: email})
    return targetEmail
},
async(id)=> {
    const targetId = await User.findById(id)
    return targetId
}
)

DatabaseConntection(process.env.DB_URL)

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, './public')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(methodOverride("_method"))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.post('/register', checkNotAuthenticated, async(req, res)=> {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const newAccount = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    })
    try {
      const savedAccount = await newAccount.save()
      res.status(200).json(savedAccount)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.get('/auth', checkNotAuthenticated,(req, res)=> {
    res.render('login')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth',
    failureFlash: true
}))

app.get('/', checkAuthenticatde,(req, res)=> {
   res.redirect('/blogs')
})

app.use('/blogs',  checkAuthenticatde,blogsRoute)
app.use('/api', endpoints)

app.delete('/logout', (req, res) => {
    req.logOut(()=> {
        res.redirect('/auth')
    })
})

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}...`)
})