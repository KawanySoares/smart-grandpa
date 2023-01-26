const mongoose = require('mongoose')


const AvaliationSchema = mongoose.Schema({
    _id: {
        type: String,
        default: function generateUUID() {
            return uuidv4()
        }
    },

    usuario_avaliacao: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserCommon' } ||  { type: mongoose.Schema.Types.ObjectId, ref: 'UserCareviger'}],

    like: {
        type: Number,
        required: false,
        default: 0
    },

    feedback: {
        type: String,
        required: false,
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

const UserAvaliation = mongoose.model('Avaliation', AvaliationSchema)

module.exports = UserAvaliation