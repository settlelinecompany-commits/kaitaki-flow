'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Stack,
  Typography,
  TextField,
  Card,
  CardContent,
  Chip,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  CircularProgress,
  LinearProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import ReviewSummarySidebar from './ReviewSummarySidebar';
import SignOffModal from './SignOffModal';

interface Question {
  id: string;
  question: string;
  article: string;
  answer: string;
  voiceSnippet: string;
  completeness: number;
  kaiSuggestion: {
    missing: string | null;
    idealAnswer: string;
  };
}

interface Section {
  id: string;
  name: string;
  questions: Question[];
  status: 'complete' | 'partial' | 'missing';
}

const mockSections: Section[] = [
  {
    id: 'processing-principles',
    name: 'Processing Principles',
    status: 'partial',
    questions: [
      {
        id: 'pp-1',
        question: 'Is personal data collected only for specified, explicit, and lawful purposes?',
        article: 'PDPL Article 11',
        answer: 'Yes, we collect email addresses and names during registration for account creation.',
        voiceSnippet: 'User said: "Yes, we collect email addresses and names during registration."',
        completeness: 75,
        kaiSuggestion: {
          missing: 'Consider specifying the exact purposes and legal basis for collection.',
          idealAnswer: 'Yes. We collect email addresses and names solely for account creation and user authentication purposes. This processing is necessary for the performance of a contract (Article 6(1)(b) of PDPL).',
        },
      },
      {
        id: 'pp-2',
        question: 'Do you collect only the minimum personal data necessary to achieve your purpose?',
        article: 'PDPL Article 11',
        answer: 'Yes, we only collect what is needed.',
        voiceSnippet: 'User said: "Yes, we only collect what is needed."',
        completeness: 45,
        kaiSuggestion: {
          missing: 'Your answer is too vague. Provide specific examples of what data you collect and why each field is necessary.',
          idealAnswer: 'Yes. We collect only the following personal data: (1) Email address - required for account authentication and communication, (2) Full name - required for account identification and personalization. We do not collect any additional personal data beyond what is strictly necessary for these purposes.',
        },
      },
    ],
  },
  {
    id: 'notices-ds-rights',
    name: 'Notices & Data Subject Rights',
    status: 'partial',
    questions: [
      {
        id: 'dsr-1',
        question: 'Do you inform data subjects of their rights under PDPL?',
        article: 'PDPL Article 12',
        answer: 'Yes, we have a privacy policy that mentions rights.',
        voiceSnippet: 'User said: "Yes, we have a privacy policy."',
        completeness: 60,
        kaiSuggestion: {
          missing: 'PDPL requires specific information about data subject rights. Specify which rights you inform users about and how they can exercise them.',
          idealAnswer: 'Yes. Our privacy policy clearly informs data subjects of their rights under PDPL, including: (1) Right of access, (2) Right to rectification, (3) Right to erasure, (4) Right to restrict processing, (5) Right to data portability, (6) Right to object. We provide contact information (privacy@company.com) and a clear process for exercising these rights within 30 days of request.',
        },
      },
    ],
  },
  {
    id: 'legal-basis',
    name: 'Legal Basis',
    status: 'complete',
    questions: [
      {
        id: 'lb-1',
        question: 'If you are not relying on consent, is the legal basis documented?',
        article: 'PDPL Article 6',
        answer: 'Yes. We rely on contractual necessity for account creation and legitimate interest for marketing communications. This is documented in our Data Processing Register and privacy policy.',
        voiceSnippet: 'User said: "We use contractual necessity for accounts and legitimate interest for marketing."',
        completeness: 95,
        kaiSuggestion: {
          missing: null,
          idealAnswer: 'Excellent. Consider adding specific references to the contract terms and legitimate interest assessment (LIA) documentation.',
        },
      },
    ],
  },
  {
    id: 'consent',
    name: 'Consent',
    status: 'missing',
    questions: [
      {
        id: 'consent-1',
        question: 'Is consent collected separately from terms and conditions?',
        article: 'PDPL Article 5',
        answer: '',
        voiceSnippet: 'No answer provided during interview.',
        completeness: 0,
        kaiSuggestion: {
          missing: 'This question was not answered during the voice assessment. Please provide a response.',
          idealAnswer: 'Yes. Consent for data processing is collected separately from our Terms and Conditions. Users must actively opt-in via a dedicated consent checkbox. Consent can be withdrawn at any time through account settings or by contacting privacy@company.com.',
        },
      },
    ],
  },
  {
    id: 'processors',
    name: 'Processors',
    status: 'complete',
    questions: [
      {
        id: 'proc-1',
        question: 'Do you have written contracts with all data processors?',
        article: 'PDPL Article 19',
        answer: 'Yes, all our data processors have signed Data Processing Agreements (DPAs) that include the required PDPL clauses. These are stored in our vendor management system.',
        voiceSnippet: 'User said: "All processors have DPAs with PDPL clauses."',
        completeness: 90,
        kaiSuggestion: {
          missing: null,
          idealAnswer: 'Excellent. Ensure DPAs are regularly reviewed and updated to reflect any changes in processing activities or regulations.',
        },
      },
    ],
  },
  {
    id: 'transfers',
    name: 'Transfers',
    status: 'partial',
    questions: [
      {
        id: 'transfer-1',
        question: 'Do you transfer personal data outside of Saudi Arabia?',
        article: 'PDPL Article 28',
        answer: 'Yes, we use cloud services in the USA.',
        voiceSnippet: 'User said: "Yes, we use cloud services in the USA."',
        completeness: 50,
        kaiSuggestion: {
          missing: 'You must specify the transfer mechanisms in place (SCCs, adequacy decisions, etc.) and any supplementary measures.',
          idealAnswer: 'Yes. We transfer personal data to the USA for cloud hosting services. We use Standard Contractual Clauses (SCCs) approved by the SDAIA and have implemented supplementary technical measures including encryption at rest and in transit. A Transfer Impact Assessment (TIA) has been completed and is available upon request.',
        },
      },
    ],
  },
  {
    id: 'retention',
    name: 'Retention',
    status: 'partial',
    questions: [
      {
        id: 'retention-1',
        question: 'Do you have clear data retention periods defined?',
        article: 'PDPL Article 7',
        answer: 'We keep data as long as needed.',
        voiceSnippet: 'User said: "We keep data as long as needed."',
        completeness: 40,
        kaiSuggestion: {
          missing: 'PDPL requires specific retention periods. Define exact timeframes for each category of personal data.',
          idealAnswer: 'Yes. We have defined retention periods: (1) Account data - retained for 7 years after account closure for legal compliance, (2) Marketing consent data - retained until withdrawal of consent, (3) Transaction data - retained for 5 years for financial record-keeping. Data is automatically deleted at the end of retention periods.',
        },
      },
    ],
  },
  {
    id: 'toms',
    name: 'TOMs (Technical & Organizational Measures)',
    status: 'complete',
    questions: [
      {
        id: 'tom-1',
        question: 'Do you apply appropriate technical and organizational measures to protect personal data?',
        article: 'PDPL Article 20',
        answer: 'Yes. We use encryption (AES-256), access controls, regular security audits, and employee training programs. Our security measures are documented in our Information Security Policy.',
        voiceSnippet: 'User said: "We use encryption, access controls, and regular audits."',
        completeness: 92,
        kaiSuggestion: {
          missing: null,
          idealAnswer: 'Excellent. Consider adding specific details about incident response procedures and breach notification processes.',
        },
      },
    ],
  },
  {
    id: 'governance',
    name: 'Governance',
    status: 'partial',
    questions: [
      {
        id: 'gov-1',
        question: 'Do you maintain internal records of processing activities?',
        article: 'PDPL Article 30',
        answer: 'Yes, we have a ROPA.',
        voiceSnippet: 'User said: "Yes, we have a ROPA."',
        completeness: 55,
        kaiSuggestion: {
          missing: 'Specify whether the ROPA is up-to-date, where it is maintained, and how often it is reviewed.',
          idealAnswer: 'Yes. We maintain a comprehensive Record of Processing Activities (ROPA) in our privacy management system. The ROPA is reviewed quarterly and updated whenever processing activities change. It includes all required elements under PDPL Article 30: purposes, data categories, recipients, transfers, retention periods, and security measures.',
        },
      },
    ],
  },
];

