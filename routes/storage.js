import express from 'express';
import { creators, project, new_project, new_creator } from '../controllers/storage.js';
const router = express.Router();

router.get('/creators', creators);
router.get('/:creator/projects', project);
router.post('/new/creator/:creator', new_creator);
router.post('/new/project/:creator/:project', new_project);

export default router;