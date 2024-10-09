import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

//routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import matchesRoutes from './routes/matchesRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

dotenv.config();
const app = express();
// routes
app.get('/', (req, res) => {
  res.json('hello');
});

app.use(express.json());
app.use(cookieParser());
// routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/matches', matchesRoutes);
app.use('/api/messages', messageRoutes);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
  connectDB();
});
