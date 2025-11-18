'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  Snackbar,
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface RiskLibraryItem {
  id: string;
  name: string;
  description: string;
}

interface RiskLibraryCategory {
  id: string;
  name: string;
  description: string;
  items: RiskLibraryItem[];
}

const coreLibraries: RiskLibraryItem[] = [
  {
    id: 'core-1',
    name: 'Data Protection Risks',
    description: 'Comprehensive library covering fundamental data protection and privacy risks',
  },
  {
    id: 'core-2',
    name: 'Sensitive Data Risks',
    description: 'Risks associated with processing sensitive personal data categories',
  },
  {
    id: 'core-3',
    name: 'Cross-Border Transfer Risks',
    description: 'Risks related to international data transfers and adequacy decisions',
  },
  {
    id: 'core-4',
    name: 'Data Subject Rights Risks',
    description: 'Risks concerning data subject access, rectification, and deletion rights',
  },
  {
    id: 'core-5',
    name: 'Security & Technical Risks',
    description: 'Technical and organizational security measures and vulnerabilities',
  },
];

const dpiaLibraries: RiskLibraryItem[] = [
  {
    id: 'dpia-1',
    name: 'High-Risk Processing Library',
    description: 'Risks specific to high-risk processing activities requiring DPIA',
  },
  {
    id: 'dpia-2',
    name: 'Large Scale Processing Library',
    description: 'Risks associated with large-scale data processing operations',
  },
  {
    id: 'dpia-3',
    name: 'Monitoring & Profiling Risks',
    description: 'Risks related to systematic monitoring and automated decision-making',
  },
  {
    id: 'dpia-4',
    name: 'Vulnerability & Impact on Individuals',
    description: 'Assessment of potential harm and impact on data subjects',
  },
];

const liaLibraries: RiskLibraryItem[] = [
  {
    id: 'lia-1',
    name: 'Balancing Test Risks',
    description: 'Risks in balancing legitimate interests against data subject rights',
  },
  {
    id: 'lia-2',
    name: 'Reasonable Expectations Risks',
    description: 'Risks related to data subject reasonable expectations of processing',
  },
  {
    id: 'lia-3',
    name: 'Necessity & Proportionality Risks',
    description: 'Risks concerning the necessity and proportionality of processing',
  },
];

const tiaLibraries: RiskLibraryItem[] = [
  {
    id: 'tia-1',
    name: 'Schrems II Transfer Risks',
    description: 'Risks related to EU-US data transfers and Schrems II implications',
  },
  {
    id: 'tia-2',
    name: 'Vendor Jurisdiction Risks',
    description: 'Risks associated with vendor locations and foreign jurisdiction access',
  },
  {
    id: 'tia-3',
    name: 'Foreign Government Access Risks',
    description: 'Risks of foreign government surveillance and data access',
  },
  {
    id: 'tia-4',
    name: 'Supplementary Measures Library',
    description: 'Additional safeguards and measures for high-risk transfers',
  },
];

const internalLibraries: RiskLibraryItem[] = [
  {
    id: 'internal-1',
    name: 'HR Data Risks',
    description: 'Company-specific risks related to employee and candidate data processing',
  },
  {
    id: 'internal-2',
    name: 'Vendor & Third-Party Risks',
    description: 'Risks associated with third-party vendors and data processors',
  },
  {
    id: 'internal-3',
    name: 'Marketing / Tracking Risks',
    description: 'Risks related to marketing activities, cookies, and tracking technologies',
  },
];

const categories: RiskLibraryCategory[] = [
  {
    id: 'core',
    name: 'Core Risk Libraries',
    description: 'Fundamental risk libraries applicable to all privacy assessments',
    items: coreLibraries,
  },
  {
    id: 'dpia',
    name: 'DPIA-Specific Libraries',
    description: 'Risk libraries designed for Data Protection Impact Assessments',
    items: dpiaLibraries,
  },
  {
    id: 'lia',
    name: 'LIA-Specific Libraries',
    description: 'Risk libraries for Legitimate Interest Assessments',
    items: liaLibraries,
  },
  {
    id: 'tia',
    name: 'TIA-Specific Libraries',
    description: 'Risk libraries for Transfer Impact Assessments',
    items: tiaLibraries,
  },
  {
    id: 'internal',
    name: 'Internal / Company-Specific Libraries',
    description: 'Custom risk libraries tailored to your organization',
    items: internalLibraries,
  },
];

