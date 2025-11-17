'use client'

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

interface WizardStepProcessingProps {
  data: string[];
  onUpdate: (data: string[]) => void;
}

const processingActivities = [
  'Marketing',
  'HR data',
  'Payroll',
  'Customer onboarding',
  'Analytics / profiling',
  'Research/statistics',
  'Cross-border activities',
];

export default function WizardStepProcessing({
  data,
  onUpdate,
}: WizardStepProcessingProps) {
  const handleToggle = (activity: string) => {
    const updated = data.includes(activity)
      ? data.filter((a) => a !== activity)
      : [...data, activity];
    onUpdate(updated);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h6" component="h2">
        Processing Activities
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Select all processing activities your organization performs
      </Typography>

      <Grid container spacing={2}>
        {processingActivities.map((activity) => (
          <Grid item xs={12} sm={6} key={activity}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.includes(activity)}
                  onChange={() => handleToggle(activity)}
                />
              }
              label={activity}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

