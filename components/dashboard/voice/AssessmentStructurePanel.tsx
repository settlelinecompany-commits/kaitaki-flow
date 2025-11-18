'use client'

import { useState } from 'react';
import { Box, Stack, Typography, IconButton, Collapse, Chip } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

type FlowState = 'welcome' | 'interview' | 'summary' | 'refinement';

interface AssessmentStructurePanelProps {
  flowState: FlowState;
  currentQuestionIndex: number;
}

const mockSections = [
  { name: 'Data Collection', completed: 8, total: 10 },
  { name: 'Data Subject Rights', completed: 3, total: 8 },
  { name: 'Security Measures', completed: 1, total: 6 },
  { name: 'Data Transfers', completed: 0, total: 5 },
  { name: 'Retention & Deletion', completed: 0, total: 5 },
];

export default function AssessmentStructurePanel({ 
  flowState, 
  currentQuestionIndex 
}: AssessmentStructurePanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (flowState === 'welcome') {
    return null;
  }

  return (
    <Box
      sx={{
        width: isExpanded ? '320px' : '60px',
        height: '100vh',
        backgroundColor: 'white',
        borderLeft: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease',
        position: 'relative',
      }}
    >
      {/* Toggle Button */}
      <IconButton
        onClick={() => setIsExpanded(!isExpanded)}
        sx={{
          position: 'absolute',
          top: 16,
          left: isExpanded ? 16 : 8,
          zIndex: 10,
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        {isExpanded ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>

      {/* Content */}
      <Collapse in={isExpanded} orientation="horizontal">
        <Box sx={{ pt: 8, px: 3, pb: 4, overflow: 'auto', height: '100%' }}>
          <Stack spacing={3}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                mb: 1,
              }}
            >
              Assessment Structure
            </Typography>

            {mockSections.map((section, index) => (
              <Box
                key={index}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: index === 0 ? 'rgba(25, 118, 210, 0.05)' : 'transparent',
                  border: '1px solid',
                  borderColor: index === 0 ? 'rgba(25, 118, 210, 0.2)' : 'divider',
                }}
              >
                <Stack spacing={1.5}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: 'text.primary',
                      }}
                    >
                      {section.name}
                    </Typography>
                    {section.completed === section.total ? (
                      <CheckCircleIcon sx={{ fontSize: 18, color: 'success.main' }} />
                    ) : (
                      <RadioButtonUncheckedIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                    )}
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      label={`${section.completed}/${section.total}`}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.7rem',
                        backgroundColor: section.completed === section.total 
                          ? 'success.light' 
                          : 'action.selected',
                        color: section.completed === section.total 
                          ? 'success.dark' 
                          : 'text.secondary',
                      }}
                    />
                    <Box
                      sx={{
                        flex: 1,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: 'action.selected',
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        sx={{
                          width: `${(section.completed / section.total) * 100}%`,
                          height: '100%',
                          backgroundColor: section.completed === section.total 
                            ? 'success.main' 
                            : 'primary.main',
                          transition: 'width 0.3s ease',
                        }}
                      />
                    </Box>
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
}

