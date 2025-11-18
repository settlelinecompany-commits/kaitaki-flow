'use client'

import { Fab, Box } from '@mui/material';
import Image from 'next/image';
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
        width: 56,
        height: 56,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 24,
          height: 24,
        }}
      >
        <Image
          src="/kaitaki_HQ.png"
          alt="Kai"
          fill
          style={{
            objectFit: 'contain',
          }}
          priority
        />
      </Box>
    </Fab>
  );
}

