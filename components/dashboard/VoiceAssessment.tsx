'use client'

import { useState } from 'react';
import { Box } from '@mui/material';
import AgentPersonaPanel from './voice/AgentPersonaPanel';
import LiveVoicePanel from './voice/LiveVoicePanel';
import AssessmentStructurePanel from './voice/AssessmentStructurePanel';
import RefinementMode from './voice/RefinementMode';

type FlowState = 'welcome' | 'interview' | 'summary' | 'refinement';

export default function VoiceAssessment() {
  const [flowState, setFlowState] = useState<FlowState>('welcome');
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleStartInterview = () => {
    setFlowState('interview');
  };

  const handleCompleteInterview = () => {
    setFlowState('summary');
  };

  const handleReviewAnswers = () => {
    setFlowState('refinement');
  };

  const handleFinalize = () => {
    // Handle finalization
    console.log('Finalized assessment');
  };

  // In refinement mode, show different layout
  if (flowState === 'refinement') {
    return (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          marginLeft: '-24px',
          marginRight: '-24px',
          marginTop: '-24px',
          padding: 0,
          display: 'flex',
          backgroundColor: '#FAFAFA',
          overflow: 'hidden',
        }}
      >
        {/* Left Panel - Agent Persona */}
        <AgentPersonaPanel 
          flowState={flowState}
          isRecording={false}
        />

        {/* Center Panel - Refinement Mode */}
        <RefinementMode onFinalize={handleFinalize} />

        {/* Right Panel - Assessment Structure */}
        <AssessmentStructurePanel 
          flowState={flowState}
          currentQuestionIndex={currentQuestionIndex}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        marginLeft: '-24px',
        marginRight: '-24px',
        marginTop: '-24px',
        padding: 0,
        display: 'flex',
        backgroundColor: '#FAFAFA',
        overflow: 'hidden',
      }}
    >
      {/* Left Panel - Agent Persona */}
      <AgentPersonaPanel 
        flowState={flowState}
        isRecording={isRecording}
      />

      {/* Center Panel - Live Voice Interaction */}
      <LiveVoicePanel
        flowState={flowState}
        isRecording={isRecording}
        setIsRecording={setIsRecording}
        currentQuestionIndex={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        onStartInterview={handleStartInterview}
        onCompleteInterview={handleCompleteInterview}
        onReviewAnswers={handleReviewAnswers}
      />

      {/* Right Panel - Assessment Structure */}
      <AssessmentStructurePanel 
        flowState={flowState}
        currentQuestionIndex={currentQuestionIndex}
      />
    </Box>
  );
}

