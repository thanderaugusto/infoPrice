'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/produto-controller');
const authService = require('../services/auth-service');

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/busca/:titulo', controller.getNome);
router.get('/adm/:id', controller.getProdutoId);

router.post('/', authService.isAdmin, controller.post);

router.put('/:id', authService.isAdmin, controller.put);

router.delete('/', authService.isAdmin, controller.delete);

module.exports = router;