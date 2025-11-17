'use client'

import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { WizardData } from '../utils/wizardState';

interface WizardStepSummaryProps {
  data: WizardData;
  onComplete: () => void;
}

export default function WizardStepSummary({
  data,
  onComplete,
}: WizardStepSummaryProps) {
  return (
    <Stack spacing={3}>
      <Typography variant="h6" component="h2">
        Summary
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Review your information before generating the GAP Assessment
      </Typography>

      <Stack spacing={2}>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Organization
          </Typography>
          <Typography variant="body2">Company: {data.organization?.companyName || 'N/A'}</Typography>
          <Typography variant="body2">Location: {data.organization?.location || 'N/A'}</Typography>
          <Typography variant="body2">Industry: {data.organization?.industry || 'N/A'}</Typography>
          <Typography variant="body2">Size: {data.organization?.size || 'N/A'}</Typography>
        </Box>

        <Divider />

        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Roles
          </Typography>
          <Typography variant="body2">
            Controller/Processor: {data.roles?.controllerProcessor || 'N/A'}
          </Typography>
          <Typography variant="body2">
            Operating Units: {data.roles?.operatingUnits?.join(', ') || 'None'}
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Data Types
          </Typography>
          <Typography variant="body2">
            {data.dataTypes?.length ? data.dataTypes.join(', ') : 'None selected'}
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Processing Activities
          </Typography>
          <Typography variant="body2">
            {data.processingActivities?.length
              ? data.processingActivities.join(', ')
              : 'None selected'}
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Vendors & Transfers
          </Typography>
          <Typography variant="body2">Use Vendors: {data.vendors?.useVendors || 'N/A'}</Typography>
          <Typography variant="body2">
            Transfer Outside KSA: {data.vendors?.transferOutsideKSA || 'N/A'}
          </Typography>
          {data.vendors?.transferCountries?.length ? (
            <Typography variant="body2">
              Countries: {data.vendors.transferCountries.join(', ')}
            </Typography>
          ) : null}
        </Box>

        <Divider />

        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Systems
          </Typography>
          <Typography variant="body2">
            {data.systems?.length ? data.systems.join(', ') : 'None selected'}
          </Typography>
        </Box>
      </Stack>

      <Box sx={{ pt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={onComplete}
          sx={{ py: 1.5 }}
        >
          Generate GAP Assessment
        </Button>
      </Box>
    </Stack>
  );
}

