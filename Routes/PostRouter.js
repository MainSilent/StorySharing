const { Router } = require('express')
const Post = require('../Models/Post')
const router = Router()
const fs = require('fs')

router.post('/post/thumbnail/:postId', async (req, res) => {
    if (req.headers['content-length'] > 5000000)
        return res.status(405).send()

    const post = await Post.findById(req.params.postId)
    const path = './public/static/images/posts'
    fs.mkdir(path, _ => {
        req.pipe(fs.createWriteStream(`${path}/${post.id}.png`))
        res.send()
    })
})

module.exports = router