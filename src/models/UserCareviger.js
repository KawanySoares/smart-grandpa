const mongoose = require('../database/index')
const { v4: uuidv4 } = require('uuid')
const bcryptjs = require('bcryptjs')


const UserCarevigerSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: function generateUUID() {
            return uuidv4()
        }
    },

    cpf: {
        type: String,
        required: true,
        unique: true
    },

    nome: String,
    sobrenome: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true,
        select: false
    },

    endereco: String,
    telefone: String,
    celular: String,

    data_nasc: Date,
    idade: Number,
    data_criada: {
        type: Date,
        default: Date.now
    }
})

UserCarevigerSchema.pre('save', async function(next) {
    const user = this
    if(user.isModified('senha')) {
      user.senha = await bcryptjs.hash(user.senha, 10)
    }

    next()
  })

const UserCareviger = mongoose.model('UserCareviger', UserCarevigerSchema)

module.exports = UserCareviger