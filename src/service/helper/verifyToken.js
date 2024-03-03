const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

async function verifyToken(token) {
  try {
    const decodedToken = jwt.decode(token);
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    const { exp, iat, nbf } = decodedToken;

    if (exp < Date.now()) {
      throw new Error('Token expirado');
    }

    if (iat > Date.now()) {
      throw new Error('Token emitido no futuro');
    }

    if (nbf > Date.now()) {
      throw new Error('Token não deve ser usado antes de ' + nbf);
    }

    return verified;
  } catch (error) {
    console.error('27', error.message);
    return error.message;
  }
}

module.exports = verifyToken;