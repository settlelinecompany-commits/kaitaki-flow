'use client'

import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { useKai } from './KaiContext';

const suggestedPrompts = [
  'Summarize this assessment',
  'Explain PDPL Article 30',
  'Generate mitigation steps',
  'Draft a ROPA entry for HR onboarding',
];

export default function KaiPanel() {
  const { isOpen, closePanel, messages, addMessage } = useKai();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      addMessage('user', inputValue.trim());
      setInputValue('');
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    addMessage('user', prompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={closePanel}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 420 },
          maxWidth: '100%',
        },
      }}
      ModalProps={{
        keepMounted: false,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          backgroundColor: 'background.paper',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 3,
            py: 3.5,
            borderBottom: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '18px' }}>
            Kai
          </Typography>
          <IconButton onClick={closePanel} size="small" sx={{ color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Suggested Prompts - Only show when chat is empty */}
        {messages.length === 0 && (
          <Box
            sx={{
              px: 3,
              py: 3,
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'text.secondary', 
                fontSize: '12px', 
                fontWeight: 500,
                mb: 2.5, 
                display: 'block',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Suggested Prompts
            </Typography>
            <Stack direction="column" spacing={1.5}>
              {suggestedPrompts.map((prompt, index) => (
                <Box
                  key={index}
                  onClick={() => handleSuggestedPrompt(prompt)}
                  sx={{
                    px: 2.5,
                    py: 1.75,
                    borderRadius: 2,
                    backgroundColor: 'grey.50',
                    border: '1px solid',
                    borderColor: 'divider',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '14px',
                      color: 'text.primary',
                      fontWeight: 400,
                    }}
                  >
                    {prompt}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        )}

        {/* Chat History */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            px: 3,
            py: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          {messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: message.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <Box
                sx={{
                  maxWidth: '85%',
                  px: 2.5,
                  py: 2,
                  borderRadius: '12px',
                  backgroundColor: message.role === 'user' ? 'primary.main' : 'grey.100',
                  color: message.role === 'user' ? 'primary.contrastText' : 'text.primary',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '14px',
                    lineHeight: '22px',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {message.content}
                </Typography>
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>

        {/* Message Input */}
        <Box
          sx={{
            px: 3,
            py: 3,
            pt: 4,
            borderTop: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.paper',
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="flex-end">
            <TextField
              fullWidth
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              multiline
              maxRows={4}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontSize: '14px',
                  py: 1.5,
                  px: 2,
                  borderRadius: 2,
                  backgroundColor: 'grey.50',
                  '&:hover': {
                    backgroundColor: 'background.paper',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'background.paper',
                  },
                },
              }}
            />
            <IconButton
              color="primary"
              onClick={handleSend}
              disabled={!inputValue.trim()}
              sx={{
                alignSelf: 'flex-end',
                mb: 0.5,
                width: 40,
                height: 40,
              }}
            >
              <SendIcon />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
}


