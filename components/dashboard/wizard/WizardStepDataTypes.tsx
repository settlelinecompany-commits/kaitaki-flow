'use client'

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from '@mui/material';

interface WizardStepDataTypesProps {
  data: string[];
  onUpdate: (data: string[]) => void;
}

const dataTypes = [
  'Personal data',
  'Sensitive data',
  'Health data',
  'Credit data',
  "Minors' data",
  'CCTV / biometrics',
  'Behavioral / analytics data',
];

export default function WizardStepDataTypes({
  data,
  onUpdate,
}: WizardStepDataTypesProps) {
  const handleToggle = (type: string) => {
    const updated = data.includes(type)
      ? data.filter((t) => t !== type)
      : [...data, type];
    onUpdate(updated);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h6" component="h2">
        Data Types
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Select all data types your organization processes
      </Typography>

      <FormGroup>
        {dataTypes.map((type) => (
          <FormControlLabel
            key={type}
            control={
              <Checkbox
                checked={data.includes(type)}
                onChange={() => handleToggle(type)}
              />
            }
            label={type}
          />
        ))}
      </FormGroup>
    </Stack>
  );
}

