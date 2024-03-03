const AuthService = require('../service/auth.service');

class AuthController {
  async register(req, res) {
    try {
      const registerFields = req.body;

      const authService = new AuthService();

      const newUser = await authService.register(registerFields); // Call service method
      return res.status(201).json(newUser); // Return created user
    } catch (error) {
      console.error(error); // Log the error for debugging
      return res.status(500).json({ message: 'Registration failed' }); // Generic error message for security
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;

      const authService = new AuthService();

      const token = await authService.login(username, password); // Call service method
      return res.status(200).json(token); // Return the JWT token
    } catch (error) {
      console.error(error); // Log the error for debugging
      return res.status(401).json({ message: 'Invalid credentials' }); // Specific error for failed login
    }
  }

  async validateToken(req, res) {
    try {
      const token = req.headers.authorization;

      const authService = new AuthService();

      const { code, message } = await authService.validateToken(token);

      return res.status(code).json(message);
    } catch (error) {
      return res.status(500).json({ message: 'Token validation failed' });
    }
  }
}

module.exports = AuthController;