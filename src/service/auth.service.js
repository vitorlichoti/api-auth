const jwt = require('jsonwebtoken');
const AuthRepository = require('../repository/auth.repository');

const verifyToken = require('./helper/verifyToken');
const bcrypt = require('bcrypt');

class AuthService {
  async register(registerFields) {
    const {
      username,
      password,
      name,
      email,
      avatar_url,
    } = registerFields;

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const authRepository = new AuthRepository();

    const addUser = await authRepository.register(username, hashedPassword, name, email, avatar_url);

    return { code: 201, message: addUser };
  }

  async login(username, password) {
    const authRepository = new AuthRepository();

    const expiration = Date.now() + 1000 * 60 * 60; // 1hr

    // Consulta o usuário pelo nome de usuário
    const user = await authRepository.getUserByUsername(username);

    // Verifica se o usuário existe
    if (!user) {
      return { code: 401, message: 'Invalid credentials' };
    }

    // Compara a senha fornecida com a senha armazenada criptografada
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { code: 401, message: 'Invalid credentials' };
    }

    // Gera o token de autenticação
    const token = jwt.sign({ data: { username } }, process.env.JWT_SECRET, { expiresIn: expiration });

    return { token };
  }

  async validateToken(token) {
    try {
      const decoded = await verifyToken(token);

      if (decoded === 'jwt must be provided') {
        return { code: 400, message: 'jwt must be provided' };
      }

      return { code: 200, message: decoded };
    } catch (error) {
      return { code: 401, message: 'Invalid token' };
    }
  }
}

module.exports = AuthService;