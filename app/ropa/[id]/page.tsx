'use client'

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ROPADetailPage from '@/components/dashboard/ROPADetailPage';
import { Box, Typography } from '@mui/material';

function ROPADetailContent() {
  const params = useParams();
  const activityId = params?.id as string;

  if (!activityId) {
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

  return (
    <DashboardLayout>
      <ROPADetailPage activityId={activityId} />
    </DashboardLayout>
  );
}

export default function ROPADetail() {
  return (
    <Suspense
      fallback={
        <DashboardLayout>
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              Loading...
            </Typography>
          </Box>
        </DashboardLayout>
      }
    >
      <ROPADetailContent />
    </Suspense>
  );
}

