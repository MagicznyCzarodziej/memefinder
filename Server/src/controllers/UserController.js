import AuthService from '../services/auth';

export default class UserController {
  async register(req, res) {
    const { user } = res.locals;
    
    if (!user.permissions.includes('USERS_REGISTER')) {
      return res.status(401).send({
        data: {
          error: {
            code: 'INSUFFICIENT_PERMISSIONS',
            message: 'USER_REGISTER permission is required',
          },
        },
      });
    }

    try {
      const userToRegister = req.body;
      const authServiceInstance = new AuthService();
      const result = authServiceInstance.register(userToRegister);
      res.send({ data: result });
    } catch(error) {
      res.status(500).send({
        data: {
          error: {
            code: 'SERVER_ERROR',
            message: 'Something went wrong',
          }
        }
      });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const authServiceInstance = new AuthService();
      const result = await authServiceInstance.login({ username, password });
      res.send({
        data: result,});
    } catch (error) {  
      res.status(401).send({
        data: {
          error: {
            code: 'USERNAME_OR_PASSWORD_INVALID',
            message: 'Username or password is invalid',
          },
        },
      });
    }
  }
}