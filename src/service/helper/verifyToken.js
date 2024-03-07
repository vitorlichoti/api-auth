const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

async function verifyToken(token) {
  try {
    const tokenParsed = JSON.parse(token);
    const decodedToken = jwt.decode(tokenParsed);
    const verified = jwt.verify(tokenParsed, process.env.JWT_SECRET);

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
    return error.message;
  }
}

module.exports = verifyToken;