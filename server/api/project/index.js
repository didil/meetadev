'use strict';

var express = require('express');
var controller = require('./project.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/:id/ok', auth.isAuthenticated(), controller.ok);
router.post('/:id/nok', auth.isAuthenticated(), controller.nok);
router.get('/match', auth.hasRole('freelancer'), controller.match);
router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;