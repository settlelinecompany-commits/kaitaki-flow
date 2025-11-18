'use client'

import { Box } from '@mui/material';
import { keyframes } from '@mui/material/styles';

interface VoiceWaveformProps {
  isActive: boolean;
}

const waveAnimation = keyframes`
  0%, 100% {
    transform: scaleY(0.3);
    opacity: 0.5;
  }
  50% {
    transform: scaleY(1);
    opacity: 1;
  }
`;

export default function VoiceWaveform({ isActive }: VoiceWaveformProps) {
  const bars = Array.from({ length: 40 }, (_, i) => i);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        height: 120,
        width: '100%',
        maxWidth: '600px',
      }}
    >
      {bars.map((bar) => (
        <Box
          key={bar}
          sx={{
            width: 4,
            height: isActive ? '100%' : 8,
            backgroundColor: 'primary.main',
            borderRadius: 2,
            animation: isActive
              ? `${waveAnimation} ${0.5 + (bar % 5) * 0.1}s ease-in-out infinite`
              : 'none',
            animationDelay: `${bar * 0.05}s`,
            opacity: isActive ? 0.8 : 0.3,
          }}
        />
      ))}
    </Box>
  );
}

