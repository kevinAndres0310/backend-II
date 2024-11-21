import mongoose from 'mongoose';
import {createHash, isValidPassword} from '../utils.js';

const userSchema = new mongoose.Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  role: {type: String, default: 'user'},
  password: {type: String, required: true},
  age: {type: Number},
});

// Middleware para encriptar la contraseña antes de guardar en la base de datos
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await createHash(this.password); // Encriptamos la contraseña
  next();
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
