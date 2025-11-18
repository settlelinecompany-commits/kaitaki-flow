'use client'

import { Box, Stack, Typography, Avatar } from '@mui/material';
import { keyframes } from '@mui/material/styles';

type FlowState = 'welcome' | 'interview' | 'summary' | 'refinement';

interface AgentPersonaPanelProps {
  flowState: FlowState;
  isRecording: boolean;
}

const breathingGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(25, 118, 210, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(25, 118, 210, 0.5);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
`;

export default function AgentPersonaPanel({ flowState, isRecording }: AgentPersonaPanelProps) {
  const isActive = flowState === 'interview' || flowState === 'refinement';
  const isSpeaking = isActive && !isRecording;

  // Mock conversation transcript (last 3-4 messages)
  const transcript = [
    { role: 'kai', text: 'Let\'s start with your data collection practices. Do you collect personal data directly from individuals?' },
    { role: 'user', text: 'Yes, we collect email addresses and names during registration.' },
    { role: 'kai', text: 'Great. And do you inform data subjects about how their data will be used?' },
  ];

  return (
    <Box
      sx={{
        width: '320px',
        height: '100vh',
        backgroundColor: 'white',
        borderRight: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 4,
        px: 3,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Gradient background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '400px',
          background: 'linear-gradient(180deg, rgba(25, 118, 210, 0.05) 0%, transparent 100%)',
          zIndex: 0,
        }}
      />

      <Stack spacing={3} sx={{ alignItems: 'center', zIndex: 1, width: '100%' }}>
        {/* Avatar */}
        <Box
          sx={{
            position: 'relative',
            animation: isActive ? `${breathingGlow} 3s ease-in-out infinite` : 'none',
          }}
        >
          <Avatar
            src="https://i.pravatar.cc/200?img=47"
            alt="Kai - Your privacy analyst"
            sx={{
              width: 140,
              height: 140,
              border: '3px solid',
              borderColor: 'primary.light',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              animation: isSpeaking ? `${pulse} 2s ease-in-out infinite` : 'none',
            }}
          />
          {isSpeaking && (
            <Box
              sx={{
                position: 'absolute',
                top: -8,
                right: -8,
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: `${pulse} 1.5s ease-in-out infinite`,
              }}
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: 'white',
                }}
              />
            </Box>
          )}
        </Box>

        {/* Name and Title */}
        <Stack spacing={0.5} sx={{ alignItems: 'center', textAlign: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            Kai
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: '0.8125rem',
            }}
          >
            Your privacy analyst
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontSize: '0.75rem',
              mt: 0.5,
            }}
          >
            Guiding you through PDPL compliance
          </Typography>
        </Stack>

        {/* Conversation Transcript */}
        {isActive && (
          <Box
            sx={{
              width: '100%',
              mt: 4,
              maxHeight: '400px',
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'divider',
                borderRadius: '2px',
              },
            }}
          >
            <Stack spacing={2}>
              {transcript.map((message, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: message.role === 'kai' 
                      ? 'rgba(25, 118, 210, 0.05)' 
                      : 'rgba(0, 0, 0, 0.02)',
                    border: '1px solid',
                    borderColor: message.role === 'kai' 
                      ? 'rgba(25, 118, 210, 0.1)' 
                      : 'divider',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 600,
                      mb: 0.5,
                      display: 'block',
                    }}
                  >
                    {message.role === 'kai' ? 'Kai' : 'You'}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.primary',
                      fontSize: '0.8125rem',
                      lineHeight: 1.6,
                    }}
                  >
                    {message.text}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        )}
      </Stack>
    </Box>
  );
}