export default function QuestionnaireReviewPage() {
  const router = useRouter();
  const [sections, setSections] = useState<Section[]>(mockSections);
  const [reviewedSections, setReviewedSections] = useState<Set<string>>(new Set());
  const [signOffModalOpen, setSignOffModalOpen] = useState(false);
  const [isSignedOff, setIsSignedOff] = useState(false);

  // Debug: Log when component mounts
  useEffect(() => {
    console.log('QuestionnaireReviewPage mounted', { isSignedOff, reviewedSections: Array.from(reviewedSections) });
  }, [isSignedOff, reviewedSections]);

  const handleAnswerChange = (sectionId: string, questionId: string, newAnswer: string) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            questions: section.questions.map((q) =>
              q.id === questionId
                ? {
                    ...q,
                    answer: newAnswer,
                    completeness: newAnswer.length > 50 ? Math.min(95, 60 + Math.floor(newAnswer.length / 10)) : Math.max(0, Math.floor(newAnswer.length / 2)),
                  }
                : q
            ),
          };
        }
        return section;
      })
    );
  };

  const handleMarkSectionReviewed = (sectionId: string) => {
    setReviewedSections((prev) => {
      const newSet = new Set(prev);
      newSet.add(sectionId);
      return newSet;
    });
  };

  const handleSignOff = () => {
    setIsSignedOff(true);
    setSignOffModalOpen(false);
  };

  const handleProceedToRiskAssessment = () => {
    console.log('Proceeding to risk assessment', { allSectionsReviewed, isSignedOff, canProceed });
    if (canProceed) {
      router.push('/voice-assessment/risk-libraries');
    } else {
      console.warn('Cannot proceed - requirements not met', { allSectionsReviewed, isSignedOff });
    }
  };

  const allSectionsReviewed = sections.every((section) => reviewedSections.has(section.id));
  const canProceed = allSectionsReviewed && isSignedOff;

  const overallCompleteness = Math.round(
    sections.reduce((acc, section) => {
      const sectionAvg = section.questions.reduce((sum, q) => sum + q.completeness, 0) / section.questions.length;
      return acc + sectionAvg;
    }, 0) / sections.length
  );

  const getCompletenessColor = (completeness: number) => {
    if (completeness >= 80) return 'success';
    if (completeness >= 50) return 'warning';
    return 'error';
  };

  const getCompletenessLabel = (completeness: number) => {
    if (completeness >= 80) return 'Complete';
    if (completeness >= 50) return 'Partial';
    return 'Missing';
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      {/* Left Column - Questionnaire */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          px: 6,
          py: 4,
          minWidth: 0,
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
              Questionnaire Review & Sign-Off
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: '1rem',
              }}
            >
              Review and finalize your assessment answers before generating the risk assessment.
            </Typography>
          </Stack>

          {/* Sections */}
          {sections.map((section) => (
            <Accordion
              key={section.id}
              defaultExpanded
              sx={{
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                borderRadius: 2,
                '&:before': { display: 'none' },
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  px: 3,
                  py: 2,
                  '&.Mui-expanded': { minHeight: 56 },
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                    {section.name}
                  </Typography>
                  <Chip
                    label={section.status === 'complete' ? 'Complete' : section.status === 'partial' ? 'Partial' : 'Missing'}
                    size="small"
                    color={section.status === 'complete' ? 'success' : section.status === 'partial' ? 'warning' : 'error'}
                  />
                  {reviewedSections.has(section.id) && (
                    <Chip
                      icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
                      label="Reviewed"
                      size="small"
                      color="success"
                      variant="outlined"
                    />
                  )}
                </Stack>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, pb: 3 }}>
                <Stack spacing={4}>
                  {section.questions.map((question, qIndex) => (
                    <Box key={question.id}>
                      {qIndex > 0 && <Divider sx={{ my: 3 }} />}
                      <Stack spacing={2}>
                        {/* Question Header */}
                        <Stack spacing={0.5}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                            {question.question}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {question.article}
                          </Typography>
                        </Stack>

                        {/* Voice Snippet */}
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 1,
                            backgroundColor: 'rgba(25, 118, 210, 0.05)',
                            border: '1px solid',
                            borderColor: 'rgba(25, 118, 210, 0.1)',
                          }}
                        >
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block', mb: 0.5 }}>
                            Voice Transcription:
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8125rem' }}>
                            {question.voiceSnippet}
                          </Typography>
                        </Box>

                        {/* Answer Field */}
                        <Box>
                          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                              Your Answer
                            </Typography>
                            <Chip
                              label={`${question.completeness}% - ${getCompletenessLabel(question.completeness)}`}
                              size="small"
                              color={getCompletenessColor(question.completeness) as any}
                            />
                          </Stack>
                          <TextField
                            fullWidth
                            multiline
                            rows={4}
                            value={question.answer}
                            onChange={(e) => handleAnswerChange(section.id, question.id, e.target.value)}
                            placeholder="Enter your answer here..."
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'background.paper',
                              },
                            }}
                          />
                        </Box>

                        {/* Kai Suggestions */}
                        <Card
                          variant="outlined"
                          sx={{
                            backgroundColor: question.completeness >= 80 ? 'rgba(76, 175, 80, 0.05)' : 'rgba(255, 152, 0, 0.05)',
                            borderColor: question.completeness >= 80 ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 152, 0, 0.2)',
                          }}
                        >
                          <CardContent sx={{ p: 2.5 }}>
                            <Stack spacing={2}>
                              <Stack direction="row" spacing={1} alignItems="center">
                                <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                                  Kai Suggestions:
                                </Typography>
                              </Stack>
                              {question.kaiSuggestion.missing && (
                                <Box
                                  sx={{
                                    p: 1.5,
                                    borderRadius: 1,
                                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                                    border: '1px solid',
                                    borderColor: 'rgba(244, 67, 54, 0.2)',
                                  }}
                                >
                                  <Typography variant="body2" sx={{ color: 'error.dark', fontSize: '0.8125rem' }}>
                                    {question.kaiSuggestion.missing}
                                  </Typography>
                                </Box>
                              )}
                              <Box
                                sx={{
                                  p: 1.5,
                                  borderRadius: 1,
                                  backgroundColor: 'rgba(25, 118, 210, 0.1)',
                                  border: '1px solid',
                                  borderColor: 'rgba(25, 118, 210, 0.2)',
                                }}
                              >
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block', mb: 0.5 }}>
                                  Ideal Answer:
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.primary', fontSize: '0.8125rem', lineHeight: 1.6 }}>
                                  {question.kaiSuggestion.idealAnswer}
                                </Typography>
                              </Box>
                            </Stack>
                          </CardContent>
                        </Card>
                      </Stack>
                    </Box>
                  ))}

                  {/* Mark Section as Reviewed Button */}
                  {!reviewedSections.has(section.id) && (
                    <Box sx={{ pt: 2 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleMarkSectionReviewed(section.id)}
                        startIcon={<CheckCircleIcon />}
                        sx={{
                          textTransform: 'none',
                        }}
                      >
                        Mark Section as Reviewed
                      </Button>
                    </Box>
                  )}
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Box>

      {/* Right Column - Review Summary Sidebar */}
      <ReviewSummarySidebar
        overallCompleteness={overallCompleteness}
        sections={sections}
        reviewedSections={reviewedSections}
        onMarkAllReviewed={() => setSignOffModalOpen(true)}
        onProceedToRiskAssessment={handleProceedToRiskAssessment}
        canProceed={canProceed}
      />

      {/* Sign-Off Modal */}
      <SignOffModal
        open={signOffModalOpen}
        onClose={() => setSignOffModalOpen(false)}
        onSignOff={handleSignOff}
      />
    </Box>
  );
}

