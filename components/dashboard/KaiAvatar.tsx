'use client'

import { Box, Typography } from '@mui/material';
import Image from 'next/image';

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
          ? 'transparent' 
          : 'grey.400',
        color: 'white',
        flexShrink: 0,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {isKai ? (
        <Image
          src="/kaitaki_HQ.png"
          alt="Kaitaki Logo"
          width={size}
          height={size}
          style={{
            objectFit: 'contain',
            width: '100%',
            height: '100%',
          }}
        />
      ) : (
        <Typography
          sx={{
            fontSize: size * 0.4,
            fontWeight: 600,
          }}
        >
          {initials}
        </Typography>
      )}
    </Box>
  );
}

