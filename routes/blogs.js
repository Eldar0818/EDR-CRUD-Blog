const router = require('express').Router()
const data = require('../blog.json')
const Blog = require('../model/Blog')

router.get('/', (req, res)=> {
    res.render('home', {allBlogs: data.blogs})
})

router.get('/new', (req, res)=> {
    res.render('new')
})

router.get('/:id', (req, res)=> {
    const clickedBlog = data.blogs.filter(blog=> blog._id === req.params.id)[0]
    res.render('blogpage', {blog: clickedBlog})
})

router.post('/new', async(req, res)=> {
    const newBlog = new Blog(req.body)
    try {
         const savedBlog = await newBlog.save()
         setTimeout(()=> {
             res.status(200).redirect('/blogs')
             console.log(savedBlog._id);
         }, 2000)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router