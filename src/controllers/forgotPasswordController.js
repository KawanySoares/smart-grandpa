const express = require('express')
const UserCareviger = require('../models/UserCareviger')
const UserCommon = require('../models/UserCommon')
const crypto = require('crypto')
const mailer = require('../modules/mailer')



const router = express.Router()

router.post('/', async (req, res) => {
    const { email } = req.body

    try {
        const user = await UserCareviger.find({ email }) || await UserCommon.find({ email })

        if(!user) {
            res.status(401).send({
                message: 'User not exist !'
            })
        }

        const token = crypto.randomBytes(4).toString('hex')

        const now = new Date()

        now.setHours(now.getHours() + 1)

        await UserCommon.findByIdAndUpdate(user.id, {
            '$set': {
                'passwordResetToken': token,
                'passwordResetNow': now
            }
        }) || await UserCareviger.findByIdAndUpdate(user.id, {
            '$set': {
                'passwordResetToken': token,
                'passwordResetNow': now
            }
        })

        await mailer.sendMail({
            to: email,
            from: "0000872054@senaimgaluno.com.br",
            subject: 'Test',
            template: 'forgot_password',
            context: { token }
        }), (err) => {
            if(err) {
                return res.status(400).send({ error: 'Cannot send forgot password email'})
            }

            return res.send()
        }

    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'Erro on forgot password, try again !'})
    }
})


module.exports = app => app.use('/forgot', router)