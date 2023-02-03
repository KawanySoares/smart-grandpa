const express = require('express')
const Files = require('../models/Files')
const UserCommon = require('../models/UserCommon')
const UserCareviger = require('../models/UserCareviger')
const multer = require('multer')
const auth = require('../middlewares/authentication')
const multerConfig = require('../config/multer')

const router = express.Router()

router.use(auth)

router.post('/', multer(multerConfig).single('file'), async (req, res) => {

    try {
        const post = await Files.create({
            ...req.file, url: "", usuario: req.userId
        })
        
        const user = await UserCommon.findById(req.userId) || await UserCareviger.findById(req.userId)

        user.posts.push(post)
        await user.save()

        console.log(req.userId)
        return res.send(post)
    } catch (err) {
        return res.status(401).send("Error" + err)
    }


})




module.exports = app => app.use('/arquivos', router)