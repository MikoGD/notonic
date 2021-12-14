import React from 'react';
import { Container, Grid } from '@mui/material';
import { Note } from '../../App';
import NoteItem from './note-item';

interface NotesGridProps {
  notes: Note[];
}

function NotesGrid({ notes }: NotesGridProps) {
  return (
    <Container maxWidth="xl" sx={{ mt: '2rem' }}>
      <Grid container spacing={2}>
        {notes.map((note) => (
          <Grid item xs={3} key={note.id}>
            <NoteItem note={note} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default NotesGrid;
