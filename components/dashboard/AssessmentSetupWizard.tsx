'use client'

import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

interface AssessmentSetupWizardProps {
  open: boolean;
  onClose: () => void;
  activityName: string;
  assessmentType: string;
  reason: string;
}

const steps = ['Basic Info', 'Assign Owner', 'Add Participants', 'Choose Scheduling', 'Confirm'];

const owners = ['Privacy Champion', 'DPO', 'IT Security Lead', 'Marketing Lead', 'Legal Counsel'];

const defaultParticipants = [
  'product@company.com',
  'engineering@company.com',
  'legal@company.com',
  'security@company.com',
];

export default function AssessmentSetupWizard({
  open,
  onClose,
  activityName,
  assessmentType,
  reason,
}: AssessmentSetupWizardProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    activityName,
    assessmentType,
    reason,
    owner: '',
    participants: [] as string[],
    schedulingOption: 'now',
    scheduledDate: null as Dayjs | null,
    scheduledTime: '',
  });

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleComplete = () => {
    console.log('Assessment started:', formData);
    // In a real app, this would trigger the assessment
    onClose();
    setActiveStep(0);
    setFormData({
      activityName,
      assessmentType,
      reason,
      owner: '',
      participants: [],
      schedulingOption: 'now',
      scheduledDate: null,
      scheduledTime: '',
    });
  };

  const handleClose = () => {
    onClose();
    setActiveStep(0);
    setFormData({
      activityName,
      assessmentType,
      reason,
      owner: '',
      participants: [],
      schedulingOption: 'now',
      scheduledDate: null,
      scheduledTime: '',
    });
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Stack spacing={2}>
            <TextField
              label="Processing Activity Name"
              value={formData.activityName}
              fullWidth
              size="small"
              disabled
            />
            <FormControl fullWidth size="small">
              <InputLabel>Assessment Type</InputLabel>
              <Select value={formData.assessmentType} label="Assessment Type" disabled>
                <MenuItem value={formData.assessmentType}>{formData.assessmentType}</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Reason"
              value={formData.reason}
              fullWidth
              multiline
              rows={2}
              size="small"
              disabled
            />
            <Box
              sx={{
                p: 1.5,
                backgroundColor: 'info.light',
                border: '1px solid',
                borderColor: 'info.main',
                borderRadius: '8px',
              }}
            >
              <Typography variant="caption" sx={{ fontSize: '12px', color: 'text.primary' }}>
                💡 Kaitaki will assist with automated voice-driven assessment once started.
              </Typography>
            </Box>
          </Stack>
        );

      case 1:
        return (
          <Stack spacing={2}>
            <FormControl fullWidth size="small" required>
              <InputLabel>Assign Owner</InputLabel>
              <Select
                value={formData.owner}
                label="Assign Owner"
                onChange={(e) => setFormData((prev) => ({ ...prev, owner: e.target.value }))}
              >
                {owners.map((owner) => (
                  <MenuItem key={owner} value={owner}>
                    {owner}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        );

      case 2:
        return (
          <Stack spacing={2}>
            <Typography variant="body2" sx={{ fontSize: '14px', color: 'text.secondary' }}>
              Select participants for this assessment:
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Participants</InputLabel>
              <Select
                multiple
                value={formData.participants}
                label="Participants"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, participants: e.target.value as string[] }))
                }
                renderValue={(selected) => (
                  <Stack direction="row" spacing={0.5} flexWrap="wrap">
                    {(selected as string[]).map((email) => (
                      <Chip key={email} label={email} size="small" sx={{ fontSize: '11px', height: 22 }} />
                    ))}
                  </Stack>
                )}
              >
                {defaultParticipants.map((email) => (
                  <MenuItem key={email} value={email}>
                    <Checkbox checked={formData.participants.indexOf(email) > -1} />
                    {email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        );

      case 3:
        return (
          <Stack spacing={2}>
            <FormControl component="fieldset">
              <RadioGroup
                value={formData.schedulingOption}
                onChange={(e) => setFormData((prev) => ({ ...prev, schedulingOption: e.target.value }))}
              >
                <FormControlLabel value="now" control={<Radio />} label="Start Now (instant voice agent)" />
                <FormControlLabel
                  value="later"
                  control={<Radio />}
                  label="Schedule for Later"
                  sx={{ mb: formData.schedulingOption === 'later' ? 1 : 0 }}
                />
                {formData.schedulingOption === 'later' && (
                  <Box sx={{ ml: 4, mb: 2 }}>
                    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                      <DatePicker
                        label="Date"
                        value={formData.scheduledDate}
                        onChange={(date) => setFormData((prev) => ({ ...prev, scheduledDate: date }))}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            size: 'small',
                          },
                        }}
                      />
                      <TextField
                        label="Time"
                        type="time"
                        value={formData.scheduledTime}
                        onChange={(e) => setFormData((prev) => ({ ...prev, scheduledTime: e.target.value }))}
                        fullWidth
                        size="small"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Stack>
                  </Box>
                )}
                <FormControlLabel value="invite" control={<Radio />} label="Send Invite Link" />
              </RadioGroup>
            </FormControl>
          </Stack>
        );

      case 4:
        return (
          <Stack spacing={2}>
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={1.5}>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '12px' }}>
                      Activity
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 500 }}>
                      {formData.activityName}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '12px' }}>
                      Assessment Type
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 500 }}>
                      {formData.assessmentType}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '12px' }}>
                      Owner
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 500 }}>
                      {formData.owner || 'Not assigned'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '12px' }}>
                      Participants
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 500 }}>
                      {formData.participants.length > 0 ? formData.participants.join(', ') : 'None'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '12px' }}>
                      Scheduling
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 500 }}>
                      {formData.schedulingOption === 'now'
                        ? 'Start Now'
                        : formData.schedulingOption === 'later'
                          ? `Scheduled for ${formData.scheduledDate?.format('MMM D, YYYY')} at ${formData.scheduledTime}`
                          : 'Send Invite Link'}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        );

      default:
        return null;
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth PaperProps={{ sx: { maxHeight: '90vh' } }}>
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '18px' }}>
              Assessment Setup Wizard
            </Typography>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Box sx={{ minHeight: 200 }}>{renderStepContent()}</Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
          <Button onClick={handleClose} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Stack direction="row" spacing={1}>
            {activeStep > 0 && (
              <Button onClick={handleBack} sx={{ textTransform: 'none' }}>
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              variant="contained"
              disabled={activeStep === 1 && !formData.owner}
              sx={{ textTransform: 'none' }}
            >
              {activeStep === steps.length - 1
                ? formData.schedulingOption === 'now'
                  ? 'Start Voice Assessment'
                  : 'Send Invitations'
                : 'Next'}
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}

