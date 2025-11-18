'use client'

import { Box, Stack, Typography, Button, Chip, List, ListItem, ListItemText, Divider, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface Section {
  id: string;
  name: string;
  status: 'complete' | 'partial' | 'missing';
}

interface ReviewSummarySidebarProps {
  overallCompleteness: number;
  sections: Section[];
  reviewedSections: Set<string>;
  onMarkAllReviewed: () => void;
  onProceedToRiskAssessment: () => void;
  canProceed: boolean;
}

export default function ReviewSummarySidebar({
  overallCompleteness,
  sections,
  reviewedSections,
  onMarkAllReviewed,
  onProceedToRiskAssessment,
  canProceed,
}: ReviewSummarySidebarProps) {
  const itemsNeedingAttention = sections
    .flatMap((section) =>
      section.status !== 'complete'
        ? [
            {
              section: section.name,
              issue: section.status === 'partial' ? 'Incomplete answers' : 'Missing answers',
            },
          ]
        : []
    )
    .slice(0, 5);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircleIcon sx={{ fontSize: 18, color: 'success.main' }} />;
      case 'partial':
        return <WarningIcon sx={{ fontSize: 18, color: 'warning.main' }} />;
      default:
        return <ErrorIcon sx={{ fontSize: 18, color: 'error.main' }} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'success';
      case 'partial':
        return 'warning';
      default:
        return 'error';
    }
  };

  return (
    <Box
      sx={{
        width: '360px',
        height: '100%',
        backgroundColor: 'background.paper',
        borderLeft: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
      }}
    >
      <Box sx={{ p: 4 }}>
        <Stack spacing={4}>
          {/* Overall Completeness Score */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: 'text.secondary',
                mb: 2,
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: 0.5,
              }}
            >
              Overall Completeness
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 3,
                borderRadius: 2,
                backgroundColor: 'rgba(25, 118, 210, 0.05)',
                border: '1px solid',
                borderColor: 'rgba(25, 118, 210, 0.1)',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  display: 'inline-flex',
                  mb: 2,
                }}
              >
                <CircularProgress
                  variant="determinate"
                  value={overallCompleteness}
                  size={120}
                  thickness={4}
                  sx={{
                    color: 'primary.main',
                  }}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                    {overallCompleteness}%
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                {overallCompleteness >= 80
                  ? 'Assessment is ready for review'
                  : overallCompleteness >= 50
                  ? 'Some sections need attention'
                  : 'Multiple sections require completion'}
              </Typography>
            </Box>
          </Box>

          <Divider />

          {/* Sections List */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: 'text.secondary',
                mb: 2,
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: 0.5,
              }}
            >
              Sections
            </Typography>
            <Stack spacing={1}>
              {sections.map((section) => (
                <Box
                  key={section.id}
                  sx={{
                    p: 1.5,
                    borderRadius: 1,
                    backgroundColor: reviewedSections.has(section.id) ? 'rgba(76, 175, 80, 0.05)' : 'transparent',
                    border: '1px solid',
                    borderColor: reviewedSections.has(section.id) ? 'rgba(76, 175, 80, 0.2)' : 'divider',
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    {getStatusIcon(section.status)}
                    <Typography variant="body2" sx={{ flex: 1, fontSize: '0.875rem' }}>
                      {section.name}
                    </Typography>
                    <Chip
                      label={section.status === 'complete' ? 'Complete' : section.status === 'partial' ? 'Partial' : 'Missing'}
                      size="small"
                      color={getStatusColor(section.status) as any}
                      sx={{ height: 20, fontSize: '0.7rem' }}
                    />
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Items Needing Attention */}
          {itemsNeedingAttention.length > 0 && (
            <>
              <Divider />
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    color: 'text.secondary',
                    mb: 2,
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    letterSpacing: 0.5,
                  }}
                >
                  Items Needing Attention
                </Typography>
                <List dense sx={{ p: 0 }}>
                  {itemsNeedingAttention.map((item, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                      <ListItemText
                        primary={item.section}
                        secondary={item.issue}
                        primaryTypographyProps={{
                          variant: 'body2',
                          sx: { fontSize: '0.8125rem' },
                        }}
                        secondaryTypographyProps={{
                          variant: 'caption',
                          sx: { fontSize: '0.75rem' },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </>
          )}

          <Divider />

          {/* Action Buttons */}
          <Stack spacing={2}>
            <Button
              variant="outlined"
              fullWidth
              onClick={onMarkAllReviewed}
              disabled={sections.every((s) => reviewedSections.has(s.id))}
              sx={{
                textTransform: 'none',
                py: 1.5,
              }}
            >
              Mark Entire Assessment as Reviewed
            </Button>

            <Button
              variant="contained"
              fullWidth
              onClick={onProceedToRiskAssessment}
              disabled={!canProceed}
              endIcon={<ArrowForwardIcon />}
              sx={{
                textTransform: 'none',
                py: 1.5,
                boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.4)',
                },
                '&.Mui-disabled': {
                  backgroundColor: 'action.disabledBackground',
                  color: 'action.disabled',
                },
              }}
            >
              Proceed to Risk Assessment
            </Button>

            {!canProceed && (
              <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center', fontSize: '0.75rem' }}>
                {!sections.every((s) => reviewedSections.has(s.id))
                  ? 'All sections must be reviewed'
                  : 'Privacy Champion sign-off required'}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

