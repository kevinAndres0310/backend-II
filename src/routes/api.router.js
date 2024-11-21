import express from 'express';
import UserModel from '../models/user.models.js';
import {generateToken, verifyToken, isValidPassword} from '../utils.js';

const apiRouter = express.Router();

// Registro de usuario
apiRouter.post('/register', async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();

    res.status(201).json({message: 'User created successfully'});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

// Login de usuario
apiRouter.post('/login', async (req, res) => {
  try {
    const user = await UserModel.findOne({email: req.body.email});

    if (!user) {
      return res.status(400).json({error: 'User not found'});
    }
    if (!isValidPassword(user, req.body.password)) {
      return res.status(400).json({error: 'Invalid password'});
    }

    const token = generateToken({userId: user._id, role: user.role});
    res.cookie('currentUser', token, {httpOnly: true});
    res.json({message: 'Login successful', token});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});
export default apiRouter;
