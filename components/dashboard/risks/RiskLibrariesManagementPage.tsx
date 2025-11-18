'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Stack, Typography, Switch, Card, Chip, Accordion, AccordionSummary, AccordionDetails, Button, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface RiskLibrary {
  id: string;
  title: string;
  category: string;
  description: string;
  section: string;
}

const riskLibraries: RiskLibrary[] = [
  // Core Risk Libraries
  {
    id: 'core-1',
    title: 'Data Protection Risks',
    category: 'Core',
    description: 'Comprehensive library covering fundamental data protection risks including unauthorized access, data loss, and privacy breaches.',
    section: 'core',
  },
  {
    id: 'core-2',
    title: 'Sensitive Data Risks',
    category: 'Core',
    description: 'Risks associated with processing special categories of personal data, health information, and other sensitive data types.',
    section: 'core',
  },
  {
    id: 'core-3',
    title: 'Cross-Border Transfer Risks',
    category: 'Core',
    description: 'Risks related to transferring personal data across international borders, including adequacy decisions and transfer mechanisms.',
    section: 'core',
  },
  {
    id: 'core-4',
    title: 'Data Subject Rights Risks',
    category: 'Core',
    description: 'Risks associated with failing to properly implement or respond to data subject rights requests under privacy regulations.',
    section: 'core',
  },
  {
    id: 'core-5',
    title: 'Security & Technical Risks',
    category: 'Core',
    description: 'Technical and organizational security risks including cyber threats, system vulnerabilities, and inadequate security measures.',
    section: 'core',
  },
  // DPIA Libraries
  {
    id: 'dpia-1',
    title: 'High-Risk Processing Library',
    category: 'DPIA',
    description: 'Risks specific to high-risk processing activities that require Data Protection Impact Assessments under PDPL and GDPR.',
    section: 'dpia',
  },
  {
    id: 'dpia-2',
    title: 'Large Scale Processing Library',
    category: 'DPIA',
    description: 'Risks associated with processing personal data on a large scale, including systematic monitoring and profiling activities.',
    section: 'dpia',
  },
  {
    id: 'dpia-3',
    title: 'Monitoring & Profiling Risks',
    category: 'DPIA',
    description: 'Risks related to automated decision-making, profiling, and systematic monitoring of individuals\' behavior and activities.',
    section: 'dpia',
  },
  {
    id: 'dpia-4',
    title: 'Vulnerability & Impact on Individuals',
    category: 'DPIA',
    description: 'Risks that may result in physical, material, or non-material damage to individuals, particularly vulnerable populations.',
    section: 'dpia',
  },
  // LIA Libraries
  {
    id: 'lia-1',
    title: 'Balancing Test Risks',
    category: 'LIA',
    description: 'Risks associated with balancing legitimate interests against data subjects\' rights and freedoms in Legitimate Interest Assessments.',
    section: 'lia',
  },
  {
    id: 'lia-2',
    title: 'Reasonable Expectations Risks',
    category: 'LIA',
    description: 'Risks related to whether data subjects can reasonably expect their data to be processed for the stated legitimate interest.',
    section: 'lia',
  },
  {
    id: 'lia-3',
    title: 'Necessity & Proportionality Risks',
    category: 'LIA',
    description: 'Risks associated with ensuring processing is necessary and proportionate to achieve the legitimate interest.',
    section: 'lia',
  },
  // TIA Libraries
  {
    id: 'tia-1',
    title: 'Schrems II Transfer Risks',
    category: 'TIA',
    description: 'Risks identified following the Schrems II ruling, including adequacy of third-country data protection laws and government access.',
    section: 'tia',
  },
  {
    id: 'tia-2',
    title: 'Vendor Jurisdiction Risks',
    category: 'TIA',
    description: 'Risks associated with vendors and processors located in jurisdictions with inadequate data protection frameworks.',
    section: 'tia',
  },
  {
    id: 'tia-3',
    title: 'Foreign Government Access Risks',
    category: 'TIA',
    description: 'Risks of foreign government surveillance, access requests, and legal frameworks that may compromise data protection.',
    section: 'tia',
  },
  {
    id: 'tia-4',
    title: 'Supplementary Measures Library',
    category: 'TIA',
    description: 'Additional technical, contractual, and organizational measures to supplement transfer mechanisms and ensure adequate protection.',
    section: 'tia',
  },
  // Internal Libraries
  {
    id: 'internal-1',
    title: 'HR Data Risks',
    category: 'Internal',
    description: 'Company-specific risks related to processing employee data, recruitment, performance management, and HR operations.',
    section: 'internal',
  },
  {
    id: 'internal-2',
    title: 'Vendor & Third-Party Risks',
    category: 'Internal',
    description: 'Risks associated with third-party vendors, service providers, and partners who process personal data on your behalf.',
    section: 'internal',
  },
  {
    id: 'internal-3',
    title: 'Marketing / Tracking Risks',
    category: 'Internal',
    description: 'Risks related to marketing activities, tracking technologies, cookies, and digital advertising compliance.',
    section: 'internal',
  },
];

