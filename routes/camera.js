import express from 'express';

import { capture } from '../controllers/camera.js';
const router = express.Router();

//homepage
router.get('/capture', capture);

export default router;