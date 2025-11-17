'use client'

import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/x-charts/themeAugmentation';
import type {} from '@mui/x-data-grid/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './AppNavbar';
import SideMenu from './SideMenu';
import AppTheme from './AppTheme';
import { KaiProvider } from './KaiContext';
import KaiPanel from './KaiPanel';
import KaiTriggerButton from './KaiTriggerButton';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
  feedbackCustomizations,
} from '@/components/dashboard/theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
  ...feedbackCustomizations,
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  disableCustomTheme?: boolean;
}

export default function DashboardLayout({
  children,
  disableCustomTheme,
}: DashboardLayoutProps) {
  return (
    <KaiProvider>
      <AppTheme disableCustomTheme={disableCustomTheme} themeComponents={xThemeComponents}>
        <CssBaseline enableColorScheme />
        <Box
          sx={{
            display: 'flex',
            minHeight: '100vh',
            width: '100%',
            maxWidth: '100vw',
            overflow: 'hidden',
          }}
        >
          <SideMenu />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              minWidth: 0,
              overflow: 'hidden',
            }}
          >
            <AppNavbar />
            {/* Main content */}
            <Box
              component="main"
              sx={(theme) => ({
                flexGrow: 1,
                backgroundColor: theme.vars
                  ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                  : alpha(theme.palette.background.default, 1),
                overflow: 'auto',
                overflowX: 'hidden',
                minWidth: 0,
                width: '100%',
              })}
            >
              <Stack
                spacing={2}
                sx={{
                  alignItems: 'flex-start',
                  px: 3,
                  pb: 5,
                  pt: { xs: 8, md: 0 },
                  width: '100%',
                  maxWidth: '100%',
                  minWidth: 0,
                }}
              >
                {children}
              </Stack>
            </Box>
          </Box>
        </Box>
        {/* Kai Panel */}
        <KaiPanel />
        {/* Kai Trigger Button */}
        <KaiTriggerButton />
      </AppTheme>
    </KaiProvider>
  );
}

