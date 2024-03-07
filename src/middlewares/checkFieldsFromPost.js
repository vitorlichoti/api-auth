const AuthRepository = require('../repository/auth.repository');

class FieldsAuthChecker {

  static checkFieldsFromLogin(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    return next();
  }

  static checkFieldsFromRegister(req, res, next) {
    const registerFields = req.body;

    if (Object.keys(registerFields).length === 0) {
      return res.status(400).json({ message: 'No fields were sent' });
    }

    const registerFieldsValues = Object.values(registerFields);

    const isSomeFieldEmpty = registerFieldsValues.some((field) => field === null || field === '' || field === undefined);

    if (isSomeFieldEmpty) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    return next();
  }

  static async checkIfUserNameExists(req, res, next) {
    const { username, email } = req.body;

    const authRepository = new AuthRepository();

    const user = await authRepository.getUserByUsernameAndEmail(username, email);

    if (user) {
      if (user.username === username && user.email === email) {
        return res.status(400).json({ message: 'Username and email already exists' });
      }

      if (user.username === username) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      if (user.email === email) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    return next();
  }
}

module.exports = FieldsAuthChecker;
