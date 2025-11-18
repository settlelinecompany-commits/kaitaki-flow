'use client'

import { Box, Stack, Typography, TextField, Button, Chip, Card, CardContent } from '@mui/material';
import { useRouter } from 'next/navigation';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

interface RefinementModeProps {
  onFinalize: () => void;
}

const mockControls = [
  {
    id: 'PP-1',
    question: 'Do you collect personal data only for specified, explicit, and lawful purposes?',
    userAnswer: 'Yes, we collect email addresses and names during registration for account creation.',
    completeness: 85,
    status: 'partial',
    kaiFeedback: {
      missing: 'Consider specifying the exact purposes in your privacy policy.',
      suggestion: 'Add a clear statement: "We collect email addresses and names solely for account creation and user authentication purposes."',
    },
  },
  {
    id: 'DSR-1',
    question: 'Do you inform data subjects of their rights under PDPL?',
    userAnswer: 'Yes, we have a privacy policy.',
    completeness: 45,
    status: 'missing',
    kaiFeedback: {
      missing: 'Your answer is too vague. PDPL requires specific information about data subject rights.',
      suggestion: 'Specify which rights you inform users about: access, rectification, erasure, restriction, data portability, and objection. Include this in your privacy policy and provide contact information for exercising these rights.',
    },
  },
  {
    id: 'SEC-1',
    question: 'Do you apply appropriate technical and organizational measures to protect personal data?',
    userAnswer: 'Yes, we use encryption and access controls. Our systems are regularly updated and monitored.',
    completeness: 95,
    status: 'complete',
    kaiFeedback: {
      missing: null,
      suggestion: 'Excellent! Consider documenting specific encryption standards (e.g., AES-256) and access control procedures in your security policy.',
    },
  },
];

export default function RefinementMode({ onFinalize }: RefinementModeProps) {
  const router = useRouter();

  const handleAddToRiskRegister = () => {
    router.push('/voice-assessment/risk-libraries');
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        px: 6,
        py: 4,
        overflow: 'auto',
        width: '100%',
        minWidth: 0,
      }}
    >
      <Stack spacing={4}>
        {/* Header */}
        <Stack spacing={1}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            Review & Refine Your Answers
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
            }}
          >
            Review your responses and improve completeness based on Kai's feedback.
          </Typography>
        </Stack>

        {/* Controls List */}
        <Stack spacing={3}>
          {mockControls.map((control) => (
            <Card
              key={control.id}
              variant="outlined"
              sx={{
                borderRadius: 3,
                borderColor: control.status === 'complete' 
                  ? 'success.light' 
                  : control.status === 'partial'
                  ? 'warning.light'
                  : 'error.light',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Stack spacing={3}>
                  {/* Control Header */}
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Stack spacing={1} sx={{ flex: 1 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip
                          label={control.id}
                          size="small"
                          sx={{
                            backgroundColor: 'primary.light',
                            color: 'primary.main',
                            fontWeight: 600,
                          }}
                        />
                        <Chip
                          icon={control.status === 'complete' ? <CheckCircleIcon /> : <WarningIcon />}
                          label={control.status === 'complete' ? 'Complete' : control.status === 'partial' ? 'Partial' : 'Needs Work'}
                          size="small"
                          color={control.status === 'complete' ? 'success' : control.status === 'partial' ? 'warning' : 'error'}
                        />
                        <Chip
                          label={`${control.completeness}% Complete`}
                          size="small"
                          variant="outlined"
                        />
                      </Stack>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          color: 'text.primary',
                          mt: 1,
                        }}
                      >
                        {control.question}
                      </Typography>
                    </Stack>
                  </Stack>

                  {/* Two Column Layout */}
                  <Stack direction="row" spacing={4} sx={{ mt: 2 }}>
                    {/* Left: User Answer */}
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'text.secondary',
                          fontWeight: 600,
                          mb: 1,
                          display: 'block',
                        }}
                      >
                        Your Answer
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={control.userAnswer}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'background.paper',
                          },
                        }}
                      />
                    </Box>

                    {/* Right: Kai Feedback */}
                    <Box sx={{ flex: 1 }}>
                      <Stack spacing={2}>
                        {control.kaiFeedback.missing && (
                          <Box
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              backgroundColor: 'error.light',
                              border: '1px solid',
                              borderColor: 'error.main',
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                color: 'error.dark',
                                fontWeight: 600,
                                mb: 0.5,
                                display: 'block',
                              }}
                            >
                              What's Missing
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'error.dark',
                              }}
                            >
                              {control.kaiFeedback.missing}
                            </Typography>
                          </Box>
                        )}
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            backgroundColor: 'primary.light',
                            border: '1px solid',
                            borderColor: 'primary.main',
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'primary.dark',
                              fontWeight: 600,
                              mb: 0.5,
                              display: 'block',
                            }}
                          >
                            Kai's Suggestion
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'primary.dark',
                            }}
                          >
                            {control.kaiFeedback.suggestion}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Action Buttons */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            pt: 4,
            borderTop: '1px solid',
            borderColor: 'divider',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant="outlined"
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
            }}
          >
            Export PDF
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
            }}
          >
            Save to ROPA
          </Button>
          <Button
            variant="outlined"
            onClick={handleAddToRiskRegister}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
            }}
          >
            Add to Risk Register
          </Button>
          <Button
            variant="contained"
            onClick={onFinalize}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 4,
            }}
          >
            Finalize & Send to DPO for Sign-Off
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

