import React, { useState } from 'react';
import { CssBaseline, Typography } from '@mui/material';
import { v4 as uuid } from 'uuid';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import QuickNote from './components/quick-note';
import NotesGrid from './components/notes-grid';
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
      color: 'white',
    };

    setNotes((prev) => ([ ...prev, newNote ]));
  }

  function deleteNote(index: number) {
    console.log('deleting note');
    setNotes(prev => {
      prev.splice(index, 1);

      return [...prev];
    });
  }

  return (
    <div className={styles.app}>
      <CssBaseline />
      <Typography component="h1" variant="h1">
        Note App
      </Typography>
      <QuickNote addQuickNote={addQuickNote} />
      <NotesGrid notes={notes} deleteNote={deleteNote}/>
    </div>
  );
}

export default App;
