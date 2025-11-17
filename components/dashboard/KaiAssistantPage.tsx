'use client'

import { useState, useRef, useEffect } from 'react';
import { Box, Stack, Typography, TextField, IconButton, MenuItem, Select, FormControl } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import KaiAvatar from './KaiAvatar';
import KaiPromptButtons from './KaiPromptButtons';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const suggestedPrompts = [
  'Summarize a regulation',
  'Generate a GAP assessment',
  'Draft a ROPA entry',
];

export default function KaiAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [context, setContext] = useState('All');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: inputValue.trim(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setInputValue('');

      // Add placeholder response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: 'I understand your question. This is a placeholder response. Full AI capabilities coming soon.',
          },
        ]);
      }, 500);
    }
  };

  const handlePromptClick = (prompt: string) => {
    // Auto-send the prompt immediately
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
    };
    setMessages((prev) => [...prev, newMessage]);

    // Add placeholder response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'I understand your question. This is a placeholder response. Full AI capabilities coming soon.',
        },
      ]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: { sm: '100%', md: '900px' },
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 200px)',
        py: 4,
      }}
    >
      {!hasMessages ? (
        <>
          {/* Empty State Header */}
          <Stack
            spacing={2}
            alignItems="center"
            sx={{
              mt: 4,
              mb: 4,
              width: '100%',
            }}
          >
            <KaiAvatar size={56} variant="kai" />
            <Stack spacing={0.5} alignItems="center">
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                }}
              >
                Kai Assistant
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                }}
              >
                Your AI privacy and compliance copilot.
              </Typography>
            </Stack>
          </Stack>

          {/* Chat Input Bar - Centered */}
          <Box sx={{ mb: 2, width: '100%', maxWidth: '100%' }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: 'center',
                backgroundColor: 'background.paper',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                px: 2,
                py: 1,
                width: '100%',
              }}
            >
              <TextField
                fullWidth
                placeholder="Start a new chat…"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                variant="standard"
                id="kai-chat-input"
                InputProps={{
                  disableUnderline: true,
                }}
                sx={{
                  '& .MuiInputBase-input': {
                    fontSize: '0.875rem',
                    py: 0.5,
                  },
                }}
              />
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  variant="standard"
                  disableUnderline
                  id="kai-context-select"
                  sx={{
                    fontSize: '0.875rem',
                    '& .MuiSelect-select': {
                      py: 0.5,
                    },
                  }}
                >
                  <MenuItem value="All">Context</MenuItem>
                  <MenuItem value="PDPL">PDPL</MenuItem>
                  <MenuItem value="GDPR">GDPR</MenuItem>
                  <MenuItem value="CCPA">CCPA</MenuItem>
                </Select>
              </FormControl>
              <IconButton
                onClick={handleSend}
                disabled={!inputValue.trim()}
                size="small"
                sx={{
                  color: 'primary.main',
                }}
              >
                <SendIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Box>

          {/* Skill Cards - Horizontal Layout */}
          <Box sx={{ width: '100%', maxWidth: '100%' }}>
            <KaiPromptButtons
              prompts={suggestedPrompts}
              onPromptClick={handlePromptClick}
            />
          </Box>
        </>
      ) : (
        <>
          {/* Chat View */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: 'calc(100vh - 200px)',
              width: '100%',
              position: 'relative',
            }}
          >
            {/* Messages - Scrollable area */}
            <Box
              sx={{
                flex: 1,
                overflow: 'auto',
                py: 2,
                px: 2,
                width: '100%',
                pb: 10, // Add padding at bottom for input
              }}
            >
              {messages.map((message, index) => (
                <Box
                  key={message.id}
                  ref={index === messages.length - 1 ? messagesEndRef : null}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                      my: 2,
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1.5}
                      sx={{
                        alignItems: 'flex-start',
                        maxWidth: '75%',
                      }}
                    >
                      {message.role === 'assistant' && (
                        <KaiAvatar size={28} variant="kai" />
                      )}
                      <Box
                        sx={{
                          px: 2,
                          py: 1.5,
                          borderRadius: 2,
                          backgroundColor: message.role === 'user' ? 'primary.main' : 'background.paper',
                          color: message.role === 'user' ? 'primary.contrastText' : 'text.primary',
                          border: message.role === 'user' ? 'none' : '1px solid',
                          borderColor: message.role === 'user' ? 'transparent' : 'divider',
                          boxShadow: message.role === 'user' ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.05)',
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            lineHeight: 1.6,
                            whiteSpace: 'pre-wrap',
                          }}
                        >
                          {message.content}
                        </Typography>
                      </Box>
                      {message.role === 'user' && (
                        <KaiAvatar size={28} variant="user" initials="U" />
                      )}
                    </Stack>
                  </Box>
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </Box>

            {/* Chat Input - Fixed to bottom */}
            <Box
              sx={{
                position: 'sticky',
                bottom: 0,
                width: '100%',
                backgroundColor: 'background.default',
                borderTop: '1px solid',
                borderColor: 'divider',
                p: 2,
                zIndex: 10,
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: 'flex-end',
                  backgroundColor: 'background.paper',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  px: 2,
                  py: 1.5,
                  width: '100%',
                  maxWidth: '100%',
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Ask Kai anything…"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  multiline
                  maxRows={6}
                  variant="standard"
                  id="kai-chat-input-messages"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '0.875rem',
                      py: 0.5,
                    },
                  }}
                />
                <IconButton
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  size="small"
                  sx={{
                    color: 'primary.main',
                    mb: 0.5,
                  }}
                >
                  <SendIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
