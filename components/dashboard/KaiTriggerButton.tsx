'use client'

import { Fab } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { useKai } from './KaiContext';

export default function KaiTriggerButton() {
  const { isOpen, togglePanel } = useKai();

  // Hide floating button when panel is open (desktop header button is visible)
  if (isOpen) {
    return null;
  }

  return (
    <Fab
      color="primary"
      aria-label="Open Kai"
      onClick={togglePanel}
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1000,
      }}
    >
      <ChatIcon />
    </Fab>
  );
}

