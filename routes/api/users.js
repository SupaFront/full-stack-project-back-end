const express = require('express');
const usersCtrl = require('../../controllers/users');
const { ctrlWrapper, authenticate, validation } = require('../../middleware');
const { userJoiSchemas } = require('../../models/user');

const router = express.Router();

router.post('/register', validation(userJoiSchemas.register), ctrlWrapper(usersCtrl.registerUser));

router.post('/login', validation(userJoiSchemas.login), ctrlWrapper(usersCtrl.loginUser));

router.post('/logout', authenticate, ctrlWrapper(usersCtrl.logoutUser));

router.get('/current', authenticate, ctrlWrapper(usersCtrl.getCurrentUser));

module.exports = router;
