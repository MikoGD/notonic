import {
  Container,
  TextField,
  Icon,
  IconButton,
} from '@mui/material';
import React, { ChangeEvent, useState } from 'react';

interface QuickNoteProps {
  addQuickNote: (title: string) => void;
}

function QuickNote({ addQuickNote }: QuickNoteProps): React.ReactElement {
  const [quickNote, setQuickNote] = useState('');
  const [quickNoteError, setQuickNoteError] = useState(false);

  function handleQuickNoteChange(e: ChangeEvent<HTMLInputElement>) {
    if (quickNoteError) {
      setQuickNoteError(false);
    }

    setQuickNote(e.target.value);
  }

  function saveQuickNote() {
    if (quickNote === '') {
      setQuickNoteError(true);
    }

    addQuickNote(quickNote);
  }

  return (
    <Container maxWidth="md">
      <TextField
        fullWidth
        error={quickNoteError}
        id="quick-note"
        label="Add a quick note"
        variant="outlined"
        value={quickNote}
        onChange={handleQuickNoteChange}
        helperText={quickNoteError && 'Note is empty'}
        InputProps={{
          endAdornment: (
            <IconButton onClick={saveQuickNote}>
              <Icon>add_circle</Icon>
            </IconButton>
          ),
        }}
      />
    </Container>
  );
}

export default QuickNote;
