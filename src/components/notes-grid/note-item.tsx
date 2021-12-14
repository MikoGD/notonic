import {
  Box,
  Typography,
  IconButton,
  Icon,
  ButtonGroup,
  Stack,
  Menu,
  MenuItem,
  Dialog,
  Grid,
  DialogTitle,
  Button,
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

function NoteItem({ note, index, deleteNote, changeNoteColor }: NoteItemProps) {
  const [isColorDialogOpen, setIsColorDialogOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function closeMoreMenu() {
    setIsMoreOpen(false);
    setAnchorEl(null);
  }

  function onDeleteClick() {
    deleteNote(index);
  }

  function onMoreClick(e: React.MouseEvent<HTMLButtonElement>)
  {
    setAnchorEl(e.currentTarget);
    setIsMoreOpen(true);
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
        <IconButton size="small">
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
    </Box>
  );
}

export default NoteItem;
