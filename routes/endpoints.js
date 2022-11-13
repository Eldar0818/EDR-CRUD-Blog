const router = require('express').Router()
const Blog = require('../model/Blog')

router.get('/trendings', async(req,res)=> {
    try {
        const blogs = await Blog.find().sort({_id: -1}).limit(4)
        res.status(200).json(blogs)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/resent-blogs', async(req,res)=> {
    try {
        const blogs = await Blog.find().sort({_id: -1}).limit(3)
        res.status(200).json(blogs)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/all-blogs', async(req, res)=> {
    try {
        const blogs = await Blog.find().sort({_id: -1})
        res.status(200).json(blogs)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router