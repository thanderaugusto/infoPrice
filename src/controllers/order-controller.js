'use strict';

const repositorio = require('../repositories/order-repositorio');
const guid = require('guid');
const authService = require('../services/auth-service');

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


exports.post = async(req, res, next)=> {
    try{
        //recupera token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        //decodifica token
        const data = await authService.decodeToken(token);

        await repositorio.criar({
            cliente: data.id,
            numero: guid.raw().substring(0, 6),
            itens: req.body.itens
        });
        res.status(201).send({
            message: 'Pedido cadastrado com sucesso!'
        });
    } catch (e){
        res.status(500).send({
            message: 'Falha ao cadastrar o produto!', 
            data: e
        });
    }
}