export default function RiskLibrariesPage() {
  const router = useRouter();
  const [selectedLibraries, setSelectedLibraries] = useState<string[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const handleToggle = (libraryId: string) => {
    setSelectedLibraries((prev) =>
      prev.includes(libraryId) ? prev.filter((id) => id !== libraryId) : [...prev, libraryId]
    );
  };

  const handleSelectAllInCategory = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) return;

    const categoryItemIds = category.items.map((item) => item.id);
    const allSelected = categoryItemIds.every((id) => selectedLibraries.includes(id));

    if (allSelected) {
      // Deselect all in category
      setSelectedLibraries((prev) => prev.filter((id) => !categoryItemIds.includes(id)));
    } else {
      // Select all in category
      setSelectedLibraries((prev) => {
        const newSelection = [...prev];
        categoryItemIds.forEach((id) => {
          if (!newSelection.includes(id)) {
            newSelection.push(id);
          }
        });
        return newSelection;
      });
    }
  };

  const handleCategoryToggle = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleGenerate = () => {
    if (selectedLibraries.length === 0) return;

    // Store selected libraries in localStorage
    localStorage.setItem('selectedRiskLibraries', JSON.stringify(selectedLibraries));

    setSnackbarOpen(true);
    // Navigate to risk results after a brief delay
    setTimeout(() => {
      router.push('/voice-assessment/risk-results');
    }, 1500);
  };

  const getSelectedCountInCategory = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) return 0;
    return category.items.filter((item) => selectedLibraries.includes(item.id)).length;
  };

  const isAllSelectedInCategory = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) return false;
    return category.items.every((item) => selectedLibraries.includes(item.id));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F8F9FA',
      }}
    >
      <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, maxWidth: 1200, mx: 'auto', width: '100%' }}>
        <Stack spacing={2}>
          {/* Header */}
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 0.5, color: '#1F2937', fontSize: '1.5rem' }}>
              Select Risk Libraries
            </Typography>
            <Typography variant="body2" sx={{ color: '#4B5563', maxWidth: 800, fontSize: '0.875rem' }}>
              Kai will use the selected libraries to generate a risk matrix and mitigation plan.
            </Typography>
          </Box>

          {/* Accordion Groups */}
          <Stack spacing={1.5}>
            {categories.map((category) => {
              const isExpanded = expandedCategories.includes(category.id);
              const selectedCount = getSelectedCountInCategory(category.id);
              const allSelected = isAllSelectedInCategory(category.id);

              return (
                <Card
                  key={category.id}
                  variant="outlined"
                  sx={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
                    overflow: 'hidden',
                  }}
                >
                  <Accordion
                    expanded={isExpanded}
                    onChange={() => handleCategoryToggle(category.id)}
                    sx={{
                      boxShadow: 'none',
                      '&:before': { display: 'none' },
                      '&.Mui-expanded': { margin: 0 },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon
                          sx={{
                            color: '#4B5563',
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease',
                            fontSize: '1.25rem',
                          }}
                        />
                      }
                      sx={{
                        px: 2,
                        py: 1.25,
                        minHeight: 56,
                        '&.Mui-expanded': { minHeight: 56 },
                        '& .MuiAccordionSummary-content': {
                          my: 0.75,
                          '&.Mui-expanded': { my: 0.75 },
                        },
                      }}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: '100%' }}>
                        <Box sx={{ flexGrow: 1 }}>
                          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 0.25 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1F2937', fontSize: '0.9375rem' }}>
                              {category.name}
                            </Typography>
                            <Chip
                              label={`${category.items.length} ${category.items.length === 1 ? 'item' : 'items'}`}
                              size="small"
                              sx={{
                                height: 22,
                                backgroundColor: '#E8EEF7',
                                color: '#294A78',
                                fontWeight: 500,
                                fontSize: '0.7rem',
                              }}
                            />
                          </Stack>
                          <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '0.8125rem' }}>
                            {category.description}
                          </Typography>
                        </Box>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 2, pb: 2, pt: 0 }}>
                      <Stack spacing={0}>
                        {/* Select All Button */}
                        <Box sx={{ mb: 1.5 }}>
                          <Button
                            variant="text"
                            size="small"
                            onClick={() => handleSelectAllInCategory(category.id)}
                            startIcon={<CheckCircleOutlineIcon sx={{ fontSize: '1rem' }} />}
                            sx={{
                              color: allSelected ? '#294A78' : '#4B5563',
                              textTransform: 'none',
                              fontWeight: 500,
                              fontSize: '0.8125rem',
                              py: 0.5,
                              px: 1,
                              minHeight: 'auto',
                              '&:hover': {
                                backgroundColor: '#E8EEF7',
                              },
                            }}
                          >
                            {allSelected ? 'Deselect All' : 'Select All'} ({selectedCount}/{category.items.length})
                          </Button>
                        </Box>

                        {/* Library Items */}
                        {category.items.map((item, index) => {
                          const isSelected = selectedLibraries.includes(item.id);
                          return (
                            <Box key={item.id}>
                              {index > 0 && (
                                <Divider sx={{ my: 1, borderColor: '#E5E7EB' }} />
                              )}
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={isSelected}
                                    onChange={() => handleToggle(item.id)}
                                    size="small"
                                    sx={{
                                      color: '#294A78',
                                      '&.Mui-checked': {
                                        color: '#294A78',
                                      },
                                    }}
                                  />
                                }
                                label={
                                  <Box>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        fontWeight: 500,
                                        color: '#1F2937',
                                        fontSize: '0.8125rem',
                                        mb: 0.25,
                                      }}
                                    >
                                      {item.name}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        color: '#6B7280',
                                        fontSize: '0.75rem',
                                        lineHeight: 1.4,
                                      }}
                                    >
                                      {item.description}
                                    </Typography>
                                  </Box>
                                }
                                sx={{
                                  alignItems: 'flex-start',
                                  py: 1,
                                  px: 0,
                                  m: 0,
                                  width: '100%',
                                  '&:hover': {
                                    backgroundColor: '#F4F6F8',
                                    borderRadius: '6px',
                                    mx: -0.5,
                                    px: 0.5,
                                  },
                                }}
                              />
                            </Box>
                          );
                        })}
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                </Card>
              );
            })}
          </Stack>
        </Stack>
      </Box>

      {/* Sticky Footer */}
      <Box
        sx={{
          borderTop: '1px solid #E5E7EB',
          p: 2,
          backgroundColor: '#FFFFFF',
          position: 'sticky',
          bottom: 0,
          boxShadow: '0 -1px 2px rgba(0, 0, 0, 0.03)',
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="body2" sx={{ color: '#4B5563', fontSize: '0.8125rem' }}>
                {selectedLibraries.length === 0 ? (
                  'Select at least one risk library to continue'
                ) : (
                  <>
                    <strong>{selectedLibraries.length}</strong>{' '}
                    {selectedLibraries.length === 1 ? 'library' : 'libraries'} selected
                  </>
                )}
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="medium"
              onClick={handleGenerate}
              disabled={selectedLibraries.length === 0}
              sx={{
                minWidth: 220,
                backgroundColor: '#294A78',
                color: '#FFFFFF',
                fontWeight: 500,
                borderRadius: '8px',
                py: 1,
                '&:hover': {
                  backgroundColor: '#1E3654',
                },
                '&.Mui-disabled': {
                  backgroundColor: '#E5E7EB',
                  color: '#9CA3AF',
                },
              }}
            >
              Generate Risk Assessment
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Kaitaki will analyze selected risk libraries and generate your risk assessment."
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#1F2937',
            color: '#FFFFFF',
            borderRadius: '8px',
          },
        }}
      />
    </Box>
  );
}
