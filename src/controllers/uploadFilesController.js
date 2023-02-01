const express = require('express')
const Files = require('../models/Files')
const UserCommon = require('../models/UserCommon')
const multer = require('multer')
const auth = require('../middlewares/authentication')
const multerConfig = require('../config/multer')

const router = express.Router()

router.use(auth)

router.post('/posts', multer(multerConfig).single('file'), async (req, res) => {

    try {
        const post = await Files.create({
            ...req.file, url: "", usuario: req.userId
        })
        
        console.log(req.userId)
        return res.send(post)
    } catch (err) {
        return res.status(401).send("Error" + err)
    }


})


module.exports = app => app.use('/arquivos', router)