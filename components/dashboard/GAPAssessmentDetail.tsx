'use client'

import { useState, useEffect, useMemo, memo } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
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
  policySource: string;
}

interface GapControlData {
  confidence: 'High' | 'Medium' | 'Low' | '';
  answer: 'Yes' | 'No' | 'Partial' | 'Unknown' | '';
  currentState: string;
  evidence: string;
  gapIdentified: string;
  internalNotes: string;
  impact: 'High' | 'Medium' | 'Low' | '';
  likelihood: 'High' | 'Medium' | 'Low' | '';
  overallRisk: 'High' | 'Medium' | 'Low' | '';
  riskLevel: 'High' | 'Medium' | 'Low' | '';
  actionPriority: 'High' | 'Medium' | 'Low' | '';
  recommendedMitigation: string;
  targetState: string;
  ownerDepartment: string;
  dueDate: Dayjs | null;
  status: 'Not Started' | 'Auto-Filled' | 'Needs Review' | 'In Progress' | 'Completed' | '';
  reviewedBy: string;
  reviewedOn: Dayjs | null;
  comments: string;
  isReviewed: boolean;
}

const policyDisplayNames: Record<string, string> = {
  'iso-27001-clause-5': 'Clause 5',
  'iso-27002-clause-6': 'Clause 6',
  'iso-27701-annex-a': 'Annex A',
  'iso-27701-annex-b': 'Annex B',
  'pdpl-ksa': 'PDPL',
  'pdpl-executive': 'PDPL Executive Regulations',
  'nca-data-mgmt': 'NCA Data Management Guidelines',
  'privacy-policy': 'Privacy Policy',
  'info-security-policy': 'Information Security Policy',
  'data-retention-policy': 'Data Retention Policy',
  'access-control-policy': 'Access Control Policy',
  'hr-data-handling': 'HR Data Handling Policy',
};

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

interface ControlCardProps {
  control: GapControl;
  data: GapControlData;
  onUpdate: (field: keyof GapControlData, value: any) => void;
}

