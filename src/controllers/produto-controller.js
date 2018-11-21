'use strict';

const repositorio = require('../repositories/produto-repositorio');

exports.get = async(req, res, next) => {
    try {
        var data = await repositorio.buscar();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição!'
        });
    }
}

exports.getNome = async(req, res, next) => {

    try {
        var data = await repositorio.buscarNome(req.params.titulo);
        res.status(200).send(data); 
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição!'
        });
    }
}

exports.getBySlug = async(req, res, next) => {
    
    try {
        var data = await repositorio.buscarSlug(req.params.slug);
        res.status(200).send(data); 
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar requisição!'
        });
    }
}

exports.getById = async(res, req, next) => {
    try {
        var data = await repositorio.buscarId(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send({
            message: 'Falha ao processar requisição!'
        });
    }
    
}

exports.post = async(req, res, next)=> {
    try{
        await repositorio.criar(req.body);
        res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
        });
    } catch (e){
        res.status(500).send({
            message: 'Falha ao cadastrar o produto!', 
            data: e
        });
    }
}


exports.put = async(req, res, next)=> {
    try {
        await repositorio.atualizar(req.params.id, req.body);
        res.status(201).send({
            message: 'Produto atualizado'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao atualizar!',
            data: e
        });
    }
}

exports.delete = async(req, res, next)=> {
    try {
        await repositorio.apagar(req.body.id);
        res.status(200).send({
            message: 'Produto apagado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao apagar produto!',
            data: e
        });
    }
};
