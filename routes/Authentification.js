import express from 'express';
const router = express.Router();
//controllers
import { register } from '../controllers/Auth.js';
router.post('/register', register)

export default router;