import DashboardLayout from '@/components/dashboard/DashboardLayout';
import QuestionnaireReviewPage from '@/components/dashboard/voice/QuestionnaireReviewPage';
import { Box } from '@mui/material';

export default function QuestionnaireReview() {
  return (
    <DashboardLayout>
      <Box
        sx={{
          width: '100%',
          marginLeft: '-24px',
          marginRight: '-24px',
          marginTop: '-24px',
          padding: 0,
          height: 'calc(100vh - 64px)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <QuestionnaireReviewPage />
      </Box>
    </DashboardLayout>
  );
}

