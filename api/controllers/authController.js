import jwt from 'jsonwebtoken';
import User from '../models/User.js';
// sign token

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// verify token

export const signUp = async (req, res) => {
  const { name, email, age, password, gender, genderPreference } = req.body;
  try {
    if (!name || !email || !password || !gender || !genderPreference || !age) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }
    if (age < 18) {
      return res.status(400).json({
        success: false,
        message: 'Age must be at least 18',
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    const newUser = await User.create({
      name,
      email,
      age,
      password,
      gender,
      genderPreference,
    });

    const token = signToken(newUser._id);
    res.cookie('token', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {}
};
export const login = async (req, res) => {
  res.json('login');
};
export const logOut = async (req, res) => {
  res.json('logout');
};
