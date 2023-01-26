const mongoose = require('mongoose')

//Fazer a referencia para o usuario

const FileSchema = new mongoose.Schema({
    nome: String,
    size: Number,
    key: Number,
    url: [ { type: mongoose.Schema.Types.ObjectId, ref: 'UserCommon'} ||  { type: mongoose.Schema.Types.ObjectId, ref: 'UserCareviger'}],
    data_criada: {
        type: Date,
        default: Date.now
    }
})

const UserFiles = mongoose.model('Files', FileSchema)

module.exports = UserFiles