import Lane from '../models/lane';
import Note from '../models/note';
import uuid from 'uuid';

export function addNote(req, res) {
  const { note, laneId } = req.body;

  if (!note || !note.task || !laneId) {
    res.status(400).end();
  }

  const newNote = new Note({
    task: note.task
  });

  newNote.id = uuid();
  newNote.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    Lane.findOne({ id: laneId })
      .then(lane => {
        lane.notes.push(saved);
        return lane.save();
      })
      .then(() => {
        res.json(saved);
      });
  });
}
export function getNotes(req, res) {
  Note.find().exec((err, notes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ notes });
  });
}

export function deleteNote(req, res) {
  Note.findOne({ id: req.params.noteId }).exec((err, note) => {
    if (err) {
      res.status(500).send(err);
    }
    note.remove(() => {
      res.status(200).end();
    });
  });
}
export function editNote(req, res) {
  const note = req.body;
  if(!note.id ) {
    res.status(403).end();
  }
  
  Note.findOneAndUpdate({id: note.id}, {task: note.task}, (err, update) => {
    if(err) {
      res.status(500).send(err);
    }
     res.status(200).end();
  });
}