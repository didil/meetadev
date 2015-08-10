'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/:id/ok', auth.hasRole('client'), controller.ok);
router.post('/:id/nok', auth.hasRole('client'), controller.nok);
router.get('/match-freelancers', auth.hasRole('client'), controller.matchFreelancers);
router.put('/profile', auth.isAuthenticated(), controller.updateProfile);
router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);


module.exports = router;
