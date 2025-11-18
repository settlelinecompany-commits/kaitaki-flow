'use client'

import { useRouter } from 'next/navigation';
import { Box, Stack, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';

const mockStats = {
  total: 24,
  high: 6,
  medium: 10,
  low: 8,
};

const mockRiskPoints = [
  { x: 3, y: 4, risk: 'high', label: 'R1' },
  { x: 4, y: 3, risk: 'high', label: 'R2' },
  { x: 2, y: 4, risk: 'high', label: 'R3' },
  { x: 4, y: 2, risk: 'medium', label: 'R4' },
  { x: 3, y: 3, risk: 'medium', label: 'R5' },
  { x: 2, y: 3, risk: 'medium', label: 'R6' },
  { x: 1, y: 3, risk: 'low', label: 'R7' },
  { x: 2, y: 2, risk: 'low', label: 'R8' },
  { x: 1, y: 2, risk: 'very-low', label: 'R9' },
];

export default function RiskResultsPage() {
  const router = useRouter();

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return '#f44336';
      case 'medium':
        return '#ff9800';
      case 'low':
        return '#ffeb3b';
      case 'very-low':
        return '#4caf50';
      default:
        return '#e0e0e0';
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '900px',
        mx: 'auto',
        px: 4,
        py: 6,
      }}
    >
      <Stack spacing={6}>
        {/* Header */}
        <Stack spacing={1}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            Risk Assessment Results
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: '1rem',
            }}
          >
            Based on your voice assessment and selected risk libraries.
          </Typography>
        </Stack>

        {/* Summary Statistics */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 2,
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={1}>
                  <InfoIcon sx={{ color: 'text.secondary', fontSize: 32 }} />
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {mockStats.total}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Total Risks
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 2,
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                borderColor: 'error.light',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={1}>
                  <WarningIcon sx={{ color: 'error.main', fontSize: 32 }} />
                  <Typography variant="h4" sx={{ fontWeight: 600, color: 'error.main' }}>
                    {mockStats.high}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    High Risks
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 2,
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                borderColor: 'warning.light',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={1}>
                  <WarningIcon sx={{ color: 'warning.main', fontSize: 32 }} />
                  <Typography variant="h4" sx={{ fontWeight: 600, color: 'warning.main' }}>
                    {mockStats.medium}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Medium Risks
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 2,
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                borderColor: 'success.light',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={1}>
                  <CheckCircleIcon sx={{ color: 'success.main', fontSize: 32 }} />
                  <Typography variant="h4" sx={{ fontWeight: 600, color: 'success.main' }}>
                    {mockStats.low}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Low Risks
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Risk Matrix */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              mb: 3,
            }}
          >
            Risk Matrix
          </Typography>
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              overflow: 'hidden',
              backgroundColor: 'background.paper',
            }}
          >
            {/* Matrix Grid */}
            <Box sx={{ position: 'relative', p: 3 }}>
              {/* Y-axis labels */}
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 60,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  pr: 2,
                  pt: 2,
                }}
              >
                {[4, 3, 2, 1].map((value) => (
                  <Typography
                    key={value}
                    variant="caption"
                    sx={{
                      fontWeight: 600,
                      color: 'text.secondary',
                    }}
                  >
                    {value}
                  </Typography>
                ))}
              </Box>

              {/* Grid */}
              <Box
                sx={{
                  ml: 8,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 1,
                  minHeight: '300px',
                }}
              >
                {Array.from({ length: 16 }, (_, i) => {
                  const x = (i % 4) + 1;
                  const y = 4 - Math.floor(i / 4);
                  const riskPoint = mockRiskPoints.find((p) => p.x === x && p.y === y);
                  
                  return (
                    <Box
                      key={i}
                      sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '70px',
                        backgroundColor: riskPoint ? getRiskColor(riskPoint.risk) : 'transparent',
                        position: 'relative',
                      }}
                    >
                      {riskPoint && (
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 600,
                            color: riskPoint.risk === 'low' || riskPoint.risk === 'very-low' ? 'text.primary' : 'white',
                          }}
                        >
                          {riskPoint.label}
                        </Typography>
                      )}
                    </Box>
                  );
                })}
              </Box>

              {/* X-axis labels */}
              <Box
                sx={{
                  ml: 8,
                  mt: 1,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 1,
                }}
              >
                {[1, 2, 3, 4].map((value) => (
                  <Typography
                    key={value}
                    variant="caption"
                    sx={{
                      fontWeight: 600,
                      color: 'text.secondary',
                      textAlign: 'center',
                    }}
                  >
                    {value}
                  </Typography>
                ))}
              </Box>

              {/* Axis labels */}
              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  left: 30,
                  top: '50%',
                  transform: 'rotate(-90deg)',
                  transformOrigin: 'center',
                  fontWeight: 600,
                  color: 'text.secondary',
                }}
              >
                Impact
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  ml: 8,
                  mt: 1,
                  textAlign: 'center',
                  fontWeight: 600,
                  color: 'text.secondary',
                  display: 'block',
                }}
              >
                Likelihood
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* CTA */}
        <Box>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={() => router.push('/voice-assessment/risk-details')}
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
            }}
          >
            View Detailed Risks
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

