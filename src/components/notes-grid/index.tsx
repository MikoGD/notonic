import React from 'react';
import { Container, Grid } from '@mui/material';
import { Note } from '../../App';
import NoteItem from './note-item';

interface NotesGridProps {
  deleteNote: (index: number) => void;
  notes: Note[];
}

function NotesGrid({ notes, deleteNote }: NotesGridProps) {
  return (
    <Container maxWidth="xl" sx={{ mt: '2rem' }}>
      <Grid container spacing={2}>
        {notes.map((note, index) => (
          <Grid item xs={3} key={note.id}>
            <NoteItem note={note} index={index} deleteNote={deleteNote}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default NotesGrid;
