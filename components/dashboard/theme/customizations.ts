export const chartsCustomizations = {};
export const dataGridCustomizations = {};
export const datePickersCustomizations = {};
export const treeViewCustomizations = {};

export const feedbackCustomizations = {
  MuiChip: {
    styleOverrides: {
      root: ({ ownerState, theme }: any) => ({
        borderRadius: '16px', // Pill-shaped
        fontWeight: 500,
        fontSize: '0.75rem',
        height: '24px',
        ...(ownerState.color === 'success' && ownerState.variant === 'filled' && {
          backgroundColor: '#C7F2C0', // success-bg
          color: '#196A13', // success-text
          '&:hover': {
            backgroundColor: '#B0E8A8',
          },
        }),
        ...(ownerState.color === 'error' && ownerState.variant === 'filled' && {
          backgroundColor: '#FBD4C8', // error-bg
          color: '#8A271A', // error-text
          '&:hover': {
            backgroundColor: '#F9C0B0',
          },
        }),
        ...(ownerState.color === 'warning' && ownerState.variant === 'filled' && {
          backgroundColor: '#FDECC8', // warning-bg
          color: '#8B6508', // warning-text
          '&:hover': {
            backgroundColor: '#FCE0B0',
          },
        }),
      }),
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
        padding: '20px',
      },
      outlined: {
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '8px',
        fontWeight: 500,
        textTransform: 'none',
        padding: '8px 14px',
      },
      contained: {
        backgroundColor: '#294A78', // primary
        color: '#FFFFFF',
        '&:hover': {
          backgroundColor: '#1E3654', // primary-dark
        },
      },
      outlined: {
        border: '1px solid #E5E7EB',
        color: '#1F2937', // text-primary
        backgroundColor: '#FFFFFF',
        '&:hover': {
          backgroundColor: '#E8EEF7', // primary-muted
          borderColor: '#E5E7EB',
        },
      },
      text: {
        color: '#1F2937',
        '&:hover': {
          backgroundColor: '#E8EEF7', // primary-muted
        },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
          backgroundColor: '#FFFFFF',
          '& fieldset': {
            borderColor: '#E5E7EB',
          },
          '&:hover fieldset': {
            borderColor: '#E5E7EB',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#294A78', // primary
            borderWidth: '1px',
          },
        },
        '& .MuiInputLabel-root': {
          color: '#6B7280', // text-tertiary
        },
        '& .MuiInputBase-input::placeholder': {
          color: '#6B7280', // text-tertiary
          opacity: 1,
        },
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        borderRadius: '8px',
        backgroundColor: '#FFFFFF',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#E5E7EB',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#E5E7EB',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#294A78', // primary
        },
      },
      input: {
        '&::placeholder': {
          color: '#6B7280', // text-tertiary
          opacity: 1,
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
      },
      elevation1: {
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        height: '8px',
        borderRadius: '8px',
        backgroundColor: '#D6DFEC', // progress-muted
      },
      bar: {
        borderRadius: '8px',
        backgroundColor: '#294A78', // progress/primary
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: {
        minHeight: '40px',
      },
      indicator: {
        display: 'none',
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 500,
        minHeight: '40px',
        borderRadius: '8px 8px 0 0',
        marginRight: '4px',
        color: '#4B5563', // text-secondary
        backgroundColor: '#E8EEF7', // primary-muted (inactive)
        '&.Mui-selected': {
          color: '#1F2937', // text-primary
          backgroundColor: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderBottom: 'none',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
        },
        '&:hover': {
          backgroundColor: '#D6DFEC',
        },
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        borderColor: '#E5E7EB',
        padding: '12px 16px',
      },
      head: {
        backgroundColor: '#FFFFFF',
        color: '#4B5563', // text-secondary
        fontWeight: 500,
        borderBottom: '1px solid #E5E7EB',
      },
      body: {
        color: '#1F2937', // text-primary
        '&:hover': {
          backgroundColor: '#F4F6F8',
        },
      },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: {
        borderBottom: '1px solid #E5E7EB',
        '&:hover': {
          backgroundColor: '#F4F6F8',
        },
        '&:last-child td': {
          borderBottom: 'none',
        },
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: '8px',
        '&.Mui-selected': {
          backgroundColor: '#E8EEF7', // primary-muted
          '&:hover': {
            backgroundColor: '#E8EEF7',
          },
        },
        '&:hover': {
          backgroundColor: '#F4F6F8',
        },
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: '#FFFFFF',
        color: '#1F2937',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
        borderBottom: '1px solid #E5E7EB',
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid #E5E7EB',
      },
    },
  },
};
