'use client'

import { Box, Typography } from '@mui/material';

interface KaiAvatarProps {
  size?: number;
  variant?: 'kai' | 'user';
  initials?: string;
}

export default function KaiAvatar({ 
  size = 64, 
  variant = 'kai',
  initials = 'U'
}: KaiAvatarProps) {
  const isKai = variant === 'kai';
  
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isKai 
          ? 'primary.main' 
          : 'grey.400',
        color: 'white',
        flexShrink: 0,
      }}
    >
      <Typography
        sx={{
          fontSize: size * 0.4,
          fontWeight: 600,
        }}
      >
        {isKai ? 'K' : initials}
      </Typography>
    </Box>
  );
}

