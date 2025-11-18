'use client'

import { useParams, useRouter } from 'next/navigation';
import { Box, Stack, Typography, Chip, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const mockLibraryData: { [key: string]: any } = {
  'core-1': {
    title: 'Data Protection Risks',
    category: 'Core',
    description: 'Comprehensive library covering fundamental data protection risks including unauthorized access, data loss, and privacy breaches. This library includes risks related to data processing activities, storage security, and compliance with core data protection principles.',
    risks: [
      {
        id: 'R1',
        risk: 'Unauthorized Access to Personal Data',
        description: 'Risk of unauthorized individuals accessing personal data due to insufficient access controls or security vulnerabilities.',
        likelihood: 'Medium',
        impact: 'High',
      },
      {
        id: 'R2',
        risk: 'Data Loss or Corruption',
        description: 'Risk of permanent data loss or corruption due to system failures, human error, or malicious activity.',
        likelihood: 'Low',
        impact: 'High',
      },
      {
        id: 'R3',
        risk: 'Insufficient Data Minimization',
        description: 'Risk of collecting or processing more personal data than necessary for the stated purpose.',
        likelihood: 'Medium',
        impact: 'Medium',
      },
      {
        id: 'R4',
        risk: 'Inadequate Data Retention Policies',
        description: 'Risk of retaining personal data longer than necessary without clear retention schedules or deletion procedures.',
        likelihood: 'High',
        impact: 'Medium',
      },
    ],
  },
  'dpia-1': {
    title: 'High-Risk Processing Library',
    category: 'DPIA',
    description: 'Risks specific to high-risk processing activities that require Data Protection Impact Assessments under PDPL and GDPR. This library focuses on processing activities that pose significant risks to individuals\' rights and freedoms.',
    risks: [
      {
        id: 'R1',
        risk: 'Systematic and Extensive Profiling',
        description: 'Risk of automated processing that evaluates personal aspects relating to individuals, particularly for decision-making purposes.',
        likelihood: 'Medium',
        impact: 'High',
      },
      {
        id: 'R2',
        risk: 'Large-Scale Processing of Special Categories',
        description: 'Risk of processing special categories of personal data on a large scale without adequate safeguards.',
        likelihood: 'Low',
        impact: 'Very High',
      },
    ],
  },
};

const getDefaultLibrary = (id: string) => ({
  title: 'Risk Library',
  category: 'Core',
  description: 'This risk library contains various risks related to data protection and privacy compliance.',
  risks: [
    {
      id: 'R1',
      risk: 'Sample Risk',
      description: 'This is a sample risk entry. Detailed risk information will be available here.',
      likelihood: 'Medium',
      impact: 'Medium',
    },
  ],
});

export default function RiskLibraryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const libraryId = params?.id as string;
  
  const library = mockLibraryData[libraryId] || getDefaultLibrary(libraryId);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Core':
        return 'primary';
      case 'DPIA':
        return 'error';
      case 'LIA':
        return 'warning';
      case 'TIA':
        return 'info';
      case 'Internal':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1000px',
        mx: 'auto',
        px: 4,
        py: 6,
      }}
    >
      <Stack spacing={4}>
        {/* Header */}
        <Stack spacing={2}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push('/risks/libraries')}
            sx={{
              alignSelf: 'flex-start',
              textTransform: 'none',
            }}
          >
            Back to Risk Libraries
          </Button>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
              }}
            >
              {library.title}
            </Typography>
            <Chip
              label={library.category}
              color={getCategoryColor(library.category) as any}
              sx={{
                height: 28,
              }}
            />
          </Stack>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: '1rem',
              lineHeight: 1.7,
            }}
          >
            {library.description}
          </Typography>
        </Stack>

        {/* Risk Entries Table */}
        <Card variant="outlined" sx={{ borderRadius: 2 }}>
          <CardContent sx={{ p: 0 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'action.hover' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Risk ID</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Risk</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Likelihood</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Impact</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {library.risks.map((risk: any) => (
                    <TableRow key={risk.id} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {risk.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {risk.risk}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {risk.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={risk.likelihood}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={risk.impact}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

