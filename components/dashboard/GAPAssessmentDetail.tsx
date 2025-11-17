'use client'

import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  LinearProgress,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

interface GapControl {
  id: string;
  article: string;
  clause: string;
  requirement: string;
  assessmentQuestion?: string;
  section: string;
  policy: string;
  policySource: string; // e.g., "Annex A" or "Clause 5"
}

interface GapControlData {
  // Group 1: Metadata
  confidence: 'High' | 'Medium' | 'Low' | '';
  
  // Group 2: Assessment
  answer: 'Yes' | 'No' | 'Partial' | 'Unknown' | '';
  currentState: string;
  evidence: string;
  
  // Group 3: GAP + Risk
  gapIdentified: string;
  impact: 'High' | 'Medium' | 'Low' | '';
  likelihood: 'High' | 'Medium' | 'Low' | '';
  overallRisk: 'High' | 'Medium' | 'Low' | '';
  riskLevel: 'High' | 'Medium' | 'Low' | '';
  actionPriority: 'High' | 'Medium' | 'Low' | '';
  
  // Group 4: Mitigation & Workflow
  recommendedMitigation: string;
  targetState: string;
  ownerDepartment: string;
  dueDate: Dayjs | null;
  status: 'Not Started' | 'Auto-Filled' | 'Needs Review' | 'In Progress' | 'Completed' | '';
  reviewedBy: string;
  reviewedOn: Dayjs | null;
  comments: string;
}

// Policy display names mapping
const policyDisplayNames: Record<string, string> = {
  'iso-27001-clause-5': 'ISO/IEC 27001 — Clause 5',
  'iso-27002-clause-6': 'ISO/IEC 27002 — Clause 6',
  'iso-27701-annex-a': 'ISO/IEC 27701 — Annex A',
  'iso-27701-annex-b': 'ISO/IEC 27701 — Annex B',
  'pdpl-ksa': 'PDPL',
  'pdpl-executive': 'PDPL Executive Regulations',
  'nca-data-mgmt': 'NCA Data Management Guidelines',
  'privacy-policy': 'Privacy Policy',
  'info-security-policy': 'Information Security Policy',
  'data-retention-policy': 'Data Retention Policy',
  'access-control-policy': 'Access Control Policy',
  'hr-data-handling': 'HR Data Handling Policy',
};

// Policy source tags
const policySourceTags: Record<string, string> = {
  'iso-27001-clause-5': 'Clause 5',
  'iso-27002-clause-6': 'Clause 6',
  'iso-27701-annex-a': 'Annex A',
  'iso-27701-annex-b': 'Annex B',
  'pdpl-ksa': 'PDPL',
  'pdpl-executive': 'Executive Regulations',
  'nca-data-mgmt': 'NCA Guidelines',
  'privacy-policy': 'Internal Policy',
  'info-security-policy': 'Internal Policy',
  'data-retention-policy': 'Internal Policy',
  'access-control-policy': 'Internal Policy',
  'hr-data-handling': 'Internal Policy',
};

