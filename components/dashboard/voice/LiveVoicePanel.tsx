'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Stack, Typography, Button, CircularProgress, LinearProgress } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VoiceWaveform from './VoiceWaveform';
import TypingIndicator from './TypingIndicator';

type FlowState = 'welcome' | 'interview' | 'summary' | 'refinement';

interface LiveVoicePanelProps {
  flowState: FlowState;
  isRecording: boolean;
  setIsRecording: (recording: boolean) => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  onStartInterview: () => void;
  onCompleteInterview: () => void;
  onReviewAnswers: () => void;
}

const mockQuestions = [
  'Let\'s start with your data collection practices. Do you collect personal data directly from individuals?',
  'Great. And do you inform data subjects about how their data will be used?',
  'Do you have a privacy policy that explains your data processing activities?',
  'Are you able to provide data subjects with access to their personal data upon request?',
];

function LiveVoicePanel({
  flowState,
  isRecording,
  setIsRecording,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  onStartInterview,
  onCompleteInterview,
  onReviewAnswers,
}: LiveVoicePanelProps) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [userTranscript, setUserTranscript] = useState('');
  const [kaiCaption, setKaiCaption] = useState('');

  const handleAddToRiskRegister = () => {
    router.push('/voice-assessment/risk-libraries');
  };

  const totalQuestions = 34;
  const completedQuestions = 12;

  const handleStartRecording = () => {
    setIsRecording(true);
    setUserTranscript('');
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setUserTranscript('Yes, we collect email addresses and names during registration.');
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < mockQuestions.length) {
        // Move to next question
        setCurrentQuestionIndex(nextIndex);
        setKaiCaption(mockQuestions[nextIndex]);
      } else {
        // Interview complete - navigate to review page
        console.log('Interview complete, navigating to review page...');
        // Show completion message briefly, then navigate
        setKaiCaption('Thank you! Your interview is complete. Redirecting to review page...');
        setTimeout(() => {
          router.push('/voice-assessment/review');
        }, 1500);
      }
    }, 2000);
  };

  const handleStartInterview = () => {
    onStartInterview();
    setCurrentQuestion(mockQuestions[0]);
    setKaiCaption(mockQuestions[0]);
  };

  if (flowState === 'welcome') {
    return (
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: 6,
          py: 8,
        }}
      >
        <Stack spacing={4} sx={{ alignItems: 'center', maxWidth: '600px', textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              fontSize: '2rem',
            }}
          >
            Hi, I'm Kai
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              color: 'text.secondary',
              fontSize: '1.125rem',
              lineHeight: 1.7,
            }}
          >
            I'll guide you through your PDPL voice assessment. We'll have a natural conversation about your data practices, and I'll help ensure we cover everything needed for compliance.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleStartInterview}
            startIcon={<PlayArrowIcon />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
              '&:hover': {
                boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
              },
            }}
          >
            Begin the Interview
          </Button>
        </Stack>
      </Box>
    );
  }

  if (flowState === 'summary') {
    return (
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: 6,
          py: 8,
        }}
      >
        <Stack spacing={4} sx={{ alignItems: 'center', maxWidth: '700px', textAlign: 'center' }}>
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              backgroundColor: 'primary.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 600,
                color: 'primary.main',
              }}
            >
              72%
            </Typography>
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            Assessment Complete
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: '1rem',
              lineHeight: 1.7,
            }}
          >
            We've covered 24 of 34 controls. Here's your completeness breakdown:
          </Typography>
          <Stack spacing={2} sx={{ width: '100%', mt: 4 }}>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                border: '1px solid',
                borderColor: 'rgba(76, 175, 80, 0.2)',
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Fully Complete
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
                  18 controls
                </Typography>
              </Stack>
            </Box>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: 'rgba(255, 152, 0, 0.1)',
                border: '1px solid',
                borderColor: 'rgba(255, 152, 0, 0.2)',
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Partial
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'warning.main' }}>
                  6 controls
                </Typography>
              </Stack>
            </Box>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                border: '1px solid',
                borderColor: 'rgba(244, 67, 54, 0.2)',
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Missing Information
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'error.main' }}>
                  10 controls
                </Typography>
              </Stack>
            </Box>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={handleAddToRiskRegister}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
              }}
            >
              Add to Risk Register
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push('/voice-assessment/review')}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
              }}
            >
              Review & Improve Answers
            </Button>
          </Stack>
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        px: 6,
        py: 3,
        overflow: 'hidden',
        height: '100%',
      }}
    >
      {/* Header - Compact */}
      <Stack spacing={0.5} sx={{ mb: 2 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            fontSize: '1.25rem',
          }}
        >
          Voice Assessment in Progress
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: '0.875rem',
          }}
        >
          We're collecting details to complete your PDPL evaluation.
        </Typography>
      </Stack>

      {/* Progress Indicator - Compact */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
            {completedQuestions} of {totalQuestions} controls covered
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
            {Math.round((completedQuestions / totalQuestions) * 100)}%
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={(completedQuestions / totalQuestions) * 100}
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            '& .MuiLinearProgress-bar': {
              borderRadius: 3,
            },
          }}
        />
      </Box>

      {/* Captions - Compact */}
      <Stack spacing={2} sx={{ mb: 2, flex: '0 0 auto' }}>
        {kaiCaption && (
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: 'rgba(25, 118, 210, 0.05)',
              border: '1px solid',
              borderColor: 'rgba(25, 118, 210, 0.1)',
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mt: 0.25, fontSize: '0.75rem' }}>
                Kai:
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.5, flex: 1, fontSize: '0.875rem' }}>
                {kaiCaption}
              </Typography>
            </Stack>
          </Box>
        )}

        {isProcessing && (
          <Box sx={{ pl: 4 }}>
            <TypingIndicator />
          </Box>
        )}

        {userTranscript && (
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: 'rgba(0, 0, 0, 0.02)',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mt: 0.25, fontSize: '0.75rem' }}>
                You:
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.5, flex: 1, fontSize: '0.875rem' }}>
                {userTranscript}
              </Typography>
            </Stack>
          </Box>
        )}
      </Stack>

      {/* Voice Visualizer - Compact */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 0,
          mb: 2,
        }}
      >
        <VoiceWaveform isActive={isRecording || isProcessing} />
      </Box>

      {/* Microphone Button and Actions - Fixed at bottom */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '0 0 auto', pt: 2 }}>
        <Button
          variant={isRecording ? 'contained' : 'outlined'}
          color={isRecording ? 'error' : 'primary'}
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          disabled={isProcessing}
          sx={{
            width: 70,
            height: 70,
            borderRadius: '50%',
            minWidth: 70,
            mb: 2,
            boxShadow: isRecording 
              ? '0 0 0 8px rgba(244, 67, 54, 0.2)' 
              : '0 4px 12px rgba(0, 0, 0, 0.1)',
            animation: isRecording ? 'pulse 2s ease-in-out infinite' : 'none',
            '@keyframes pulse': {
              '0%, 100%': {
                boxShadow: '0 0 0 8px rgba(244, 67, 54, 0.2)',
              },
              '50%': {
                boxShadow: '0 0 0 16px rgba(244, 67, 54, 0)',
              },
            },
          }}
        >
          {isRecording ? (
            <MicOffIcon sx={{ fontSize: 28 }} />
          ) : (
            <MicIcon sx={{ fontSize: 28 }} />
          )}
        </Button>
        
        {/* Proceed to Risk Assessment Button */}
        <Button
          variant="outlined"
          size="small"
          onClick={handleAddToRiskRegister}
          sx={{
            px: 2.5,
            py: 0.75,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '0.8125rem',
            fontWeight: 500,
            borderColor: 'primary.main',
            color: 'primary.main',
            '&:hover': {
              borderColor: 'primary.dark',
              backgroundColor: 'primary.light',
            },
          }}
        >
          Proceed to Risk Assessment
        </Button>
      </Box>
    </Box>
  );
}

export default LiveVoicePanel;

