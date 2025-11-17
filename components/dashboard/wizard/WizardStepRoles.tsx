'use client'

import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';

interface RolesData {
  controllerProcessor: string;
  operatingUnits: string[];
}

interface WizardStepRolesProps {
  data: RolesData | undefined;
  onUpdate: (data: RolesData) => void;
}

const operatingUnits = [
  'HR Department',
  'IT Department',
  'Marketing',
  'Sales',
  'Customer Service',
  'Finance',
  'Operations',
];

export default function WizardStepRoles({ data, onUpdate }: WizardStepRolesProps) {
  const handleControllerProcessorChange = (value: string) => {
    onUpdate({
      ...data,
      controllerProcessor: value,
    } as RolesData);
  };

  const handleOperatingUnitToggle = (unit: string) => {
    const current = data?.operatingUnits || [];
    const updated = current.includes(unit)
      ? current.filter((u) => u !== unit)
      : [...current, unit];
    onUpdate({
      ...data,
      operatingUnits: updated,
    } as RolesData);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h6" component="h2">
        Roles & Operating Units
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Define your organization's role in data processing
      </Typography>

      <FormControl fullWidth required>
        <InputLabel>Controller / Processor / Both</InputLabel>
        <Select
          value={data?.controllerProcessor || ''}
          label="Controller / Processor / Both"
          onChange={(e) => handleControllerProcessorChange(e.target.value)}
        >
          <MenuItem value="Controller">Controller</MenuItem>
          <MenuItem value="Processor">Processor</MenuItem>
          <MenuItem value="Both">Both</MenuItem>
        </Select>
      </FormControl>

      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Operating Units (Select all that apply)
        </Typography>
        <FormGroup>
          {operatingUnits.map((unit) => (
            <FormControlLabel
              key={unit}
              control={
                <Checkbox
                  checked={(data?.operatingUnits || []).includes(unit)}
                  onChange={() => handleOperatingUnitToggle(unit)}
                />
              }
              label={unit}
            />
          ))}
        </FormGroup>
      </Box>
    </Stack>
  );
}

