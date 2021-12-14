import { Box, Typography, IconButton, Icon, ButtonGroup, Stack } from '@mui/material';
import React from 'react';
import { Note } from '../../App';

interface NoteItemProps {
  deleteNote: (index: number) => void;
  note: Note;
  index: number;
}

function NoteItem({ note, index, deleteNote }: NoteItemProps) {
  function onDeleteClick() {
    deleteNote(index);
  }

  return (
    <Box
      border={1}
      borderRadius={1}
      borderColor="grey.500"
      p=".3rem .5rem"
      sx={{ ':hover .button-icons': { display: 'block' } }}
    >
      <Typography variant="h5">{note.title}</Typography>
      <Typography variant="body1">{note.body}</Typography>
      <Stack direction="row" className="button-icons" sx={{display: 'none'}}>
        <IconButton size="small" sx={{ paddingLeft: 0 }} onClick={onDeleteClick}>
          <Icon sx={{fontSize: 19}}>delete</Icon>
        </IconButton>
        <IconButton size="small">
          <Icon sx={{fontSize: 19}}>edit</Icon>
        </IconButton>
        <IconButton size="small">
          <Icon sx={{fontSize: 19}}>more_vert</Icon>
        </IconButton>
      </Stack>
    </Box>
  );
}

export default NoteItem;
