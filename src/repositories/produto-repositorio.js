'use strict'
const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');

exports.buscar = async() => {
    const res = await Produto.find({
    }, 'titulo preco slug tags descricao');
    return res;
}

exports.buscarNome = async(titulo) => {
    const res = await Produto.find({
        titulo: new RegExp(titulo, 'i')
    },' titulo preco descricao');      
    return res;
}

exports.buscarSlug = async(slug) => {
    const res = await Produto
        .findOne({
            slug: slug
        }, 'titulo descricao preco slug');
    return res;
}

exports.buscarId = async(id) => {
    const res = await Produto.findById(id);
    return res;
}

exports.criar = async(data) => {
    var produto = new Produto(data);
    await produto.save()
}

exports.atualizar = async(id, data) => {
    await Produto
        .findByIdAndUpdate(id, {
            $set: {
                titulo: data.titulo,
                descricao: data.descricao,
                slug: data.slug,
                preco: data.preco
            }
        })
}

exports.apagar = async(id) => {
    await Produto.findByIdAndRemove(id);
}