// Generate controls for each policy
const generateControlsForPolicy = (policyId: string): GapControl[] => {
  const baseControls: Omit<GapControl, 'policy' | 'policySource'>[] = [
    {
      id: `${policyId}-PP-1`,
      article: 'PDPL Article 11',
      clause: 'Article 11',
      requirement: 'Collect personal data only for specified, explicit, and lawful purposes.',
      assessmentQuestion: 'Is personal data collected only for specified, explicit, and lawful purposes?',
      section: 'Processing Principles',
    },
    {
      id: `${policyId}-PP-2`,
      article: 'PDPL Article 11',
      clause: 'Article 11',
      requirement: 'Collect only the minimum personal data necessary to achieve the purpose.',
      assessmentQuestion: 'Do you collect only the minimum personal data necessary?',
      section: 'Processing Principles',
    },
    {
      id: `${policyId}-DSR-1`,
      article: 'PDPL Article 12',
      clause: 'Article 12',
      requirement: 'Inform data subjects of their rights under PDPL.',
      assessmentQuestion: 'Do you inform data subjects of their rights under PDPL?',
      section: 'Data Subject Rights',
    },
    {
      id: `${policyId}-CONSENT-1`,
      article: 'PDPL Article 5',
      clause: 'Article 5',
      requirement: 'Is consent collected separately from terms and conditions?',
      assessmentQuestion: 'Is consent collected separately from terms and conditions?',
      section: 'Consent',
    },
    {
      id: `${policyId}-LEGAL-1`,
      article: 'PDPL Article 6',
      clause: 'Article 6',
      requirement: 'If you are not relying on consent, is the legal basis documented?',
      assessmentQuestion: 'Is the legal basis documented when not relying on consent?',
      section: 'Legal Basis',
    },
    {
      id: `${policyId}-INDIRECT-1`,
      article: 'PDPL Article 14',
      clause: 'Article 14',
      requirement: 'Do you notify data subjects when their data is indirectly collected?',
      assessmentQuestion: 'Do you notify data subjects when their data is indirectly collected?',
      section: 'Indirect Collection',
    },
    {
      id: `${policyId}-PROC-1`,
      article: 'PDPL Article 19',
      clause: 'Article 19',
      requirement: 'Do you have written contracts with all data processors?',
      assessmentQuestion: 'Do you have written contracts with all data processors?',
      section: 'Processors',
    },
    {
      id: `${policyId}-TRANSFER-1`,
      article: 'PDPL Article 28',
      clause: 'Article 28',
      requirement: 'Do you transfer personal data outside of Saudi Arabia?',
      assessmentQuestion: 'Do you transfer personal data outside of Saudi Arabia?',
      section: 'Transfers',
    },
    {
      id: `${policyId}-SECURITY-1`,
      article: 'PDPL Article 20',
      clause: 'Article 20',
      requirement:
        'Do you apply appropriate technical and organizational measures to protect personal data?',
      assessmentQuestion: 'Do you apply appropriate technical and organizational security measures?',
      section: 'Security Measures',
    },
    {
      id: `${policyId}-GOV-1`,
      article: 'PDPL Article 30',
      clause: 'Article 30',
      requirement: 'Do you maintain internal records of processing activities?',
      assessmentQuestion: 'Do you maintain internal records of processing activities?',
      section: 'Governance',
    },
  ];

  return baseControls.map((control) => ({
    ...control,
    policy: policyId,
    policySource: policySourceTags[policyId] || 'Policy',
  }));
};

const sections = [
  'Processing Principles',
  'Data Subject Rights',
  'Consent',
  'Legal Basis',
  'Indirect Collection',
  'Processors',
  'Transfers',
  'Security Measures',
  'Governance',
];

const departments = ['IT', 'HR', 'Security', 'Marketing', 'Legal', 'Privacy Office'];

const getConfidenceColor = (confidence: string): 'success' | 'warning' | 'default' => {
  switch (confidence) {
    case 'High':
      return 'success';
    case 'Medium':
      return 'warning';
    case 'Low':
      return 'default';
    default:
      return 'default';
  }
};

const getRiskColor = (risk: string): 'success' | 'warning' | 'error' | 'default' => {
  switch (risk) {
    case 'Low':
      return 'success';
    case 'Medium':
      return 'warning';
    case 'High':
      return 'error';
    default:
      return 'default';
  }
};

const getStatusColor = (status: string): 'success' | 'warning' | 'info' | 'default' => {
  switch (status) {
    case 'Completed':
      return 'success';
    case 'Needs Review':
    case 'In Progress':
      return 'warning';
    case 'Auto-Filled':
      return 'info';
    default:
      return 'default';
  }
};

