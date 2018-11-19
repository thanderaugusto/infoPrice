'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    cliente: {    
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    },
    numero: {    
        type: String,
        required: true
    },
    dataCriacao: {    
        type: Date,
        required: true,
        default: Date.now
    },
    status: {    
        type: String,
        required: true,
        enum: ['created', 'done'],
        default: 'created'
    },
    itens: [{
        quantidade: {
            type: Number,
            require: true,
            default: 1
        },
        preco: {
            type: Number,
            require: true,
        },
        produto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Produto'
        },
    }]
});

module.exports = mongoose.model('Order', schema);