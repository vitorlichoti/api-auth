const express = require('express');
const AuthController = require('../controller/auth.controller');
const FieldsAuthChecker = require('../middlewares/checkFieldsFromPost');

const authRouter = express.Router();

const authController = new AuthController();

/**
 * @swagger
 * /api/auth/validate:
 *   get:
 *     summary: Check if the token is valid.
 *     description: Handle JWT token and check if this token is valid, expired or not.
 *     responses:
 *       200:
 *         description: Token is valid.
 *       401:
 *         description: Token is invalid.
 *       403:
 *         description: Token is expired.
 */
authRouter.get('/api/auth/validate', authController.validateToken);

/**
 * @swagger
 * /api/auth/ping:
 *   get:
 *     summary: Check if server is running.
 *     description: Check if server is running.
 *     responses:
 *       200:
 *         description: Returns "pong" if server is running.
 */
authRouter.get('/api/auth/ping', (req, res) => res.status(200).send('pong'));

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register new account.
 *     description: Check if all fields are fine and register new account in database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               avatar_url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Account created.
 *       400:
 *         description: Fields missing.
 *       401:
 *         description: All fields must be filled.
 */

authRouter.post('/api/auth/register', FieldsAuthChecker.checkFieldsFromRegister, FieldsAuthChecker.checkIfUserNameExists, authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticates a session.
 *     description: Check if user exists in database, and return a token to authenticate him.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns a jwt token.
 *       404:
 *         description: User not found.
 *       401:
 *         description: User unauthorized.
 */
authRouter.post('/api/auth/login', FieldsAuthChecker.checkFieldsFromLogin, authController.login);

module.exports = authRouter;