import DashboardLayout from '@/components/dashboard/DashboardLayout';
import KaiAssistantPage from '@/components/dashboard/KaiAssistantPage';
import { Box } from '@mui/material';

export default function Kai() {
  return (
    <DashboardLayout>
      <Box
        sx={{
          width: '100%',
          marginLeft: '-24px', // Override DashboardLayout's px:3
          marginRight: '-24px', // Override DashboardLayout's px:3
          padding: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <KaiAssistantPage />
      </Box>
    </DashboardLayout>
  );
}

