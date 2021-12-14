import {Box, Typography} from '@mui/material';
import React from 'react';
import { Note } from '../../App';

interface NoteItemProps {
  note: Note;
}

function NoteItem({ note }: NoteItemProps) {
  return (
    <Box border={1} borderRadius={1} borderColor="grey.500" p="1rem">
      <Typography variant="h5">{note.title}</Typography>
      <Typography variant="body1">{note.body}</Typography>
    </Box>
  );
}

export default NoteItem;
