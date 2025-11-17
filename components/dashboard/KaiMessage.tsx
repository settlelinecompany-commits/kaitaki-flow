'use client'

import { Box, Stack, Typography } from '@mui/material';
import KaiAvatar from './KaiAvatar';

interface KaiMessageProps {
  role: 'user' | 'assistant';
  content: string;
  userInitials?: string;
}

export default function KaiMessage({ role, content, userInitials = 'U' }: KaiMessageProps) {
  const isUser = role === 'user';

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        alignItems: 'flex-start',
        my: 2,
        px: 2,
      }}
    >
      {!isUser && <KaiAvatar size={32} variant="kai" />}
      <Box
        sx={{
          maxWidth: '70%',
          px: 3,
          py: 2,
          borderRadius: 3,
          backgroundColor: isUser ? '#1A2B49' : 'white',
          color: isUser ? 'white' : 'text.primary',
          boxShadow: isUser ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          sx={{
            fontSize: '0.9375rem',
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
          }}
        >
          {content}
        </Typography>
      </Box>
      {isUser && <KaiAvatar size={32} variant="user" initials={userInitials} />}
    </Stack>
  );
}

