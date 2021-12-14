import React from 'react';
import { Container, Grid } from '@mui/material';
import { Note } from '../types';
import NoteItem from '../note-item';

interface NotesGridProps {
  deleteNote: (index: number) => void;
  notes: Note[];
  changeNoteColor: (color: string, index: number) => void;
  updateNote: (updatedNote: Note, index: number) => void;
}

function NotesGrid({
  notes,
  deleteNote,
  changeNoteColor,
  updateNote,
}: NotesGridProps): React.ReactElement {
  return (
    <Container maxWidth="xl" sx={{ mt: '2rem' }}>
      <Grid container spacing={2}>
        {notes.map((note, index) => (
          <Grid item xs={3} key={note.id}>
            <NoteItem
              note={note}
              index={index}
              deleteNote={deleteNote}
              changeNoteColor={changeNoteColor}
              updateNote={updateNote}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default NotesGrid;
