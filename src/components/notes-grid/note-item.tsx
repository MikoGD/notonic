import {
  Box,
  Typography,
  IconButton,
  Icon,
  Stack,
  Menu,
  MenuItem,
  Dialog,
  Grid,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import {
  lightBlue,
  red,
  orange,
  yellow,
  pink,
  green,
} from '@mui/material/colors';
import { Note } from '../../App';

interface NoteItemProps {
  deleteNote: (index: number) => void;
  note: Note;
  index: number;
  changeNoteColor: (color: string, index: number) => void;
  updateNote: (updatedNote: Note, index: number) => void;
}

interface Colors {
  [color: string]: string;
}

export const availableColors: Colors = {
  red: red[400],
  blue: lightBlue[400],
  green: green[400],
  yellow: yellow[400],
  orange: orange[400],
  pink: pink[400],
};

function NoteItem({
  note,
  index,
  deleteNote,
  changeNoteColor,
  updateNote,
}: NoteItemProps): React.ReactElement {
  const [editNote, setEditNote] = useState('');
  const [editNoteError, setEditNoteError] = useState(false);
  const [isColorDialogOpen, setIsColorDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function closeMoreMenu() {
    setIsMoreOpen(false);
    setAnchorEl(null);
  }

  function onDeleteClick() {
    deleteNote(index);
  }

  function onMoreClick(e: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(e.currentTarget);
    setIsMoreOpen(true);
  }

  function onEditClick() {
    setIsEditDialogOpen(true);
    setEditNote(note.title);
  }

  function handleMoreClose() {
    closeMoreMenu();
  }

  function openColorDialog() {
    setIsColorDialogOpen(true);
  }

  function handleColorDialogClose() {
    setIsColorDialogOpen(false);
  }

  function handleChangeColor(color: string) {
    changeNoteColor(color, index);
    closeMoreMenu();
    setIsColorDialogOpen(false);
  }

  function handleCloseEditDialog() {
    setIsEditDialogOpen(false);
  }

  function handleEditNoteChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === '') {
      setEditNoteError(true);
    } else if (editNoteError) {
      setEditNoteError(false);
    }

    setEditNote(e.target.value);
  }

  function saveEdit() {
    if (editNoteError) {
      return;
    }

    const updatedNote = { ...note };
    updatedNote.title = editNote;

    updateNote(updatedNote, index);

    setIsEditDialogOpen(false);
  }

  return (
    <Box
      border={1}
      borderRadius={1}
      borderColor="grey.500"
      bgcolor={note.color}
      p=".3rem .5rem"
      sx={[
        { ':hover .button-icons': { display: 'block' } },
        isMoreOpen && { '.button-icons': { display: 'block !important' } },
      ]}
    >
      <Typography variant="h5">{note.title}</Typography>
      <Typography variant="body1">{note.body}</Typography>
      <Stack direction="row" className="button-icons" sx={{ display: 'none' }}>
        <IconButton
          size="small"
          sx={{ paddingLeft: 0 }}
          onClick={onDeleteClick}
        >
          <Icon sx={{ fontSize: 19 }}>delete</Icon>
        </IconButton>
        <IconButton size="small" onClick={onEditClick}>
          <Icon sx={{ fontSize: 19 }}>edit</Icon>
        </IconButton>
        <IconButton size="small" onClick={onMoreClick}>
          <Icon sx={{ fontSize: 19 }}>more_vert</Icon>
        </IconButton>
      </Stack>
      <Menu anchorEl={anchorEl} open={isMoreOpen} onClose={handleMoreClose}>
        <MenuItem onClick={openColorDialog}>Change Color</MenuItem>
      </Menu>
      <Dialog onClose={handleColorDialogClose} open={isColorDialogOpen}>
        <DialogTitle>Choose a color</DialogTitle>
        <Grid container width="20rem" height="12.5rem" px="1rem" mb="1rem">
          {Object.entries(availableColors).map(([key, value]) => (
            <Grid item xs={4} key={key} p=".3rem">
              <Box
                bgcolor={`${value}`}
                borderRadius={1}
                width="100%"
                height="100%"
                onClick={() => handleChangeColor(key)}
                sx={{ cursor: 'pointer' }}
              >
                &nbsp;
              </Box>
            </Grid>
          ))}
        </Grid>
      </Dialog>
      <Dialog onClose={handleCloseEditDialog} open={isEditDialogOpen}>
        <DialogTitle>Edit note</DialogTitle>
        <Box m="1rem" mt="0rem" width="30rem">
          <TextField
            fullWidth
            error={editNoteError}
            id="edit-note"
            label="Edit note"
            variant="outlined"
            value={editNote}
            onChange={handleEditNoteChange}
            helperText={editNoteError && 'Note is empty'}
            InputProps={{
              endAdornment: (
                <IconButton onClick={saveEdit}>
                  <Icon fontSize="small">save</Icon>
                </IconButton>
              ),
            }}
          />
        </Box>
      </Dialog>
    </Box>
  );
}

export default NoteItem;
