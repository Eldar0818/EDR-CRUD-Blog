const router = require('express').Router()
const Blog = require('../model/Blog')
const cloudinary = require('../helpers/cloudinary')
const fileUpload = require('../helpers/multer_upload')

router.get('/', async(req, res)=> {
    try {
        const blogs = await Blog.find()
        res.status(200).render('home', {allBlogs: blogs})
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/new', (req, res)=> {
    res.render('new')
})

router.get('/:slug', async(req, res)=> {
    try {
        const blog = await Blog.findOne({slug: req.params.slug})
        res.status(200).render('blogpage', {blog: blog})
    } catch (error) {
        res.status(500).json(error)
    }
    
})

router.post('/new', fileUpload.single('poster'),async(req, res)=> {

    try {

        const formFile = await cloudinary.uploader.upload(req.file.path, {
            folder: "uploads"
        })

        const newBlog = new Blog({
            title: req.body.title,
            category: req.body.category,
            text: req.body.text,
            poster: formFile.secure_url,
            cloudinary_id: formFile.public_id
        })

         const savedBlog = await newBlog.save()
         setTimeout(()=> {
             res.status(200).redirect(`/blogs/${savedBlog.slug}`)
         }, 2000)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/edit/:id', async(req, res)=> {
    try {
        const blog = await Blog.findById(req.params.id)
        res.status(200).render('edit', {blog: blog})
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router