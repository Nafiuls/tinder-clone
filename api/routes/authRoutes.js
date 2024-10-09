import express from 'express';
import { logOut, login, signUp } from '../controllers/authController.js';
const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logOut);

export default router;
