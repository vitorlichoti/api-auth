const express = require('express');
const AuthController = require('../controller/auth.controller');
const FieldsAuthChecker = require('../middlewares/checkFieldsFromPost');

const authRouter = express.Router();

const authController = new AuthController();

// GET /api/auth/validate -> token validation: if is expired or not, and, if is valid or not
authRouter.get('/api/auth/validate', authController.validateToken);

// POST /api/auth/register -> register a new user
authRouter.post('/api/auth/register', FieldsAuthChecker.checkFieldsFromRegister, authController.register);

// POST /api/auth/login -> login
authRouter.post('/api/auth/login', authController.login);

module.exports = authRouter;