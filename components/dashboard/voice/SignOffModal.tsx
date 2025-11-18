'use client'

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
  Divider,
} from '@mui/material';

interface SignOffModalProps {
  open: boolean;
  onClose: () => void;
  onSignOff: () => void;
}

export default function SignOffModal({ open, onClose, onSignOff }: SignOffModalProps) {
  const [name] = useState('Riley Carter');
  const [role] = useState('Privacy Champion');
  const [confirmed, setConfirmed] = useState(false);
  const [comments, setComments] = useState('');

  const handleSignOff = () => {
    if (confirmed) {
      onSignOff();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Privacy Champion Sign-Off
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
          Confirm that the answers are complete and accurate.
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={3} sx={{ pt: 2 }}>
          <TextField
            label="Name"
            value={name}
            disabled
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Role"
            value={role}
            disabled
            fullWidth
            variant="outlined"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                color="primary"
              />
            }
            label={
              <Typography variant="body2">
                I confirm that this assessment is complete and ready for risk evaluation.
              </Typography>
            }
          />
          <TextField
            label="Comments (Optional)"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            placeholder="Add any additional notes or comments..."
          />
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} sx={{ textTransform: 'none' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSignOff}
          disabled={!confirmed}
          sx={{
            textTransform: 'none',
            px: 3,
          }}
        >
          Sign Off & Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}

