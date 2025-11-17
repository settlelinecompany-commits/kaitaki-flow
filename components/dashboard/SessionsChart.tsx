import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';

function AreaGradient({ color, id }: { color: string; id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

function getDaysInMonth(month: number, year: number) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString('en-US', {
    month: 'short',
  });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}

export default function SessionsChart() {
  const theme = useTheme();
  const data = getDaysInMonth(4, 2024);

  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
  ];

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Assessment Completion Trend
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              47
            </Typography>
            <Chip size="small" color="success" label="+28%" />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Assessment completions per day for the last 30 days
          </Typography>
        </Stack>
        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'point',
              data,
              tickInterval: (index, i) => (i + 1) % 5 === 0,
              height: 24,
            },
          ]}
          yAxis={[{ width: 50 }]}
          series={[
            {
              id: 'gap',
              label: 'GAP Assessments',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              stackOrder: 'ascending',
              data: [
                2, 3, 2, 4, 3, 5, 6, 5, 7, 8, 6, 9,
                10, 11, 12, 13, 11, 14, 15, 16, 14, 17, 18,
                19, 20, 21, 22, 23, 24, 25,
              ],
            },
            {
              id: 'dpia',
              label: 'DPIAs',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              stackOrder: 'ascending',
              data: [
                1, 2, 1, 3, 2, 4, 5, 4, 6, 7, 5, 8,
                9, 10, 11, 12, 10, 13, 14, 15, 13, 16, 17,
                18, 19, 20, 21, 22, 23, 24,
              ],
            },
            {
              id: 'lia',
              label: 'LIAs',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              stackOrder: 'ascending',
              data: [
                0, 1, 0, 1, 1, 2, 2, 1, 2, 3, 2, 3,
                4, 4, 5, 5, 4, 6, 6, 7, 6, 7, 8,
                8, 9, 9, 10, 10, 11, 11,
              ],
              area: true,
            },
            {
              id: 'tia',
              label: 'TIAs',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              stackOrder: 'ascending',
              data: [
                0, 0, 1, 1, 0, 1, 2, 1, 2, 2, 1, 2,
                3, 3, 3, 4, 3, 4, 5, 5, 4, 5, 6,
                6, 7, 7, 8, 8, 9, 9,
              ],
              area: true,
            },
            {
              id: 'vendor',
              label: 'Vendor Assessments',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              stackOrder: 'ascending',
              data: [
                1, 1, 2, 2, 1, 2, 3, 2, 3, 4, 3, 4,
                5, 5, 6, 6, 5, 7, 7, 8, 7, 8, 9,
                9, 10, 10, 11, 11, 12, 12,
              ],
              area: true,
            },
          ]}
          height={250}
          margin={{ left: 0, right: 20, top: 20, bottom: 0 }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiAreaElement-series-vendor': {
              fill: "url('#vendor')",
            },
            '& .MuiAreaElement-series-tia': {
              fill: "url('#tia')",
            },
            '& .MuiAreaElement-series-lia': {
              fill: "url('#lia')",
            },
            '& .MuiAreaElement-series-dpia': {
              fill: "url('#dpia')",
            },
            '& .MuiAreaElement-series-gap': {
              fill: "url('#gap')",
            },
          }}
          hideLegend
        >
          <AreaGradient color={theme.palette.primary.dark} id="vendor" />
          <AreaGradient color={theme.palette.primary.main} id="tia" />
          <AreaGradient color={theme.palette.primary.light} id="lia" />
          <AreaGradient color={theme.palette.primary.dark} id="dpia" />
          <AreaGradient color={theme.palette.primary.main} id="gap" />
        </LineChart>
      </CardContent>
    </Card>
  );
}
