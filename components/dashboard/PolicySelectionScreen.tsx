'use client'

import { useState } from 'react';
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
import { useRouter } from 'next/navigation';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface PolicyItem {
  id: string;
  title: string;
  description: string;
}

interface PolicyCategory {
  id: string;
  name: string;
  description: string;
  items: PolicyItem[];
}

const internationalStandards: PolicyItem[] = [
  { id: 'iso-27001-clause-5', title: 'ISO/IEC 27001 — Clause 5', description: 'Leadership and commitment for PIMS program' },
  { id: 'iso-27002-clause-6', title: 'ISO/IEC 27002 — Clause 6', description: 'Organizational Controls' },
  { id: 'iso-27701-annex-a', title: 'ISO/IEC 27701 — Annex A', description: 'PII Controllers' },
  { id: 'iso-27701-annex-b', title: 'ISO/IEC 27701 — Annex B', description: 'PII Processors' },
];

const saudiRegulations: PolicyItem[] = [
  { id: 'pdpl-ksa', title: 'PDPL (KSA)', description: 'Saudi Arabia\'s primary data protection legislation' },
  { id: 'pdpl-executive', title: 'PDPL Executive Regulations', description: 'Detailed implementation requirements for PDPL compliance' },
  { id: 'nca-data-mgmt', title: 'NCA Data Management Guidelines', description: 'Cybersecurity and data management best practices' },
];

const internalPolicies: PolicyItem[] = [
  { id: 'privacy-policy', title: 'Privacy Policy', description: 'Your organization\'s privacy policy document' },
  { id: 'info-security-policy', title: 'Information Security Policy', description: 'Your organization\'s information security policy' },
  { id: 'data-retention-policy', title: 'Data Retention Policy', description: 'Policy governing how long data is retained and when it\'s disposed' },
  { id: 'access-control-policy', title: 'Access Control Policy', description: 'Policy defining who can access what data and under what conditions' },
  { id: 'hr-data-handling', title: 'HR Data Handling Policy', description: 'Policy for handling employee and candidate personal data' },
];

const otherJurisdictions: PolicyItem[] = [
  { id: 'gdpr', title: 'GDPR (EU)', description: 'General Data Protection Regulation' },
  { id: 'ccpa', title: 'CCPA (California)', description: 'California Consumer Privacy Act' },
];

const categories: PolicyCategory[] = [
  {
    id: 'international',
    name: 'International Standards',
    description: 'International standards for information security and privacy management',
    items: internationalStandards,
  },
  {
    id: 'saudi',
    name: 'Saudi National Regulations',
    description: 'Saudi Arabia-specific data protection and cybersecurity regulations',
    items: saudiRegulations,
  },
  {
    id: 'internal',
    name: 'Internal Organizational Policies',
    description: 'Your organization\'s internal policies and procedures',
    items: internalPolicies,
  },
  {
    id: 'other',
    name: 'Other Jurisdictions',
    description: 'Additional regulatory frameworks from other jurisdictions',
    items: otherJurisdictions,
  },
];

export default function PolicySelectionScreen() {
  const router = useRouter();
  const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const handleToggle = (policyId: string) => {
    setSelectedPolicies((prev) =>
      prev.includes(policyId) ? prev.filter((id) => id !== policyId) : [...prev, policyId]
    );
  };

  const handleSelectAllInCategory = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) return;

    const categoryItemIds = category.items.map((item) => item.id);
    const allSelected = categoryItemIds.every((id) => selectedPolicies.includes(id));

    if (allSelected) {
      // Deselect all in category
      setSelectedPolicies((prev) => prev.filter((id) => !categoryItemIds.includes(id)));
    } else {
      // Select all in category
      setSelectedPolicies((prev) => {
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

  const handleContinue = () => {
    if (selectedPolicies.length === 0) return;

    // Store selected policies in localStorage
    localStorage.setItem('kaitaki_selected_policies', JSON.stringify(selectedPolicies));

    setSnackbarOpen(true);
    // Navigate to GAP assessment after a brief delay
    setTimeout(() => {
      router.push('/assessments/gap-initial?autoFill=true');
    }, 1500);
  };

  const getSelectedCountInCategory = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) return 0;
    return category.items.filter((item) => selectedPolicies.includes(item.id)).length;
  };

  const isAllSelectedInCategory = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) return false;
    return category.items.every((item) => selectedPolicies.includes(item.id));
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
              Select Standards & Policies
            </Typography>
            <Typography variant="body2" sx={{ color: '#4B5563', maxWidth: 800, fontSize: '0.875rem' }}>
              Kaitaki will use these frameworks to auto-fill your GAP assessment.
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

                        {/* Policy Items */}
                        {category.items.map((item, index) => {
                          const isSelected = selectedPolicies.includes(item.id);
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
                                      {item.title}
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
                {selectedPolicies.length === 0 ? (
                  'Select at least one policy to continue'
                ) : (
                  <>
                    <strong>{selectedPolicies.length}</strong>{' '}
                    {selectedPolicies.length === 1 ? 'policy' : 'policies'} selected
                  </>
                )}
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="medium"
              onClick={handleContinue}
              disabled={selectedPolicies.length === 0}
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
              Continue to GAP Assessment
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Kaitaki will analyze selected policies and auto-fill your GAP assessment."
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
