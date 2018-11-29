'use strict'
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

exports.criar = async(data) => {
    var usuario = new Usuario(data);
    await usuario.save()
}

exports.autenticacao = async(data) => {
    const res = await Usuario.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}

exports.buscarId = async(id) => {
    const res = await Usuario.findById(id);
    return res;
}