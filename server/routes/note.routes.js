import { Router } from 'express';
import * as NoteController from '../controllers/note.controller';

const router = new Router();
//add note
router.route('/notes').post(NoteController.addNote);
//Edit a Note
router.route('/notes').put(NoteController.editNote);
//Print all notes
router.route('/notes').get(NoteController.getNotes);
//Delete note
router.route('/notes/:noteId').delete(NoteController.deleteNote);

export default router;