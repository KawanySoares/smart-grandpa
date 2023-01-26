const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const PostageSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: function generateUUID() {
            return uuidv4()
        }
        //Fazer referencia ao ID do usuario
    },

    usuario_post: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'UserCommon'} || { type: mongoose.Schema.Types.ObjectId, ref: 'UserCareviger'}
    ],

    conteudo: {
        type: String,
        required: true
    },

    data_criada: {
        type: Date,
        default: Date.now
    },

    horario_criado: {
        type: Date,
        default: Date.now
    }

})

const UserPostage = mongoose.model('Postage', PostageSchema)

module.exports = UserPostage