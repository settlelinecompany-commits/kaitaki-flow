'use client'

import { Box, Stack, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Card, CardContent } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const mockRisks = [
  {
    id: 'R1',
    risk: 'Unauthorized Access to Personal Data',
    description: 'Risk of unauthorized individuals accessing personal data due to insufficient access controls.',
    likelihood: 3,
    impact: 4,
    score: 12,
    regulation: 'PDPL Article 20',
    mitigation: 'Implement multi-factor authentication and role-based access controls. Conduct regular access reviews.',
    owner: 'Security Team',
    status: 'In Progress',
  },
  {
    id: 'R2',
    risk: 'Data Breach During Cross-Border Transfer',
    description: 'Personal data transferred to countries without adequate protection may be subject to unauthorized access.',
    likelihood: 4,
    impact: 3,
    score: 12,
    regulation: 'PDPL Article 28',
    mitigation: 'Implement Standard Contractual Clauses (SCCs) and supplementary measures. Conduct Transfer Impact Assessments.',
    owner: 'Legal Team',
    status: 'Not Started',
  },
  {
    id: 'R3',
    risk: 'Insufficient Data Subject Rights Implementation',
    description: 'Lack of clear processes for handling data subject access, rectification, and erasure requests.',
    likelihood: 2,
    impact: 4,
    score: 8,
    regulation: 'PDPL Article 12',
    mitigation: 'Establish clear procedures and workflows for handling data subject requests. Train staff on rights handling.',
    owner: 'Privacy Office',
    status: 'In Progress',
  },
  {
    id: 'R4',
    risk: 'Inadequate Data Retention Policies',
    description: 'Personal data retained longer than necessary without clear retention schedules.',
    likelihood: 4,
    impact: 2,
    score: 8,
    regulation: 'PDPL Article 7',
    mitigation: 'Develop and implement data retention schedules. Automate deletion workflows where possible.',
    owner: 'Data Governance',
    status: 'Not Started',
  },
  {
    id: 'R5',
    risk: 'Third-Party Vendor Data Processing Risks',
    description: 'Vendors processing personal data may not have adequate security measures or compliance frameworks.',
    likelihood: 3,
    impact: 3,
    score: 9,
    regulation: 'PDPL Article 19',
    mitigation: 'Conduct vendor risk assessments. Include data protection clauses in contracts. Regular vendor audits.',
    owner: 'Procurement',
    status: 'Not Started',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'success';
    case 'In Progress':
      return 'warning';
    default:
      return 'default';
  }
};

const getRiskLevel = (score: number) => {
  if (score >= 12) return { label: 'High', color: 'error' };
  if (score >= 8) return { label: 'Medium', color: 'warning' };
  if (score >= 4) return { label: 'Low', color: 'info' };
  return { label: 'Very Low', color: 'success' };
};

const roadmapItems = {
  immediate: [
    { id: 'R1', title: 'Implement MFA for all systems', risk: 'R1' },
    { id: 'R2', title: 'Review and update access controls', risk: 'R1' },
  ],
  shortTerm: [
    { id: 'R3', title: 'Establish data subject rights procedures', risk: 'R3' },
    { id: 'R4', title: 'Conduct vendor risk assessments', risk: 'R5' },
  ],
  mediumTerm: [
    { id: 'R5', title: 'Implement SCCs for transfers', risk: 'R2' },
    { id: 'R6', title: 'Develop data retention schedules', risk: 'R4' },
  ],
  longTerm: [
    { id: 'R7', title: 'Automate data deletion workflows', risk: 'R4' },
    { id: 'R8', title: 'Establish ongoing vendor audit program', risk: 'R5' },
  ],
};

export default function RiskDetailsPage() {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1400px',
        mx: 'auto',
        px: 4,
        py: 6,
      }}
    >
      <Stack spacing={6}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Stack spacing={1}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
              }}
            >
              Risk Details & Mitigation
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: '1rem',
              }}
            >
              Generated automatically using your assessment responses.
            </Typography>
          </Stack>
          <Button
            variant="outlined"
            startIcon={<PictureAsPdfIcon />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
            }}
          >
            Export Report (PDF)
          </Button>
        </Stack>

        {/* Risks Table */}
        <Box>
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{
              borderRadius: 2,
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'action.hover' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Risk</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Likelihood</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Impact</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Risk Score</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Regulation</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Recommended Mitigation</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Owner</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockRisks.map((risk) => {
                  const riskLevel = getRiskLevel(risk.score);
                  return (
                    <TableRow key={risk.id} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {risk.risk}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: '300px' }}>
                          {risk.description}
                        </Typography>
                      </TableCell>
                      <TableCell>{risk.likelihood}</TableCell>
                      <TableCell>{risk.impact}</TableCell>
                      <TableCell>
                        <Chip
                          label={`${risk.score} - ${riskLevel.label}`}
                          size="small"
                          color={riskLevel.color as any}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                          {risk.regulation}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: '300px' }}>
                          {risk.mitigation}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{risk.owner}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={risk.status}
                          size="small"
                          color={getStatusColor(risk.status) as any}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Mitigation Roadmap */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              mb: 3,
            }}
          >
            Mitigation Roadmap
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
              gap: 3,
            }}
          >
            {/* Immediate */}
            <Card variant="outlined" sx={{ borderRadius: 2 }}>
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'error.main' }}>
                    Immediate (0–7 days)
                  </Typography>
                  <Stack spacing={1.5}>
                    {roadmapItems.immediate.map((item) => (
                      <Box
                        key={item.id}
                        sx={{
                          p: 2,
                          borderRadius: 1,
                          backgroundColor: 'error.light',
                          border: '1px solid',
                          borderColor: 'error.main',
                        }}
                      >
                        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                          {item.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
                          {item.risk}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            {/* Short Term */}
            <Card variant="outlined" sx={{ borderRadius: 2 }}>
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'warning.main' }}>
                    Short Term (30 days)
                  </Typography>
                  <Stack spacing={1.5}>
                    {roadmapItems.shortTerm.map((item) => (
                      <Box
                        key={item.id}
                        sx={{
                          p: 2,
                          borderRadius: 1,
                          backgroundColor: 'warning.light',
                          border: '1px solid',
                          borderColor: 'warning.main',
                        }}
                      >
                        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                          {item.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
                          {item.risk}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            {/* Medium Term */}
            <Card variant="outlined" sx={{ borderRadius: 2 }}>
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'info.main' }}>
                    Medium Term (90 days)
                  </Typography>
                  <Stack spacing={1.5}>
                    {roadmapItems.mediumTerm.map((item) => (
                      <Box
                        key={item.id}
                        sx={{
                          p: 2,
                          borderRadius: 1,
                          backgroundColor: 'info.light',
                          border: '1px solid',
                          borderColor: 'info.main',
                        }}
                      >
                        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                          {item.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
                          {item.risk}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            {/* Long Term */}
            <Card variant="outlined" sx={{ borderRadius: 2 }}>
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'success.main' }}>
                    Long Term (180 days)
                  </Typography>
                  <Stack spacing={1.5}>
                    {roadmapItems.longTerm.map((item) => (
                      <Box
                        key={item.id}
                        sx={{
                          p: 2,
                          borderRadius: 1,
                          backgroundColor: 'success.light',
                          border: '1px solid',
                          borderColor: 'success.main',
                        }}
                      >
                        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                          {item.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
                          {item.risk}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

