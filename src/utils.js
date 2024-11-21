import {fileURLToPath} from 'url';
import {dirname} from 'path';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import passport from 'passport';
dotenv.config();

export const passportCall = strategy => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res
          .status(401)
          .send({error: info.messages ? info.messages : info.toString()});
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};

// Private key para hacer JWT
const secretKey = process.env.SECRET_KEY || 'CoderSecret';

export const generateToken = user => {
  return jwt.sign(user, secretKey, {expiresIn: '1h'});
};

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({error: 'No token provided'});
  }

  const token = authHeader.split(' ')[1]; // Se hace para sacar el token del string 'Bearer token'

  jwt.verify(token, secretKey, (err, credentials) => {
    if (err) {
      return res.status(403).json({error: 'Failed to authenticate token'});
    }
    req.user = credentials.user;
    next();
  });
};

export const createHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;
