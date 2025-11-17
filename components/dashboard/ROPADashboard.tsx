'use client'

import { useMemo } from 'react';
import Grid from '@mui/material/Grid';
import {
  Box,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { mockROPAActivities, mockROPAHealthMetrics, mockReviewTrendData } from './ropaData';

export default function ROPADashboard() {
  const kpiData = useMemo(() => {
    const total = mockROPAActivities.length;
    const needsReview = mockROPAActivities.filter((a) => a.status === 'Needs Review').length;
    const highRisk = mockROPAActivities.filter((a) => a.riskCategory === 'High').length;
    const requiresTIA = mockROPAActivities.filter(
      (a) => a.transferDestinations.length > 0 && a.riskCategory === 'High'
    ).length;
    const completed = mockROPAActivities.filter((a) => a.status === 'Healthy').length;
    const completeness = Math.round((completed / total) * 100);

    return {
      completeness,
      needsReview,
      highRisk,
      requiresTIA,
    };
  }, []);

  const chartData = useMemo(() => {
    return {
      months: mockReviewTrendData.map((d) => d.month),
      reviewed: mockReviewTrendData.map((d) => d.reviewed),
    };
  }, []);

  return (
    <Stack spacing={4} sx={{ pt: 3 }}>
      {/* KPI Cards */}
      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '11px', fontWeight: 500 }}>
                ROPA Completeness
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, mt: 0.5, mb: 1 }}>
                {kpiData.completeness}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={kpiData.completeness}
                sx={{ height: 6, borderRadius: 1 }}
              />
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '10px', mt: 0.5, display: 'block' }}>
                Updated from last review cycle
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '11px', fontWeight: 500 }}>
                Activities Needing Review
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, mt: 0.5 }}>
                {kpiData.needsReview}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '10px', mt: 0.5, display: 'block' }}>
                Updated from last review cycle
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '11px', fontWeight: 500 }}>
                High-Risk Activities
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, mt: 0.5 }}>
                {kpiData.highRisk}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '10px', mt: 0.5, display: 'block' }}>
                Updated from last review cycle
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '11px', fontWeight: 500 }}>
                Transfers Requiring TIA
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, mt: 0.5 }}>
                {kpiData.requiresTIA}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '10px', mt: 0.5, display: 'block' }}>
                Updated from last review cycle
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '11px', fontWeight: 500 }}>
                Next Monthly Review Due
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, mt: 0.5, fontSize: '14px' }}>
                Mar 1, 2024
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '10px', mt: 0.5, display: 'block' }}>
                Updated from last review cycle
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Summary Cards */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined">
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, fontSize: '14px' }}>
                ROPA Health Overview
              </Typography>
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" sx={{ fontSize: '14px' }}>
                    Missing lawful basis
                  </Typography>
                  <Chip label={mockROPAHealthMetrics.missingLawfulBasis} size="small" color="warning" />
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" sx={{ fontSize: '14px' }}>
                    Missing retention
                  </Typography>
                  <Chip label={mockROPAHealthMetrics.missingRetention} size="small" color="warning" />
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" sx={{ fontSize: '14px' }}>
                    Missing system/vendor mapping
                  </Typography>
                  <Chip label={mockROPAHealthMetrics.missingSystemMapping} size="small" color="warning" />
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" sx={{ fontSize: '14px' }}>
                    Outdated activities (&gt;90 days old)
                  </Typography>
                  <Chip label={mockROPAHealthMetrics.outdatedActivities} size="small" color="error" />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined">
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, fontSize: '14px' }}>
                ROPA Review Trend
              </Typography>
              <Box sx={{ width: '100%', height: 200 }}>
                <LineChart
                  xAxis={[
                    {
                      scaleType: 'point',
                      data: chartData.months,
                      tickLabelStyle: { fontSize: '11px' },
                    },
                  ]}
                  series={[
                    {
                      data: chartData.reviewed,
                      showMark: true,
                      curve: 'linear',
                    },
                  ]}
                  height={200}
                  margin={{ left: 40, right: 20, top: 10, bottom: 40 }}
                  grid={{ vertical: true, horizontal: true }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Agentic Hook Placeholder */}
      <Box
        sx={{
          p: 1.5,
          backgroundColor: 'grey.50',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '8px',
        }}
      >
        <Typography variant="caption" sx={{ fontSize: '12px', color: 'text.secondary' }}>
          💡 <strong>Kaitaki detected 1 new system</strong> in the last review cycle. Review recommended.
        </Typography>
      </Box>
    </Stack>
  );
}

