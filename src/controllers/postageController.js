const express = require('express')
const UserCommon = require('../models/UserCommon')
const UserCareviger = require('../models/UserCareviger')
const Postage = require('../models/Postage')
const auth = require('../middlewares/authentication')


const router = express.Router()

router.use(auth)

router.post('/criar', async (req, res) => {
    const { conteudo } = req.body
    
    try {
        const post = await Postage.create({
            conteudo, usuario: req.userId
        })
        
        const user = await UserCommon.findById(req.userId) || await UserCareviger.findById(req.userId)
        user.posts.push(post)
        await user.save()
        return res.send(post)
    } catch (err) {
        return res.status(401).send("Error" + err)
    }
})

router.get('/', async (req, res) => {
    const users = await UserCommon.find({}) && await UserCareviger.find({})

    return res.send(users)
})



module.exports = app => app.use('/post', router)