const ControlCard = memo(({ control, data, onUpdate }: ControlCardProps) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    requirement: true,
    gap: false,
    mitigation: false,
  });

  const handleSectionToggle = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Generate agent insight text
  const agentInsight = useMemo(() => {
    const confidence = data.confidence || 'Medium';
    const riskPrediction = data.overallRisk || 'Medium';
    if (data.answer === 'Yes' || data.answer === 'Partial') {
      return `This control appears compliant based on selected policies.`;
    }
    return `This control requires review. Gap identified: ${data.gapIdentified || 'No major gaps predicted.'}`;
  }, [control.article, data.gapIdentified, data.overallRisk, data.confidence, data.answer]);

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 0,
        border: 'none',
        borderRadius: 0,
        boxShadow: 'none',
        backgroundColor: 'background.paper',
        position: 'relative',
        '&:hover': {
          backgroundColor: 'var(--primary-muted)',
        },
        ...(data.isReviewed && {
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '3px',
            backgroundColor: 'success.main',
          },
        }),
      }}
    >
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        {/* Card Header */}
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" sx={{ mb: 1 }}>
            <Typography variant="subtitle2" component="h3" sx={{ fontWeight: 600, fontSize: '14px' }}>
              {control.id}
            </Typography>
            <Chip label={control.article} size="small" variant="outlined" sx={{ fontSize: '12px', height: 24 }} />
            <Chip
              label={control.policySource}
              size="small"
              variant="outlined"
              color="primary"
              sx={{ fontSize: '12px', height: 24 }}
            />
            <Box sx={{ flexGrow: 1 }} />
            {/* Review Checkbox - Right Aligned */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.isReviewed || false}
                  onChange={(e) => onUpdate('isReviewed', e.target.checked)}
                  size="small"
                />
              }
              label={
                <Typography variant="caption" sx={{ fontSize: '12px', color: 'text.secondary' }}>
                  Mark as reviewed
                </Typography>
              }
            />
          </Stack>

          {/* Agent Insight Strip */}
          <Box
            sx={{
              backgroundColor: 'var(--primary-muted)',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '6px',
              p: 1,
              mt: 1,
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
              <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '12px', color: 'text.secondary' }}>
                Agent Insight:
              </Typography>
              <Typography variant="caption" sx={{ fontSize: '12px', color: 'text.secondary', flex: 1 }}>
                {agentInsight}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  label={`Confidence: ${data.confidence || 'Medium'}`}
                  size="small"
                  color={getConfidenceColor(data.confidence || 'Medium')}
                  sx={{ fontSize: '11px', height: 20 }}
                />
                {data.overallRisk && (
                  <Chip
                    label={`Risk Prediction: ${data.overallRisk}`}
                    size="small"
                    color={getRiskColor(data.overallRisk)}
                    sx={{ fontSize: '11px', height: 20 }}
                  />
                )}
              </Stack>
            </Stack>
          </Box>
        </Box>

        {/* Subsection 1: Requirement & Assessment (Open by Default) */}
        <Accordion
          expanded={expandedSections.requirement}
          onChange={() => handleSectionToggle('requirement')}
          sx={{
            boxShadow: 'none',
            '&:before': { display: 'none' },
            '&.Mui-expanded': { margin: 0 },
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '8px',
            mb: 1,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ fontSize: '18px' }} />}
            sx={{
              minHeight: 36,
              px: 1.5,
              py: 0.5,
              '&.Mui-expanded': { minHeight: 36 },
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '12px', color: 'text.secondary' }}>
              {expandedSections.requirement ? '▼' : '▶'} Requirement & Assessment
            </Typography>
          </AccordionSummary>
          {expandedSections.requirement && (
            <AccordionDetails sx={{ px: 1.5, pb: 1.5 }}>
              <Stack spacing={1.5}>
                {/* Requirement Block */}
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5, fontSize: '14px', lineHeight: '20px' }}>
                    {control.requirement}
                  </Typography>
                  {control.assessmentQuestion && (
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '12px', lineHeight: '18px' }}>
                      {control.assessmentQuestion}
                    </Typography>
                  )}
                </Box>

                {/* Answer Block */}
                <Box>
                  <Typography variant="caption" sx={{ mb: 0.5, fontWeight: 600, display: 'block', fontSize: '12px' }}>
                    Answer
                  </Typography>
                  <RadioGroup
                    row
                    value={data.answer}
                    onChange={(e) => onUpdate('answer', e.target.value)}
                    sx={{ gap: 1 }}
                  >
                    <FormControlLabel value="Yes" control={<Radio size="small" />} label="Yes" sx={{ m: 0 }} />
                    <FormControlLabel value="No" control={<Radio size="small" />} label="No" sx={{ m: 0 }} />
                    <FormControlLabel value="Partial" control={<Radio size="small" />} label="Partial" sx={{ m: 0 }} />
                    <FormControlLabel value="Unknown" control={<Radio size="small" />} label="Unknown" sx={{ m: 0 }} />
                  </RadioGroup>
                </Box>

                {/* 2-Column Layout */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    columnGap: 3,
                    rowGap: 1.5,
                  }}
                >
                  {/* Left Column - Qualitative */}
                  <Box>
                    <TextField
                      label="Current State"
                      multiline
                      rows={2}
                      value={data.currentState}
                      onChange={(e) => onUpdate('currentState', e.target.value)}
                      placeholder="Describe the current state..."
                      fullWidth
                      size="small"
                      sx={{ fontSize: '14px', mb: 1.5 }}
                    />
                    <Button variant="outlined" size="small" sx={{ py: 0.25, px: 1, fontSize: '12px' }}>
                      Attach Evidence
                    </Button>
                  </Box>

                  {/* Right Column - Quantitative (empty for Requirement section) */}
                  <Box />
                </Box>
              </Stack>
            </AccordionDetails>
          )}
        </Accordion>

        {/* Subsection 2: GAP & Risk Analysis (Collapsed by Default) */}
        <Accordion
          expanded={expandedSections.gap}
          onChange={() => handleSectionToggle('gap')}
          sx={{
            boxShadow: 'none',
            '&:before': { display: 'none' },
            '&.Mui-expanded': { margin: 0 },
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '8px',
            mb: 1,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ fontSize: '18px' }} />}
            sx={{
              minHeight: 36,
              px: 1.5,
              py: 0.5,
              '&.Mui-expanded': { minHeight: 36 },
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '12px', color: 'text.secondary' }}>
              {expandedSections.gap ? '▼' : '▶'} GAP & Risk Analysis
            </Typography>
          </AccordionSummary>
          {expandedSections.gap && (
            <AccordionDetails sx={{ px: 1.5, pb: 1.5 }}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                  columnGap: 3,
                  rowGap: 1.5,
                }}
              >
                {/* Left Column - Qualitative */}
                <Box>
                  <TextField
                    label="Gap Description"
                    multiline
                    rows={3}
                    value={data.gapIdentified}
                    onChange={(e) => onUpdate('gapIdentified', e.target.value)}
                    placeholder="Describe any gaps..."
                    fullWidth
                    size="small"
                    sx={{ fontSize: '14px', mb: 1.5 }}
                  />
                  <TextField
                    label="Recommended Action"
                    multiline
                    rows={2}
                    value={data.recommendedMitigation}
                    onChange={(e) => onUpdate('recommendedMitigation', e.target.value)}
                    placeholder="Describe recommended actions..."
                    fullWidth
                    size="small"
                    sx={{ fontSize: '14px' }}
                  />
                </Box>

                {/* Right Column - Quantitative */}
                <Box>
                  <Stack spacing={1.5}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Risk Level</InputLabel>
                      <Select
                        value={data.riskLevel}
                        label="Risk Level"
                        onChange={(e) => onUpdate('riskLevel', e.target.value)}
                      >
                        <MenuItem value="High">High</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl fullWidth size="small">
                      <InputLabel>Impact</InputLabel>
                      <Select
                        value={data.impact}
                        label="Impact"
                        onChange={(e) => onUpdate('impact', e.target.value)}
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
                        onChange={(e) => onUpdate('likelihood', e.target.value)}
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
                        onChange={(e) => onUpdate('actionPriority', e.target.value)}
                      >
                        <MenuItem value="High">High</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </Box>
              </Box>
            </AccordionDetails>
          )}
        </Accordion>

        {/* Subsection 3: Mitigation & Workflow (Collapsed by Default) */}
        <Accordion
          expanded={expandedSections.mitigation}
          onChange={() => handleSectionToggle('mitigation')}
          sx={{
            boxShadow: 'none',
            '&:before': { display: 'none' },
            '&.Mui-expanded': { margin: 0 },
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '8px',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ fontSize: '18px' }} />}
            sx={{
              minHeight: 36,
              px: 1.5,
              py: 0.5,
              '&.Mui-expanded': { minHeight: 36 },
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '12px', color: 'text.secondary' }}>
              {expandedSections.mitigation ? '▼' : '▶'} Mitigation & Workflow
            </Typography>
          </AccordionSummary>
          {expandedSections.mitigation && (
            <AccordionDetails sx={{ px: 1.5, pb: 1.5 }}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                  columnGap: 3,
                  rowGap: 1.5,
                }}
              >
                {/* Left Column - Qualitative */}
                <Box>
                  <TextField
                    label="Recommended Action"
                    multiline
                    rows={2}
                    value={data.recommendedMitigation}
                    onChange={(e) => onUpdate('recommendedMitigation', e.target.value)}
                    placeholder="Describe recommended actions..."
                    fullWidth
                    size="small"
                    sx={{ fontSize: '14px', mb: 1.5 }}
                  />
                  <TextField
                    label="Target State"
                    multiline
                    rows={2}
                    value={data.targetState}
                    onChange={(e) => onUpdate('targetState', e.target.value)}
                    placeholder="Describe the desired target state..."
                    fullWidth
                    size="small"
                    sx={{ fontSize: '14px', mb: 1.5 }}
                  />
                  <TextField
                    label="Comments"
                    multiline
                    rows={2}
                    value={data.comments}
                    onChange={(e) => onUpdate('comments', e.target.value)}
                    placeholder="Add any additional notes..."
                    fullWidth
                    size="small"
                    sx={{ fontSize: '14px' }}
                  />
                </Box>

                {/* Right Column - Quantitative */}
                <Box>
                  <Stack spacing={1.5}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Owner</InputLabel>
                      <Select
                        value={data.ownerDepartment}
                        label="Owner"
                        onChange={(e) => onUpdate('ownerDepartment', e.target.value)}
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
                      onChange={(date) => onUpdate('dueDate', date)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          size: 'small',
                        },
                      }}
                    />

                    <FormControl fullWidth size="small">
                      <InputLabel>Status</InputLabel>
                      <Select value={data.status} label="Status" onChange={(e) => onUpdate('status', e.target.value)}>
                        <MenuItem value="Not Started">Not Started</MenuItem>
                        <MenuItem value="Auto-Filled">Auto-Filled</MenuItem>
                        <MenuItem value="Needs Review">Needs Review</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                      </Select>
                    </FormControl>

                    {data.status === 'Completed' && (
                      <>
                        <TextField
                          label="Reviewed By"
                          value={data.reviewedBy}
                          onChange={(e) => onUpdate('reviewedBy', e.target.value)}
                          fullWidth
                          size="small"
                        />
                        <DatePicker
                          label="Reviewed On"
                          value={data.reviewedOn}
                          onChange={(date) => onUpdate('reviewedOn', date)}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              size: 'small',
                            },
                          }}
                        />
                      </>
                    )}
                  </Stack>
                </Box>
              </Box>
            </AccordionDetails>
          )}
        </Accordion>
      </CardContent>
    </Card>
  );
});

