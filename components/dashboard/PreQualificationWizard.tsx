'use client'

import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stepper,
  Step,
  StepLabel,
  Stack,
  Typography,
  Paper,
} from '@mui/material';
import AppTheme from './AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import { WizardData, setWizardCompleted } from './utils/wizardState';
import WizardStepOrganization from './wizard/WizardStepOrganization';
import WizardStepRoles from './wizard/WizardStepRoles';
import WizardStepDataTypes from './wizard/WizardStepDataTypes';
import WizardStepProcessing from './wizard/WizardStepProcessing';
import WizardStepVendors from './wizard/WizardStepVendors';
import WizardStepSystems from './wizard/WizardStepSystems';
import WizardStepSummary from './wizard/WizardStepSummary';

const steps = [
  'Organization',
  'Roles',
  'Data Types',
  'Processing Activities',
  'Vendors & Transfers',
  'Systems in Use',
  'Summary',
];

interface PreQualificationWizardProps {
  onComplete: () => void;
}

export default function PreQualificationWizard({ onComplete }: PreQualificationWizardProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [wizardData, setWizardData] = useState<Partial<WizardData>>({
    organization: {
      companyName: '',
      location: '',
      industry: '',
      size: '',
    },
    roles: {
      controllerProcessor: '',
      operatingUnits: [],
    },
    dataTypes: [],
    processingActivities: [],
    vendors: {
      useVendors: '',
      transferOutsideKSA: '',
      transferCountries: [],
    },
    systems: [],
  });

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Final step - generate assessment
      handleComplete();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleComplete = () => {
    // Save wizard data
    setWizardCompleted(wizardData as WizardData);
    // Trigger completion callback
    onComplete();
  };

  const updateWizardData = (stepData: Partial<WizardData>) => {
    setWizardData((prev) => ({ ...prev, ...stepData }));
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <WizardStepOrganization
            data={wizardData.organization}
            onUpdate={(data) => updateWizardData({ organization: data })}
          />
        );
      case 1:
        return (
          <WizardStepRoles
            data={wizardData.roles}
            onUpdate={(data) => updateWizardData({ roles: data })}
          />
        );
      case 2:
        return (
          <WizardStepDataTypes
            data={wizardData.dataTypes || []}
            onUpdate={(data) => updateWizardData({ dataTypes: data })}
          />
        );
      case 3:
        return (
          <WizardStepProcessing
            data={wizardData.processingActivities || []}
            onUpdate={(data) => updateWizardData({ processingActivities: data })}
          />
        );
      case 4:
        return (
          <WizardStepVendors
            data={wizardData.vendors}
            onUpdate={(data) => updateWizardData({ vendors: data })}
          />
        );
      case 5:
        return (
          <WizardStepSystems
            data={wizardData.systems || []}
            onUpdate={(data) => updateWizardData({ systems: data })}
          />
        );
      case 6:
        return (
          <WizardStepSummary
            data={wizardData as WizardData}
            onComplete={handleComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Container maxWidth="lg" sx={{ py: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Stack spacing={4} sx={{ flexGrow: 1 }}>
            {/* Header */}
            <Box>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
                Pre-Qualification Wizard
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Complete the following steps to generate your Privacy Assessment
              </Typography>
            </Box>

            {/* Stepper */}
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Paper>

            {/* Step Content */}
            <Card variant="outlined" sx={{ flexGrow: 1 }}>
              <CardContent sx={{ p: 4 }}>
                {renderStepContent()}
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            {activeStep < steps.length - 1 && (
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  sx={{ minWidth: 120 }}
                >
                  Next
                </Button>
              </Stack>
            )}
          </Stack>
        </Container>
      </Box>
    </AppTheme>
  );
}

