import React, { useState } from 'react';
import { CssBaseline, Typography } from '@mui/material';
import { v4 as uuid } from 'uuid';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AddNote from './components/notes/add-note';
import NotesGrid from './components/notes/notes-grid';
import { availableColors } from './components/notes/note-item';
import styles from './app.module.css';

export interface Note {
  id: string;
  title: string;
  body: string;
  color: string;
}

function App(): React.ReactElement {
  const [notes, setNotes] = useState<Note[]>([]);

  function addQuickNote(title: string) {
    const newNote = {
      id: uuid(),
      title,
      body: '',
      color: availableColors.blue,
    };

    setNotes((prev) => [...prev, newNote]);
  }

  function deleteNote(index: number) {
    setNotes((prev) => {
      prev.splice(index, 1);

      return [...prev];
    });
  }

  function changeNoteColor(color: string, index: number) {
    setNotes((prev) => {
      const currNote = prev[index];

      if (currNote) {
        currNote.color = availableColors[color];
        prev.splice(index, 1);
        return [...prev, currNote];
      }

      return prev;
    });
  }

  function updateNote(updatedNote: Note, index: number) {
    setNotes((prev) => {
      prev[index] = updatedNote;

      return [...prev];
    });
  }

  return (
    <div className={styles.app}>
      <CssBaseline />
      <Typography component="h1" variant="h1">
        Notonic
      </Typography>
      <AddNote addQuickNote={addQuickNote} />
      <NotesGrid
        notes={notes}
        deleteNote={deleteNote}
        changeNoteColor={changeNoteColor}
        updateNote={updateNote}
      />
    </div>
  );
}

export default App;