export default function GAPAssessmentDetail() {
  // Always start with empty array to ensure SSR/client match
  const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [controlData, setControlData] = useState<Record<string, GapControlData>>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [mounted, setMounted] = useState(false);

  // Load from localStorage only after hydration
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem('kaitaki_selected_policies');
      if (stored) {
        const policies = JSON.parse(stored);
        if (policies.length > 0) {
          setSelectedPolicies(policies);
          setIsLoading(false);
          return;
        }
      }
      // Default fallback
      setSelectedPolicies(['pdpl-ksa']);
      setIsLoading(false);
    } catch (e) {
      // Fallback on parse error
      setSelectedPolicies(['pdpl-ksa']);
      setIsLoading(false);
    }
  }, []);

  // Generate all controls for selected policies
  const allControls = useMemo(() => {
    return selectedPolicies.flatMap((policyId) => generateControlsForPolicy(policyId));
  }, [selectedPolicies]);

  // Group controls by policy
  const controlsByPolicy = useMemo(() => {
    return selectedPolicies.reduce((acc, policyId) => {
      acc[policyId] = allControls.filter((control) => control.policy === policyId);
      return acc;
    }, {} as Record<string, GapControl[]>);
  }, [selectedPolicies, allControls]);

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
        internalNotes: '',
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
        isReviewed: false,
      };
    });

    setControlData(autoFillData);
  }, [selectedPolicies, allControls]);

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
        internalNotes: '',
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
        isReviewed: false,
      }
    );
  };

  const getControlsBySection = (controls: GapControl[], section: string) => {
    return controls.filter((control) => control.section === section);
  };

  const getReviewedCount = () => {
    return Object.values(controlData).filter((data) => data.isReviewed).length;
  };

  const handleMarkAsReviewed = () => {
    setSnackbarMessage('GAP marked as reviewed. ROPA generation coming soon.');
    setSnackbarOpen(true);
  };

  const handleExportPDF = () => {
    setSnackbarMessage('PDF export coming soon.');
    setSnackbarOpen(true);
  };


  // Only render controls for active tab (lazy rendering) - moved to render section

  // Show loading state during hydration or while loading policies
  if (!mounted || isLoading) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  // Only show error if we've finished loading and still have no policies
  if (selectedPolicies.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          No policies selected. Please go back and select policies first.
        </Typography>
      </Box>
    );
  }

  // Calculate reviewed count for current tab only
  const currentPolicyId = selectedPolicies[activeTab];
  const currentControls = controlsByPolicy[currentPolicyId] || [];
  const currentReviewedCount = currentControls.filter((control) => {
    const data = getControlData(control.id);
    return data.isReviewed;
  }).length;

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
        {/* Policy Tabs - Above Header */}
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            backgroundColor: 'background.paper',
            position: 'sticky',
            top: 0,
            zIndex: 11,
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 500,
                minHeight: 48,
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--primary-muted)',
                borderRadius: '8px 8px 0 0',
                marginRight: '8px',
                border: '1px solid transparent',
                borderBottom: 'none',
                '&.Mui-selected': {
                  color: 'var(--text-primary)',
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--border)',
                  borderBottom: 'none',
                  boxShadow: '0 -2px 8px rgba(0,0,0,0.03)',
                },
              },
              '& .MuiTabs-indicator': {
                display: 'none',
              },
            }}
          >
            {selectedPolicies.map((policyId) => (
              <Tab
                key={policyId}
                label={policyDisplayNames[policyId] || policyId}
              />
            ))}
          </Tabs>
        </Box>

        {/* Sticky Compact Header */}
        <Box
          sx={{
            position: 'sticky',
            top: 48,
            zIndex: 10,
            backgroundColor: 'background.paper',
            py: 1.5,
            mb: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h6" component="h1" sx={{ fontWeight: 600, fontSize: '16px', lineHeight: 1.2 }}>
                PDPL GAP – Initial Setup
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '12px' }}>
                Auto-filled using Pre-Qual + Selected Policies
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '14px', fontWeight: 500 }}>
              {currentReviewedCount}/{currentControls.length} Reviewed
            </Typography>
          </Stack>
        </Box>

        {/* Content - Full-Width Section Bars with Control Cards */}
        <Box sx={{ pr: 1 }}>
          {sections.map((section) => {
            const sectionControls = getControlsBySection(currentControls, section);
            if (sectionControls.length === 0) return null;

            return (
              <Box key={section} sx={{ mt: 3, mb: 2 }}>
                {/* Full-Width Section Bar */}
                <Box
                  sx={{
                    backgroundColor: 'var(--primary-muted)',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderBottom: 'none',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                    px: 2,
                    py: 1.5,
                    mb: 0,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '14px', color: 'text.primary' }}>
                    {section} ({sectionControls.length} {sectionControls.length === 1 ? 'Control' : 'Controls'})
                  </Typography>
                </Box>

                {/* Control Cards */}
                <Box sx={{ border: '1px solid', borderColor: 'divider', borderTop: 'none', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px', overflow: 'hidden', backgroundColor: 'background.paper' }}>
                  {sectionControls.map((control, index) => {
                    const data = getControlData(control.id);
                    return (
                      <Box 
                        key={control.id} 
                        sx={{ 
                          borderBottom: index < sectionControls.length - 1 ? '1px solid' : 'none', 
                          borderColor: 'divider',
                          '&:last-child .MuiCard-root': {
                            borderBottomLeftRadius: '8px',
                            borderBottomRightRadius: '8px',
                          },
                        }}
                      >
                        <ControlCard
                          control={control}
                          data={data}
                          onUpdate={(field, value) => updateControlData(control.id, field, value)}
                        />
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Sticky Footer - Minimal */}
        <Box
          sx={{
            position: 'sticky',
            bottom: 0,
            zIndex: 10,
            borderTop: '1px solid',
            borderColor: 'divider',
            p: 1.5,
            mt: 4,
            backgroundColor: 'background.paper',
            display: 'flex',
            gap: 2,
            justifyContent: 'flex-end',
          }}
        >
          <Button variant="contained" color="primary" onClick={handleMarkAsReviewed} size="small">
            Mark GAP Assessment as Reviewed
          </Button>
          <Button variant="outlined" onClick={handleExportPDF} size="small">
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
