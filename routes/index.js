import express from 'express';

import { home } from '../controllers/index.js';
const router = express.Router();

//homepage
router.get('/', home);

export default router;