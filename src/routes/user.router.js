import express from 'express';
import {passportCall} from '../utils.js';

const userRouter = express.Router();

// Ruta para el login
userRouter.get('/login', (req, res) => {
  res.render('login', {currentUser: req.cookies.currentUser});
});

// Ruta para el usuario actual
userRouter.get('/current', passportCall('jwt'), (req, res) => {
  const user = req.user;
  console.log(user);
  res.render('current', {currentUser: user});
});

userRouter.get('/register', (req, res) => {
  res.render('register');
});

export default userRouter;
