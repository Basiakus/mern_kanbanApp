import { Router } from 'express';
import * as NoteController from '../controllers/note.controller';

const router = new Router();

router.route('/notes').post(NoteController.addNote);
router.route('/notes').get(NoteController.getNotes);
router.route('/notes/:noteId').delete(NoteController.deleteNote);

export default router;