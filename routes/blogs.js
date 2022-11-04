const router = require('express').Router()
const data = require('../blog.json')

router.get('/', (req, res)=> {
    res.render('home', {allBlogs: data.blogs})
})

router.get('/new', (req, res)=> {
    res.render('new')
})

module.exports = router