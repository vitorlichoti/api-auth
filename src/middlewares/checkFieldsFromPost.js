const AuthRepository = require('../repository/auth.repository');

class FieldsAuthChecker {

  static checkFieldsFromLogin(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
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

    next();
  }

  static checkIfUserNameExists(req, res, next) {
    const { username } = req.body;

    const authRepository = new AuthRepository();

    const user = authRepository.getUserByUsername(username);

    if (!user) {
      return res.status(400).json({ message: 'Username must be filled' });
    }
    next();
  }
}

module.exports = FieldsAuthChecker;
