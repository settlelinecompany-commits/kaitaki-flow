'use client'

import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/x-charts/themeAugmentation';
import type {} from '@mui/x-data-grid/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import AppNavbar from './AppNavbar';
import Header from './Header';
import MainGrid from './MainGrid';
import SideMenu from './SideMenu';
import AppTheme from './AppTheme';
import WelcomeScreen from './WelcomeScreen';
import PreQualificationWizard from './PreQualificationWizard';
import { KaiProvider } from './KaiContext';
import KaiPanel from './KaiPanel';
import KaiTriggerButton from './KaiTriggerButton';
import { isWizardCompleted, resetWizard } from './utils/wizardState';
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

export default function Dashboard(props: { disableCustomTheme?: boolean }) {
  const [wizardCompleted, setWizardCompleted] = useState<boolean | null>(null);
  const [showWizard, setShowWizard] = useState(false);

  useEffect(() => {
    // Check wizard completion status on mount
    setWizardCompleted(isWizardCompleted());
    
    // Check for reset parameter in URL
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('resetWizard') === 'true') {
        resetWizard();
        setWizardCompleted(false);
        setShowWizard(true);
        // Clean up URL
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  }, []);

  const handleStartWizard = () => {
    setShowWizard(true);
  };

  const handleWizardComplete = () => {
    // Wizard completion is saved in localStorage by setWizardCompleted
    // Update state to show dashboard
    setWizardCompleted(true);
    setShowWizard(false);
  };

  // Show loading state while checking
  if (wizardCompleted === null) {
    return null;
  }

  // Show welcome screen if wizard not started
  if (!wizardCompleted && !showWizard) {
    return <WelcomeScreen onStart={handleStartWizard} />;
  }

  // Show wizard if not completed and started
  if (!wizardCompleted && showWizard) {
    return <PreQualificationWizard onComplete={handleWizardComplete} />;
  }

  // Show dashboard with sidebar if wizard completed
  return (
    <KaiProvider>
      <AppTheme {...props} themeComponents={xThemeComponents}>
        <CssBaseline enableColorScheme />
        <Box 
          sx={{ 
            display: 'flex',
            minHeight: '100vh',
            width: '100%',
            maxWidth: '100vw',
            overflow: 'hidden',
            backgroundColor: '#F8F9FA', // --bg
          }}
        >
          <SideMenu />
          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0, overflow: 'hidden' }}>
            <AppNavbar />
            {/* Main content */}
            <Box
              component="main"
                sx={(theme) => ({
                  flexGrow: 1,
                  backgroundColor: '#F8F9FA', // --bg
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
                <Header />
                <MainGrid />
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
