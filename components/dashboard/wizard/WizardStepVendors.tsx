'use client'

import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from '@mui/material';

interface VendorsData {
  useVendors: string;
  transferOutsideKSA: string;
  transferCountries: string[];
}

interface WizardStepVendorsProps {
  data: VendorsData | undefined;
  onUpdate: (data: VendorsData) => void;
}

const exampleCountries = ['USA', 'UK', 'EU', 'India', 'Philippines', 'Other'];

export default function WizardStepVendors({
  data,
  onUpdate,
}: WizardStepVendorsProps) {
  const handleChange = (field: keyof VendorsData, value: string | string[]) => {
    onUpdate({
      ...data,
      [field]: value,
    } as VendorsData);
  };

  const handleCountryToggle = (country: string) => {
    const current = data?.transferCountries || [];
    const updated = current.includes(country)
      ? current.filter((c) => c !== country)
      : [...current, country];
    handleChange('transferCountries', updated);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h6" component="h2">
        Vendors & Transfers
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Information about third-party vendors and data transfers
      </Typography>

      <FormControl component="fieldset">
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Do you use vendors?
        </Typography>
        <RadioGroup
          value={data?.useVendors || ''}
          onChange={(e) => handleChange('useVendors', e.target.value)}
        >
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset">
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Do you transfer data outside KSA?
        </Typography>
        <RadioGroup
          value={data?.transferOutsideKSA || ''}
          onChange={(e) => handleChange('transferOutsideKSA', e.target.value)}
        >
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      {data?.transferOutsideKSA === 'Yes' && (
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Select countries (if applicable)
          </Typography>
          <FormGroup>
            {exampleCountries.map((country) => (
              <FormControlLabel
                key={country}
                control={
                  <Checkbox
                    checked={(data?.transferCountries || []).includes(country)}
                    onChange={() => handleCountryToggle(country)}
                  />
                }
                label={country}
              />
            ))}
          </FormGroup>
        </Box>
      )}
    </Stack>
  );
}

