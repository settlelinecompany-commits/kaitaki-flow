'use client'

import { Box, Button, Container, Stack, Typography } from '@mui/material';
import AppTheme from './AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import Image from 'next/image';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.default',
        }}
      >
        <Container maxWidth="md">
          <Stack spacing={4} alignItems="center" textAlign="center">
            <Box
              sx={{
                position: 'relative',
                width: { xs: 200, md: 280 },
                height: { xs: 60, md: 84 },
                mb: 2,
              }}
            >
              <Image
                src="/kaitaki_HQ.png"
                alt="Kaitaki"
                fill
                style={{
                  objectFit: 'contain',
                }}
                priority
              />
            </Box>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 600,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                lineHeight: 1.2,
              }}
            >
              Welcome to Kaitaki
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{
                color: 'text.secondary',
                maxWidth: '600px',
                fontSize: { xs: '1rem', md: '1.25rem' },
              }}
            >
              Let's understand your organization so Kaitaki can generate your Privacy Assessment automatically.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={onStart}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 500,
                mt: 2,
              }}
            >
              Start Pre-Qualification
            </Button>
          </Stack>
        </Container>
      </Box>
    </AppTheme>
  );
}

