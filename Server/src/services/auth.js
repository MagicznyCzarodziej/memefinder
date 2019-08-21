import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
import UserModel from '../models/userModel';

async function hashPassword(password) {
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
}

function generateJWT(user) {
  return jwt.sign(JSON.stringify(user), config.auth.JWT_SECRET);
}

export default class AuthService {
  async register(data) {
    const passwordHash = await hashPassword(data.password);
    const user = new UserModel();

    const result = await user.register({
      username: data.username,
      passwordHash,
      permissions: data.permissions,
    });

    return result;
  };

  async auth(token) {
    const user = await jwt.verify(token, config.auth.JWT_SECRET);
    return {
      userId: user.userId,
      username: user.username,
      permissions: user.permissions || [],
    };
  };

  async login(credentials) {
    // Find user by username
    const user = await UserModel.findOne({
      'username': credentials.username,
    });

    if (!user) throw new Error('User doesn\'t exist');

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.passwordHash,
    );
    if (!isPasswordValid) throw new Error('Invalid password');

    const token = generateJWT({
      userId: user._id,
      username: user.username,
      permissions: user.permissions
    });

    return {
      userId: user._id,
      username: user.username,
      permissions: user.permissions,
      token,
    };
  }
}