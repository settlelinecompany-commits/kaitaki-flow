'use client'

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import GAPAssessmentDetail from '@/components/dashboard/GAPAssessmentDetail';
import PolicySelectionScreen from '@/components/dashboard/PolicySelectionScreen';
import { Box, Typography, Stack } from '@mui/material';

function AssessmentDetailContent({ 
  params 
}: { 
  params: Promise<{ id: string }> | { id: string } 
}) {
  const searchParams = useSearchParams();
  const autoFill = searchParams?.get('autoFill') === 'true';
  
  // Handle both Promise and direct params (Next.js 15+ vs older versions)
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = params instanceof Promise ? await params : params;
      setAssessmentId(resolvedParams.id);
    };
    resolveParams();
  }, [params]);

  if (!assessmentId) {
    return null; // Loading state
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

export default function AssessmentDetail({ 
  params 
}: { 
  params: Promise<{ id: string }> | { id: string } 
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AssessmentDetailContent params={params} />
    </Suspense>
  );
}