const calculateOverallRisk = (impact: string, likelihood: string): 'High' | 'Medium' | 'Low' => {
  if (impact === 'High' && likelihood === 'High') return 'High';
  if (impact === 'High' && likelihood === 'Medium') return 'High';
  if (impact === 'Medium' && likelihood === 'High') return 'High';
  if (impact === 'High' && likelihood === 'Low') return 'Medium';
  if (impact === 'Medium' && likelihood === 'Medium') return 'Medium';
  if (impact === 'Low' && likelihood === 'High') return 'Medium';
  if (impact === 'Medium' && likelihood === 'Low') return 'Low';
  if (impact === 'Low' && likelihood === 'Medium') return 'Low';
  if (impact === 'Low' && likelihood === 'Low') return 'Low';
  return 'Low';
};

export default function GAPAssessmentDetail() {
  const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [controlData, setControlData] = useState<Record<string, GapControlData>>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Load selected policies from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('kaitaki_selected_policies');
    if (stored) {
      try {
        const policies = JSON.parse(stored);
        setSelectedPolicies(policies);
      } catch (e) {
        setSelectedPolicies(['pdpl-ksa']);
      }
    } else {
      setSelectedPolicies(['pdpl-ksa']);
    }
  }, []);

  // Generate all controls for selected policies
  const allControls = selectedPolicies.flatMap((policyId) => generateControlsForPolicy(policyId));

  // Group controls by policy
  const controlsByPolicy = selectedPolicies.reduce((acc, policyId) => {
    acc[policyId] = allControls.filter((control) => control.policy === policyId);
    return acc;
  }, {} as Record<string, GapControl[]>);

  // Auto-fill on component mount or when policies change
  useEffect(() => {
    if (selectedPolicies.length === 0) return;

    const autoFillData: Record<string, GapControlData> = {};

    allControls.forEach((control) => {
      const answer = Math.random() > 0.3 ? 'Yes' : 'Partial';
      const confidence = Math.random() > 0.5 ? 'High' : 'Medium';
      const impact = Math.random() > 0.6 ? 'Low' : 'Medium';
      const likelihood = Math.random() > 0.6 ? 'Low' : 'Medium';
      const overallRisk = calculateOverallRisk(impact, likelihood);
      const riskLevel = overallRisk;
      const actionPriority = overallRisk === 'High' ? 'High' : overallRisk === 'Medium' ? 'Medium' : 'Low';

      autoFillData[control.id] = {
        confidence,
        answer,
        currentState: 'Appears implemented based on selected policies.',
        evidence: '',
        gapIdentified: 'No major issues found.',
        impact,
        likelihood,
        overallRisk,
        riskLevel,
        actionPriority,
        recommendedMitigation: 'Annual review recommended.',
        targetState: 'Maintain current compliance level.',
        ownerDepartment: 'Privacy Office',
        dueDate: dayjs().add(30, 'day'),
        status: 'Auto-Filled',
        reviewedBy: '',
        reviewedOn: null,
        comments: '',
      };
    });

    setControlData(autoFillData);
  }, [selectedPolicies]);

  const updateControlData = (controlId: string, field: keyof GapControlData, value: any) => {
    setControlData((prev) => {
      const updated = {
        ...prev,
        [controlId]: {
          ...prev[controlId],
          [field]: value,
        } as GapControlData,
      };

      // Auto-calculate overall risk when impact or likelihood changes
      if (field === 'impact' || field === 'likelihood') {
        const control = updated[controlId];
        if (control.impact && control.likelihood) {
          control.overallRisk = calculateOverallRisk(control.impact, control.likelihood);
          control.riskLevel = control.overallRisk;
        }
      }

      return updated;
    });
  };

  const getControlData = (controlId: string): GapControlData => {
    return (
      controlData[controlId] || {
        confidence: '',
        answer: '',
        currentState: '',
        evidence: '',
        gapIdentified: '',
        impact: '',
        likelihood: '',
        overallRisk: '',
        riskLevel: '',
        actionPriority: '',
        recommendedMitigation: '',
        targetState: '',
        ownerDepartment: '',
        dueDate: null,
        status: '',
        reviewedBy: '',
        reviewedOn: null,
        comments: '',
      }
    );
  };

  const getControlsBySection = (controls: GapControl[], section: string) => {
    return controls.filter((control) => control.section === section);
  };

  const getReviewedCount = () => {
    return Object.values(controlData).filter(
      (data) => data.status === 'Completed' || data.status === 'Needs Review'
    ).length;
  };

  const handleMarkAsReviewed = () => {
    setSnackbarMessage('GAP marked as reviewed. ROPA generation coming soon.');
    setSnackbarOpen(true);
  };

  const handleExportPDF = () => {
    setSnackbarMessage('PDF export coming soon.');
    setSnackbarOpen(true);
  };

  const currentPolicyId = selectedPolicies[activeTab];
  const currentControls = controlsByPolicy[currentPolicyId] || [];

  const renderControlCard = (control: GapControl) => {
    const data = getControlData(control.id);
    return (
      <Card key={control.id} variant="outlined" sx={{ mb: 1 }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
          <Stack spacing={1.5}>
            {/* GROUP 1: Control Metadata */}
            <Box>
              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" sx={{ mb: 0.5 }}>
                <Typography variant="subtitle2" component="h3" sx={{ fontWeight: 600 }}>
                  {control.id}
                </Typography>
                <Chip label={control.article} size="small" variant="outlined" />
                <Chip label={control.policySource} size="small" variant="outlined" color="primary" />
                {data.confidence && (
                  <Chip
                    label={`Auto-Filled (${data.confidence} Confidence)`}
                    size="small"
                    color={getConfidenceColor(data.confidence)}
                  />
                )}
              </Stack>
            </Box>

            <Divider sx={{ my: 0.5 }} />

            {/* GROUP 2: Requirement & Assessment */}
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 600, mb: 0.75, color: 'text.primary', display: 'block' }}>
                Requirement & Assessment
              </Typography>
              <Stack spacing={1}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.25, fontSize: '0.875rem' }}>
                    {control.requirement}
                  </Typography>
                  {control.assessmentQuestion && (
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                      {control.assessmentQuestion}
                    </Typography>
                  )}
                </Box>

                <FormControl component="fieldset" sx={{ mt: 0.5 }}>
                  <Typography variant="caption" sx={{ mb: 0.25, fontWeight: 600, display: 'block', fontSize: '0.75rem' }}>
                    Answer
                  </Typography>
                  <RadioGroup
                    row
                    value={data.answer}
                    onChange={(e) =>
                      updateControlData(control.id, 'answer', e.target.value as GapControlData['answer'])
                    }
                    sx={{ gap: 1 }}
                  >
                    <FormControlLabel value="Yes" control={<Radio size="small" />} label="Yes" sx={{ m: 0 }} />
                    <FormControlLabel value="No" control={<Radio size="small" />} label="No" sx={{ m: 0 }} />
                    <FormControlLabel value="Partial" control={<Radio size="small" />} label="Partial" sx={{ m: 0 }} />
                    <FormControlLabel value="Unknown" control={<Radio size="small" />} label="Unknown" sx={{ m: 0 }} />
                  </RadioGroup>
                </FormControl>

                <TextField
                  label="Current State"
                  multiline
                  rows={1.5}
                  value={data.currentState}
                  onChange={(e) => updateControlData(control.id, 'currentState', e.target.value)}
                  placeholder="Describe the current state..."
                  fullWidth
                  size="small"
                  sx={{ mt: 0.5 }}
                />

                <Box sx={{ mt: 0.5 }}>
                  <Button variant="outlined" size="small" sx={{ py: 0.25, px: 1, fontSize: '0.75rem' }}>
                    Upload Evidence
                  </Button>
                  {data.evidence && (
                    <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontSize: '0.7rem' }}>
                      {data.evidence}
                    </Typography>
                  )}
                </Box>
              </Stack>
            </Box>

            <Divider sx={{ my: 0.5 }} />

            {/* GROUP 3: GAP + Risk Analysis */}
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 600, mb: 0.75, color: 'text.primary', display: 'block' }}>
                GAP & Risk Analysis
              </Typography>
              <Stack spacing={1}>
                <TextField
                  label="Gap Identified"
                  multiline
                  rows={1.5}
                  value={data.gapIdentified}
                  onChange={(e) => updateControlData(control.id, 'gapIdentified', e.target.value)}
                  placeholder="Describe any gaps..."
                  fullWidth
                  size="small"
                  sx={{ mt: 0.5 }}
                />

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mt: 0.5 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Impact</InputLabel>
                    <Select
                      value={data.impact}
                      label="Impact"
                      onChange={(e) => updateControlData(control.id, 'impact', e.target.value)}
                    >
                      <MenuItem value="High">High</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="Low">Low</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth size="small">
                    <InputLabel>Likelihood</InputLabel>
                    <Select
                      value={data.likelihood}
                      label="Likelihood"
                      onChange={(e) => updateControlData(control.id, 'likelihood', e.target.value)}
                    >
                      <MenuItem value="High">High</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="Low">Low</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="center">
                  <FormControl fullWidth size="small">
                    <InputLabel>Overall Risk</InputLabel>
                    <Select
                      value={data.overallRisk}
                      label="Overall Risk"
                      disabled
                      sx={{ bgcolor: 'action.disabledBackground' }}
                    >
                      <MenuItem value="High">High</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="Low">Low</MenuItem>
                    </Select>
                  </FormControl>
                  {data.overallRisk && (
                    <Chip
                      label={`${data.overallRisk}`}
                      size="small"
                      color={getRiskColor(data.overallRisk)}
                    />
                  )}
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Risk Level</InputLabel>
                    <Select
                      value={data.riskLevel}
                      label="Risk Level"
                      onChange={(e) => updateControlData(control.id, 'riskLevel', e.target.value)}
                    >
                      <MenuItem value="High">High</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="Low">Low</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth size="small">
                    <InputLabel>Action Priority</InputLabel>
                    <Select
                      value={data.actionPriority}
                      label="Action Priority"
                      onChange={(e) => updateControlData(control.id, 'actionPriority', e.target.value)}
                    >
                      <MenuItem value="High">High</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="Low">Low</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Stack>
            </Box>

            <Divider sx={{ my: 0.5 }} />

            {/* GROUP 4: Mitigation, Workflow, Ownership, Dates */}
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 600, mb: 0.75, color: 'text.primary', display: 'block' }}>
                Mitigation & Workflow
              </Typography>
              <Stack spacing={1}>
                <TextField
                  label="Recommended Action / Mitigation"
                  multiline
                  rows={1.5}
                  value={data.recommendedMitigation}
                  onChange={(e) =>
                    updateControlData(control.id, 'recommendedMitigation', e.target.value)
                  }
                  placeholder="Describe recommended actions..."
                  fullWidth
                  size="small"
                  sx={{ mt: 0.5 }}
                />

                <TextField
                  label="Target State"
                  multiline
                  rows={1.5}
                  value={data.targetState}
                  onChange={(e) => updateControlData(control.id, 'targetState', e.target.value)}
                  placeholder="Describe the desired target state..."
                  fullWidth
                  size="small"
                />

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Owner</InputLabel>
                    <Select
                      value={data.ownerDepartment}
                      label="Owner"
                      onChange={(e) => updateControlData(control.id, 'ownerDepartment', e.target.value)}
                    >
                      {departments.map((dept) => (
                        <MenuItem key={dept} value={dept}>
                          {dept}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <DatePicker
                    label="Due Date"
                    value={data.dueDate}
                    onChange={(date) => updateControlData(control.id, 'dueDate', date)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: 'small',
                      },
                    }}
                  />
                </Stack>

                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={data.status}
                    label="Status"
                    onChange={(e) => updateControlData(control.id, 'status', e.target.value)}
                  >
                    <MenuItem value="Not Started">Not Started</MenuItem>
                    <MenuItem value="Auto-Filled">Auto-Filled</MenuItem>
                    <MenuItem value="Needs Review">Needs Review</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </FormControl>

                {data.status === 'Completed' && (
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <TextField
                      label="Reviewed By"
                      value={data.reviewedBy}
                      onChange={(e) => updateControlData(control.id, 'reviewedBy', e.target.value)}
                      fullWidth
                      size="small"
                    />
                    <DatePicker
                      label="Reviewed On"
                      value={data.reviewedOn}
                      onChange={(date) => updateControlData(control.id, 'reviewedOn', date)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          size: 'small',
                        },
                      }}
                    />
                  </Stack>
                )}

                <TextField
                  label="Comments"
                  multiline
                  rows={1.5}
                  value={data.comments}
                  onChange={(e) => updateControlData(control.id, 'comments', e.target.value)}
                  placeholder="Add any additional notes..."
                  fullWidth
                  size="small"
                />
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    );
  };

  if (selectedPolicies.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          No policies selected. Please go back and select policies first.
        </Typography>
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '100%',
          minWidth: 0,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            backgroundColor: 'background.paper',
            pb: 1,
            mb: 2,
          }}
        >
          <Stack spacing={1}>
            <Box>
              <Typography variant="h5" component="h1" sx={{ fontWeight: 600, mb: 0.25, fontSize: '1.25rem' }}>
                PDPL GAP Assessment – Initial Setup
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                Auto-filled using Pre-Qual + Selected Policies
              </Typography>
            </Box>
            <Box>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 0.5 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                  {getReviewedCount()} of {allControls.length} controls reviewed
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={(getReviewedCount() / allControls.length) * 100}
                sx={{ height: 6, borderRadius: 1 }}
              />
            </Box>
            <Divider sx={{ my: 0 }} />
          </Stack>
        </Box>

        {/* Tabs */}
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            mb: 2,
            backgroundColor: 'background.paper',
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {selectedPolicies.map((policyId) => (
              <Tab
                key={policyId}
                label={policyDisplayNames[policyId] || policyId}
                sx={{ textTransform: 'none', fontWeight: 500 }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Content - No internal scroll */}
        <Box sx={{ pr: 1 }}>
          <Stack spacing={0.5} sx={{ py: 1 }}>
            {sections.map((section) => {
              const sectionControls = getControlsBySection(currentControls, section);
              if (sectionControls.length === 0) return null;

              return (
                <Accordion key={section} defaultExpanded sx={{ '&:before': { display: 'none' } }}>
                  <AccordionSummary 
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ 
                      minHeight: 40,
                      '&.Mui-expanded': { minHeight: 40 },
                      px: 1.5,
                      py: 0.5
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      {section} ({sectionControls.length} {sectionControls.length === 1 ? 'control' : 'controls'})
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 1, py: 0.5 }}>
                    <Stack spacing={0}>
                      {sectionControls.map((control) => renderControlCard(control))}
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Stack>
        </Box>

        {/* Footer - Not sticky */}
        <Box
          sx={{
            borderTop: '1px solid',
            borderColor: 'divider',
            p: 3,
            mt: 4,
            backgroundColor: 'background.paper',
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
          }}
        >
          <Button variant="contained" color="primary" onClick={handleMarkAsReviewed}>
            Mark GAP Assessment as Reviewed
          </Button>
          <Button variant="outlined" onClick={handleExportPDF}>
            Export PDF
          </Button>
        </Box>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </LocalizationProvider>
  );
}
