const { Router } = require('express')
const User = require('../Models/User')
const router = Router()
const fs = require('fs')

router.post('/user/image', async (req, res) => {
    if (req.headers['content-length'] > 2000000)
        return res.status(405).send()

    const user = await User.findById(req.headers.userId).select('username')
    const path = './public/static/images/users'
    fs.mkdir(path, _ => {
        req.pipe(fs.createWriteStream(`${path}/${user.id}.png`))
        res.send()
    })
})

module.exports = router