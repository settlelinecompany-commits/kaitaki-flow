'use client'

import { Suspense } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import GAPAssessmentDetail from '@/components/dashboard/GAPAssessmentDetail';
import PolicySelectionScreen from '@/components/dashboard/PolicySelectionScreen';
import { Box, Typography, Stack } from '@mui/material';

function AssessmentDetailContent() {
  const searchParams = useSearchParams();
  const params = useParams();
  const autoFill = searchParams?.get('autoFill') === 'true';
  const assessmentId = params?.id as string;

  if (!assessmentId) {
    return (
      <DashboardLayout>
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            Loading...
          </Typography>
        </Box>
      </DashboardLayout>
    );
  }

  // Show GAP Assessment Detail for gap-initial
  if (assessmentId === 'gap-initial') {
    // Show policy selection screen first, unless autoFill is true
    if (!autoFill) {
      return (
        <DashboardLayout>
          <PolicySelectionScreen />
        </DashboardLayout>
      );
    }
    
    return (
      <DashboardLayout>
        <GAPAssessmentDetail />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Stack spacing={3} sx={{ width: '100%' }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 0.5 }}>
            Assessment Detail
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Assessment ID: {assessmentId}
          </Typography>
        </Box>
        <Typography variant="body1">
          Assessment detail page - Coming soon
        </Typography>
      </Stack>
    </DashboardLayout>
  );
}

function AssessmentDetail() {
  return (
    <Suspense fallback={
      <DashboardLayout>
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            Loading...
          </Typography>
        </Box>
      </DashboardLayout>
    }>
      <AssessmentDetailContent />
    </Suspense>
  );
}

export default AssessmentDetail;

