const jwt = require('jsonwebtoken');

const uid = require('uuid');
const verifyToken = require('./helper/verifyToken');


class AuthService {
  async register(registerFields) {
    const {
      username,
      password,
      name,
      email,
      avatar_url,
    } = registerFields;

    const addUser = {
      username,
      password,
      name,
      email,
      avatar_url,
    };

    return { id: uid.v4(), new_user: addUser };
  }

  async login(username, password) {

    const expiration = Date.now() + 1000 * 60 * 60; // 1hr

    const token = jwt.sign({ data: { username, password }, exp: expiration }, process.env.JWT_SECRET);

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
      console.log('47', error.message);
      return { code: 401, message: 'Invalid token' };
    }
  }
}

module.exports = AuthService;