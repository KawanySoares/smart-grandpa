const express = require('express')
const Postage = require('../models/Postage')
const auth = require('../middlewares/authentication')


const router = express.Router()

router.use(auth)

router.post('/criar', async (req, res) => {
    try {
        const post = await Files.create({
            ...req.body, usuario: req.userId
        })
        
        console.log(req.userId)
        return res.send(post)
    } catch (err) {
        return res.status(401).send("Error" + err)
    }
})


module.exports = app => app.use('/post', router)