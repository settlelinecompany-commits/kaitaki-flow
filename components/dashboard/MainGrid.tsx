import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '@/components/dashboard/internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedTreeView from './CustomizedTreeView';
import CustomizedDataGrid from './CustomizedDataGrid';
import HighlightedCard from './HighlightedCard';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import StatCard, { StatCardProps } from './StatCard';

const data: StatCardProps[] = [
  {
    title: 'Compliance Coverage',
    value: '78%',
    interval: 'Last 30 days',
    trend: 'up',
    data: [
      65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
      79, 78, 77, 76, 75, 74, 75, 76, 77, 78, 79, 80, 81, 82,
    ],
  },
  {
    title: 'High-Risk Processing Items',
    value: '6',
    interval: 'Last 30 days',
    trend: 'down',
    data: [
      8, 8, 9, 9, 8, 7, 7, 8, 7, 6, 6, 7, 6, 5, 5, 6,
      5, 4, 4, 5, 4, 3, 3, 4, 3, 2, 2, 3, 2, 1,
    ],
  },
  {
    title: 'Open Assessments',
    value: '14',
    interval: 'Last 30 days',
    trend: 'neutral',
    data: [
      12, 13, 14, 15, 14, 13, 14, 15, 16, 15, 14, 15, 16, 15, 14, 15,
      14, 13, 14, 15, 14, 13, 14, 15, 14, 13, 14, 15, 14, 13,
    ],
  },
  {
    title: 'Pending Sign-Offs',
    value: '3',
    interval: 'Last 30 days',
    trend: 'down',
    data: [
      5, 5, 4, 4, 5, 4, 3, 3, 4, 3, 2, 2, 3, 2, 1, 1,
      2, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0,
    ],
  },
];

export default function MainGrid() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HighlightedCard />
        </Grid>
        <Grid size={{ xs: 12, md: 4.5}} sx={{ minWidth: 0 }}>
          <SessionsChart />
        </Grid>
        <Grid size={{ xs: 12, md: 4.5 }} sx={{ minWidth: 0 }}>
          <PageViewsBarChart />
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <CustomizedTreeView />
            <ChartUserByCountry />
          </Stack>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
