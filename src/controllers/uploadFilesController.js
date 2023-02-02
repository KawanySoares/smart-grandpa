const express = require('express')
const Postage = require('../models/Postage')
const UserCommon = require('../models/UserCommon')
const multer = require('multer')
const auth = require('../middlewares/authentication')
const multerConfig = require('../config/multer')
const UserCareviger = require('../models/UserCareviger')

const router = express.Router()

router.use(auth)

router.post('/posts', async (req, res) => {

    try {

        const post = await Postage.create({
            ...req.file, usuario: req.userId
        })

        await (await UserCommon.create({posts: post})).$where('_id').equals(req.userId) || 
        await (await UserCareviger.create({posts: post})).$where('_id').equals(req.userId)
        
        return res.send(post)
    } catch (err) {
        return res.status(401).send("Error" + err)
    }


})


module.exports = app => app.use('/arquivos', router)