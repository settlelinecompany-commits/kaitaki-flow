'use client'

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from '@mui/material';

interface WizardStepSystemsProps {
  data: string[];
  onUpdate: (data: string[]) => void;
}

const systems = [
  'HRMS',
  'CRM',
  'Website',
  'App',
  'Data Warehouse',
];

export default function WizardStepSystems({
  data,
  onUpdate,
}: WizardStepSystemsProps) {
  const handleToggle = (system: string) => {
    const updated = data.includes(system)
      ? data.filter((s) => s !== system)
      : [...data, system];
    onUpdate(updated);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h6" component="h2">
        Systems in Use (Optional)
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Select all systems your organization uses
      </Typography>

      <FormGroup>
        {systems.map((system) => (
          <FormControlLabel
            key={system}
            control={
              <Checkbox
                checked={data.includes(system)}
                onChange={() => handleToggle(system)}
              />
            }
            label={system}
          />
        ))}
      </FormGroup>
    </Stack>
  );
}

