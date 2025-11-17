'use client'

import { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';

interface Assessment {
  id: string;
  name: string;
  type: string;
  framework: string;
  status: string;
  lastUpdated: string;
  riskLevel: string;
  owner: string;
}

const mockAssessments: Assessment[] = [
  {
    id: 'gap-initial',
    name: 'PDPL GAP Assessment – Initial Setup',
    type: 'GAP',
    framework: 'PDPL',
    status: 'In Progress',
    lastUpdated: 'Today',
    riskLevel: 'Medium',
    owner: 'Privacy Office',
  },
  {
    id: 'dpia-payroll',
    name: 'DPIA – Payroll System',
    type: 'DPIA',
    framework: 'PDPL / ISO 27701',
    status: 'Not Started',
    lastUpdated: '5 days ago',
    riskLevel: 'High',
    owner: 'HR / IT',
  },
  {
    id: 'tia-aws',
    name: 'TIA – AWS Ireland',
    type: 'TIA',
    framework: 'PDPL / GDPR',
    status: 'Completed',
    lastUpdated: '2 weeks ago',
    riskLevel: 'Low',
    owner: 'Security Team',
  },
  {
    id: 'vendor-zoho',
    name: 'Vendor Assessment – Zoho CRM',
    type: 'Vendor',
    framework: 'PDPL / ISO 27001',
    status: 'In Progress',
    lastUpdated: '3 days ago',
    riskLevel: 'Medium',
    owner: 'Procurement',
  },
];

const getStatusColor = (status: string): 'default' | 'primary' | 'success' => {
  switch (status) {
    case 'Completed':
      return 'success';
    case 'In Progress':
      return 'primary';
    default:
      return 'default';
  }
};

const getRiskColor = (risk: string): 'success' | 'warning' | 'error' => {
  switch (risk) {
    case 'Low':
      return 'success';
    case 'Medium':
      return 'warning';
    case 'High':
      return 'error';
    default:
      return 'success';
  }
};

export default function AssessmentsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredAssessments = useMemo(() => {
    return mockAssessments.filter((assessment) => {
      const matchesSearch =
        searchQuery === '' ||
        assessment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assessment.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assessment.owner.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === 'All' || assessment.type === typeFilter;
      const matchesStatus = statusFilter === 'All' || assessment.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchQuery, typeFilter, statusFilter]);

  const handleRowClick = (assessment: Assessment) => {
    if (assessment.type === 'GAP') {
      // Navigate to GAP detail page
      router.push(`/assessments/${assessment.id}`);
    }
    // Other types are non-clickable (no action)
  };

  const summaryStats = useMemo(() => {
    return {
      total: mockAssessments.length,
      inProgress: mockAssessments.filter((a) => a.status === 'In Progress').length,
      notStarted: mockAssessments.filter((a) => a.status === 'Not Started').length,
      completed: mockAssessments.filter((a) => a.status === 'Completed').length,
    };
  }, []);

  return (
    <Stack spacing={3} sx={{ width: '100%', maxWidth: '100%', minWidth: 0 }}>
      {/* Header */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' } }}
      >
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 0.5 }}>
            Assessments
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            View and manage all your GAP, DPIA, TIA, LIA, and vendor assessments in one place.
          </Typography>
        </Box>
        <Button variant="contained" color="primary" sx={{ minWidth: 160 }}>
          New Assessment
        </Button>
      </Stack>

      {/* Summary Strip */}
      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 1.5 }}>
        <Chip
          label={`Total Assessments: ${summaryStats.total}`}
          variant="outlined"
          sx={{ fontWeight: 500 }}
        />
        <Chip
          label={`In Progress: ${summaryStats.inProgress}`}
          color="primary"
          variant="outlined"
          sx={{ fontWeight: 500 }}
        />
        <Chip
          label={`Not Started: ${summaryStats.notStarted}`}
          variant="outlined"
          sx={{ fontWeight: 500 }}
        />
        <Chip
          label={`Completed: ${summaryStats.completed}`}
          color="success"
          variant="outlined"
          sx={{ fontWeight: 500 }}
        />
      </Stack>

      {/* Filters & Search */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ alignItems: { xs: 'stretch', sm: 'center' } }}
      >
        <TextField
          placeholder="Search assessments…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: 200 } }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Type</InputLabel>
          <Select value={typeFilter} label="Type" onChange={(e) => setTypeFilter(e.target.value)}>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="GAP">GAP</MenuItem>
            <MenuItem value="DPIA">DPIA</MenuItem>
            <MenuItem value="TIA">TIA</MenuItem>
            <MenuItem value="Vendor">Vendor</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Not Started">Not Started</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Assessments Table */}
      {filteredAssessments.length === 0 ? (
        <Card variant="outlined">
          <CardContent>
            <Stack spacing={2} alignItems="center" sx={{ py: 6 }}>
              <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                No assessments found
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                {searchQuery || typeFilter !== 'All' || statusFilter !== 'All'
                  ? 'Try adjusting your filters to see more results.'
                  : 'No assessments yet. Start a new assessment to begin your privacy review.'}
              </Typography>
              {!searchQuery && typeFilter === 'All' && statusFilter === 'All' && (
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  New Assessment
                </Button>
              )}
            </Stack>
          </CardContent>
        </Card>
      ) : (
        <Card variant="outlined">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Assessment Name</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    Type
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    Framework
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    Status
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    Risk Level
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    Owner
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Last Updated
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAssessments.map((assessment) => (
                  <TableRow
                    key={assessment.id}
                    onClick={() => handleRowClick(assessment)}
                    sx={{
                      cursor: assessment.type === 'GAP' ? 'pointer' : 'default',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {assessment.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip label={assessment.type} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {assessment.framework}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={assessment.status}
                        size="small"
                        color={getStatusColor(assessment.status)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={assessment.riskLevel}
                        size="small"
                        color={getRiskColor(assessment.riskLevel)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {assessment.owner}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {assessment.lastUpdated}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </Stack>
  );
}

