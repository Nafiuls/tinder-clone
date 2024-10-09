import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female'],
  },
  gendrPreference: {
    type: String,
    required: true,
    enum: ['Male', 'Female'],
  },
  bio: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  matches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});
// hashing the password before saving user
userSchema.pre('save', async (next) => {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
// checking password
userSchema.methods.matchPassword = async (enteredPassword) => {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('user', userSchema);

export default User;
