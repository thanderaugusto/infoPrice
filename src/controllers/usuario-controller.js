'use strict';

const repositorio = require('../repositories/usuario-reprositorio');
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
            message: 'Usuário cadastrado com sucesso!'
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
        const usuario = await repositorio.autenticacao({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if(!usuario){
            res.status(404).send({
                message: 'Usúario ou senha inválidos'
            });
            return;
        }

        const token = await authService.generateToken({
            id: usuario.id,
            email: usuario.email,
            nome: usuario.nome,
            roles: usuario.roles
        });

        res.status(201).send({
            token: token,
            data : {
                email: usuario.email,
                nome: usuario.nome
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

        const usuario = await repositorio.buscarId(data.id);

        if(!usuario){
            res.status(404).send({
                message: 'Usuário não encontrado'
            });
            return;
        }

        const tokenData = await authService.generateToken({
            id: usuario.id,
            email: usuario.email,
            nome: usuario.nome,
            roles: usuario.roles
        });

        res.status(201).send({
            token: tokenData,
            data : {
                email: usuario.email,
                nome: usuario.nome
            }
        });
    } catch (e){
        res.status(500).send({
            message: 'Falha ao cadastrar o produto!', 
            data: e
        });
    }
}