const sectionTitles: { [key: string]: string } = {
  core: 'Core Risk Libraries',
  dpia: 'DPIA-Specific Risk Libraries',
  lia: 'LIA-Specific Risk Libraries',
  tia: 'TIA-Specific Risk Libraries',
  internal: 'Internal / Company Risk Libraries',
};

const sectionOrder = ['core', 'dpia', 'lia', 'tia', 'internal'];

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

export default function RiskLibrariesManagementPage() {
  const router = useRouter();
  const [enabledLibraries, setEnabledLibraries] = useState<Set<string>>(
    new Set(riskLibraries.map((lib) => lib.id)) // All enabled by default
  );
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    const newEnabled = new Set(enabledLibraries);
    if (newEnabled.has(id)) {
      newEnabled.delete(id);
    } else {
      newEnabled.add(id);
    }
    setEnabledLibraries(newEnabled);
  };

  const handleCategoryToggle = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const handleSelectAllInCategory = (categoryId: string) => {
    const categoryLibraries = riskLibraries.filter((lib) => lib.section === categoryId);
    const allEnabled = categoryLibraries.every((lib) => enabledLibraries.has(lib.id));
    
    const newEnabled = new Set(enabledLibraries);
    if (allEnabled) {
      categoryLibraries.forEach((lib) => newEnabled.delete(lib.id));
    } else {
      categoryLibraries.forEach((lib) => newEnabled.add(lib.id));
    }
    setEnabledLibraries(newEnabled);
  };

  const getSelectedCountInCategory = (categoryId: string) => {
    return riskLibraries.filter((lib) => lib.section === categoryId && enabledLibraries.has(lib.id)).length;
  };

  const isAllSelectedInCategory = (categoryId: string) => {
    const categoryLibraries = riskLibraries.filter((lib) => lib.section === categoryId);
    return categoryLibraries.length > 0 && categoryLibraries.every((lib) => enabledLibraries.has(lib.id));
  };

  const groupedLibraries = sectionOrder.map((section) => ({
    section,
    title: sectionTitles[section],
    libraries: riskLibraries.filter((lib) => lib.section === section),
  }));

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
        <Stack spacing={1}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            Risk Libraries
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: '1rem',
            }}
          >
            Browse and configure the risk libraries Kai uses to evaluate privacy, security, and compliance risks.
          </Typography>
        </Stack>

        {/* Accordion Groups */}
        <Stack spacing={1.5}>
          {groupedLibraries.map((group) => {
            const isExpanded = expandedCategories.includes(group.section);
            const selectedCount = getSelectedCountInCategory(group.section);
            const allSelected = isAllSelectedInCategory(group.section);

            return (
              <Card
                key={group.section}
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
                  onChange={() => handleCategoryToggle(group.section)}
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
                            {group.title}
                          </Typography>
                          <Chip
                            label={`${group.libraries.length} ${group.libraries.length === 1 ? 'item' : 'items'}`}
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
                          {group.section === 'core' && 'Core risk libraries covering fundamental data protection and privacy risks.'}
                          {group.section === 'dpia' && 'Risk libraries specific to Data Protection Impact Assessments.'}
                          {group.section === 'lia' && 'Risk libraries for Legitimate Interest Assessments.'}
                          {group.section === 'tia' && 'Risk libraries for Transfer Impact Assessments.'}
                          {group.section === 'internal' && 'Company-specific risk libraries for internal operations.'}
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
                          onClick={() => handleSelectAllInCategory(group.section)}
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
                          {allSelected ? 'Disable All' : 'Enable All'} ({selectedCount}/{group.libraries.length})
                        </Button>
                      </Box>

                      {/* Library Items */}
                      {group.libraries.map((library, index) => {
                        const isEnabled = enabledLibraries.has(library.id);
                        return (
                          <Box key={library.id}>
                            {index > 0 && (
                              <Divider sx={{ my: 1, borderColor: '#E5E7EB' }} />
                            )}
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                py: 1,
                                px: 0,
                                '&:hover': {
                                  backgroundColor: '#F4F6F8',
                                  borderRadius: '6px',
                                  mx: -0.5,
                                  px: 0.5,
                                },
                              }}
                            >
                              <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontWeight: 500,
                                    color: '#1F2937',
                                    fontSize: '0.8125rem',
                                    mb: 0.25,
                                  }}
                                >
                                  {library.title}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: '#6B7280',
                                    fontSize: '0.75rem',
                                    lineHeight: 1.4,
                                  }}
                                >
                                  {library.description}
                                </Typography>
                              </Box>
                              <Box
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggle(library.id);
                                }}
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  ml: 2,
                                }}
                              >
                                <Switch
                                  checked={isEnabled}
                                  onChange={() => handleToggle(library.id)}
                                  size="small"
                                  sx={{
                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                      color: '#294A78',
                                    },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                      backgroundColor: '#294A78',
                                    },
                                  }}
                                />
                              </Box>
                            </Box>
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
  );
}

