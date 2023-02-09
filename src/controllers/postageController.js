const express = require('express')
const UserCommon = require('../models/UserCommon')
const UserCareviger = require('../models/UserCareviger')
const Postage = require('../models/Postage')
const auth = require('../middlewares/authentication')


const router = express.Router()

router.use(auth)


router.get('/', async (req, res) => {
    const userCommon = await UserCommon.find().populate('posts').populate('files')
    const userCareviger = await UserCareviger.find().populate('posts').populate('files')

    return res.send({
        UsuariosComuns: userCommon,
        UsuariosCuidadores: userCareviger
    })
})

router.get('/:id', async (req, res) => {
    const { id } = req.params

    const userCommon = await UserCommon.findById(id).populate('posts').populate('files')
    const userCareviger = await UserCareviger.findById(id).populate('posts').populate('files')

    if(userCommon == null) {
        return res.send({
            UsuariosCuidadores: userCareviger
        })    
    }

    if(userCareviger == null) {
        return res.send({
            UsuariosComuns: userCommon,
        })
    }

})


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
        return res.status(401).send("Erro ao criar postagem !")
    }
})


router.delete('/excluir/:id', async (req, res) => {
    const { id } = req.params

    try {

        const user = await UserCommon.findById(req.userId) || await UserCareviger.findById(req.userId)
        
        user.posts.filter(item => (item !== id))

        const post = await Postage.findById(id)
        await post.remove()
    
        return res.status(200).send({
            message: "Post excluido com sucesso"
        })

    }catch(err) {
        return res.status(400).send({
            error: "Falha ao excluir postagem !!" + err
        })
    }
    
})

router.put('/alterar/:id', async (req, res) => {
    const { conteudo } = req.body
    const { id } = req.params

    //continuar

})


module.exports = app => app.use('/post', router)