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
        const { originalname: name, size, key, location: url = "" } = req.file;
    
        const file = await Files.create({
          name,
          size,
          key,
          url
        });

        const user = await UserCommon.findById(req.userId) || await UserCareviger.findById(req.userId)

        user.files.push(file)
        await user.save()

        return res.send(file)
    

    } catch(err) {
        return res.status(400).send({
            message: "Erro ao enviar arquivo"
        })
    }
})

router.get("/", async (req, res) => {
    const files = await Files.find();
  
    return res.json(files);
  });




module.exports = app => app.use('/arquivos', router)