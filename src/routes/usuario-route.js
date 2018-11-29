'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario-controller');
const authService = require('../services/auth-service');

router.post('/', controller.post);
router.post('/autenticacao', controller.autenticacao);
router.post('/refresh-token', authService.authorize, controller.refreshToken);

module.exports = router;