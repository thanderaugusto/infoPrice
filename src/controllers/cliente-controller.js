'use strict';

const repositorio = require('../repositories/cliente-reprositorio');
const md5 = require('md5');
const emailService = require('../services/email-service');
const authService = require('../services/auth-service');


exports.post = async(req, res, next)=> {
    try{
        await repositorio.criar({
            nome: req.body.nome,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles: ["user"]
        });
        
        emailService.send(
            req.body.email, 
            'Bem vindo ao InfoPrice', 
            global.EMAIL_TMPL.replace('{0}', req.body.nome));

        res.status(201).send({
            message: 'Cliente cadastrado com sucesso!'
        });
    } catch (e){
        res.status(500).send({
            message: 'Falha ao cadastrar o produto!', 
            data: e
        });
    }
}

exports.autenticacao = async(req, res, next)=> {
    try{
        const cliente = await repositorio.autenticacao({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if(!cliente){
            res.status(404).send({
                message: 'Usúario ou senha inválidos'
            });
            return;
        }

        const token = await authService.generateToken({
            id: cliente.id,
            email: cliente.email,
            nome: cliente.nome,
            roles: cliente.roles
        });

        res.status(201).send({
            token: token,
            data : {
                email: cliente.email,
                nome: cliente.nome
            }
        });
    } catch (e){
        res.status(500).send({
            message: 'Falha ao cadastrar o produto!', 
            data: e
        });
    }
}

exports.refreshToken = async(req, res, next)=> {
    try{
        //recupera token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        //decodifica token
        const data = await authService.decodeToken(token);

        const cliente = await repositorio.buscarId(data.id);

        if(!cliente){
            res.status(404).send({
                message: 'Cliente não encontrado'
            });
            return;
        }

        const tokenData = await authService.generateToken({
            id: cliente.id,
            email: cliente.email,
            nome: cliente.nome,
            roles: cliente.roles
        });

        res.status(201).send({
            token: tokenData,
            data : {
                email: cliente.email,
                nome: cliente.nome
            }
        });
    } catch (e){
        res.status(500).send({
            message: 'Falha ao cadastrar o produto!', 
            data: e
        });
    }
}