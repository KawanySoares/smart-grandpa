const express = require('express')
const Files = require('../models/Files')
const multer = require('multer')
const multerConfig = require('../config/multer')

const router = express.Router()

router.post('/posts', multer(multerConfig).single('file'), (req, res) => {
    console.log(req.file);

    return res.send({ ok: "ok"})
})


module.exports = app => app.use('/arquivos', router)