'use client'

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

interface OrganizationData {
  companyName: string;
  location: string;
  industry: string;
  size: string;
}

interface WizardStepOrganizationProps {
  data: OrganizationData | undefined;
  onUpdate: (data: OrganizationData) => void;
}

const locations = ['KSA', 'UAE', 'EU', 'UK', 'Global'];
const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Retail',
  'Manufacturing',
  'Education',
  'Government',
  'Other',
];
const sizes = ['1-10', '11-50', '51-200', '201-1000', '1000+'];

export default function WizardStepOrganization({
  data,
  onUpdate,
}: WizardStepOrganizationProps) {
  const handleChange = (field: keyof OrganizationData, value: string) => {
    onUpdate({
      ...data,
      [field]: value,
    } as OrganizationData);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h6" component="h2">
        Organization Information
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Tell us about your organization
      </Typography>

      <TextField
        fullWidth
        label="Company Name"
        value={data?.companyName || ''}
        onChange={(e) => handleChange('companyName', e.target.value)}
        required
      />

      <FormControl fullWidth required>
        <InputLabel>Location</InputLabel>
        <Select
          value={data?.location || ''}
          label="Location"
          onChange={(e) => handleChange('location', e.target.value)}
        >
          {locations.map((loc) => (
            <MenuItem key={loc} value={loc}>
              {loc}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth required>
        <InputLabel>Industry</InputLabel>
        <Select
          value={data?.industry || ''}
          label="Industry"
          onChange={(e) => handleChange('industry', e.target.value)}
        >
          {industries.map((ind) => (
            <MenuItem key={ind} value={ind}>
              {ind}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth required>
        <InputLabel>Size</InputLabel>
        <Select
          value={data?.size || ''}
          label="Size"
          onChange={(e) => handleChange('size', e.target.value)}
        >
          {sizes.map((s) => (
            <MenuItem key={s} value={s}>
              {s} employees
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}

