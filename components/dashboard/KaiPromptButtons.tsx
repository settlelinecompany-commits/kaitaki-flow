'use client'

import { Box, Card, CardContent, Stack, Typography, Grid } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';

interface SkillCard {
  title: string;
  description: string;
  icon: React.ComponentType;
  prompt: string;
}

interface KaiPromptButtonsProps {
  prompts: string[];
  onPromptClick: (prompt: string) => void;
}

const skillCards: SkillCard[] = [
  {
    title: 'Summarize',
    description: 'Select a regulation, policy, or assessment and get a concise summary.',
    icon: ArticleIcon,
    prompt: 'Summarize a regulation',
  },
  {
    title: 'Generate GAP',
    description: 'Create a GAP assessment using Kai to identify compliance gaps.',
    icon: ChecklistRoundedIcon,
    prompt: 'Generate a GAP assessment',
  },
  {
    title: 'Draft ROPA',
    description: 'Draft or update a ROPA entry instantly with AI assistance.',
    icon: DescriptionRoundedIcon,
    prompt: 'Draft a ROPA entry',
  },
];

export default function KaiPromptButtons({ prompts, onPromptClick }: KaiPromptButtonsProps) {
  return (
    <Grid container spacing={2} sx={{ mt: 1, justifyContent: 'center' }}>
      {skillCards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: 'flex' }}>
            <Card
              variant="outlined"
              onClick={() => onPromptClick(card.prompt)}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.2s',
                borderRadius: 2,
                boxShadow: 'none',
                borderColor: 'divider',
                height: '100%',
                '&:hover': {
                  borderColor: 'primary.main',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Stack spacing={1.5}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1.5,
                      backgroundColor: (theme) => theme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.1)' 
                        : 'rgba(25, 118, 210, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'primary.main',
                    }}
                  >
                    <IconComponent sx={{ fontSize: 24 }} />
                  </Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: 'text.primary',
                      fontWeight: 600,
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.8125rem',
                      lineHeight: 1.5,
                    }}
                  >
                    {card.description}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

