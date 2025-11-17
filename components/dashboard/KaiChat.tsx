'use client'

import { Box, Stack, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import KaiMessage from './KaiMessage';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface KaiChatProps {
  messages: ChatMessage[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  userInitials?: string;
}

export default function KaiChat({
  messages,
  inputValue,
  onInputChange,
  onSend,
  userInitials = 'U',
}: KaiChatProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 300px)',
        maxHeight: '800px',
      }}
    >
      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          py: 2,
        }}
      >
        {messages.map((message) => (
          <KaiMessage
            key={message.id}
            role={message.role}
            content={message.content}
            userInitials={userInitials}
          />
        ))}
      </Box>

      {/* Input Bar */}
      <Box
        sx={{
          px: 2,
          pb: 2,
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'flex-end',
            backgroundColor: 'white',
            borderRadius: 4,
            border: '1px solid #E5E5E5',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
            px: 2,
            py: 1.5,
          }}
        >
          <TextField
            fullWidth
            placeholder="Ask Kai anything…"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
            multiline
            maxRows={6}
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '0.9375rem',
                py: 0.5,
              },
            }}
          />
          <IconButton
            onClick={onSend}
            disabled={!inputValue.trim()}
            sx={{
              color: 'primary.main',
              mb: 0.5,
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}

