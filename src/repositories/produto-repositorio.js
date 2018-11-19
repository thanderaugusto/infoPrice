'use strict'
const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');

exports.buscar = async() => {
    const res = await Produto.find({
        ativo: true
    }, 'titulo preco slug tags');
    return res;
}

exports.buscarSlug = async(slug) => {
    const res = await Produto
        .findOne({
            slug: slug,
            ativo: true,
        }, 'titulo descricao preco slug tags');
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
                preco: data.preco,
                tags: data.tags
            }
        })
}

exports.apagar = async(id) => {
    await Produto.findByIdAndRemove(id);
}