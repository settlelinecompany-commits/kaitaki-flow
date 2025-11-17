import { createTheme, alpha, PaletteMode, Shadows } from '@mui/material/styles';

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    highlighted: true;
  }
}
declare module '@mui/material/styles' {
  interface ColorRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface PaletteColor extends ColorRange {}

  interface Palette {
    baseShadow: string;
  }
}

const defaultTheme = createTheme();

const customShadows: Shadows = [...defaultTheme.shadows];

// New Kaitaki Enterprise Color Palette
export const brand = {
  50: '#E8EEF7', // primary-muted
  100: '#D6DFEC', // progress-muted
  200: '#B8C7DB',
  300: '#9BAFC9',
  400: '#7D97B7',
  500: '#294A78', // primary
  600: '#3E68A3', // primary-light
  700: '#1E3654', // primary-dark
  800: '#152840',
  900: '#0B1A2C',
};

export const gray = {
  50: '#F8F9FA', // bg
  100: '#F4F6F8',
  200: '#E5E7EB', // border
  300: '#D1D5DB',
  400: '#9CA3AF',
  500: '#6B7280', // text-tertiary
  600: '#4B5563', // text-secondary
  700: '#374151',
  800: '#1F2937', // text-primary
  900: '#111827',
};

export const green = {
  50: '#F0FDF4',
  100: '#C7F2C0', // success-bg
  200: '#A3E89D',
  300: '#7FDE7A',
  400: '#5BD457',
  500: '#37CA34',
  600: '#196A13', // success-text
  700: '#145010',
  800: '#0F360D',
  900: '#0A1C0A',
};

export const orange = {
  50: '#FFF7ED',
  100: '#FDECC8', // warning-bg
  200: '#FBD9A1',
  300: '#F9C67A',
  400: '#F7B353',
  500: '#F5A02C',
  600: '#8B6508', // warning-text
  700: '#6B4D06',
  800: '#4B3504',
  900: '#2B1D02',
};

export const red = {
  50: '#FEF2F2',
  100: '#FBD4C8', // error-bg
  200: '#F7A9A1',
  300: '#F37E7A',
  400: '#EF5353',
  500: '#EB282C',
  600: '#8A271A', // error-text
  700: '#6B1E14',
  800: '#4C150E',
  900: '#2D0C08',
};

export const getDesignTokens = (mode: PaletteMode) => {
  // Subtle shadow for enterprise look
  customShadows[1] = '0 1px 2px rgba(0, 0, 0, 0.03)';

  return {
    palette: {
      mode,
      primary: {
        light: brand[600], // #3E68A3
        main: brand[500], // #294A78
        dark: brand[700], // #1E3654
        contrastText: '#FFFFFF',
        ...(mode === 'dark' && {
          contrastText: '#FFFFFF',
          light: brand[400],
          main: brand[500],
          dark: brand[800],
        }),
      },
      info: {
        light: '#E6EEF7',
        main: brand[500],
        dark: brand[700],
        contrastText: '#FFFFFF',
        ...(mode === 'dark' && {
          contrastText: brand[50],
          light: brand[300],
          main: brand[500],
          dark: brand[800],
        }),
      },
      warning: {
        light: orange[100], // #FDECC8
        main: orange[600], // #8B6508
        dark: orange[800],
        ...(mode === 'dark' && {
          light: orange[200],
          main: orange[500],
          dark: orange[700],
        }),
      },
      error: {
        light: red[100], // #FBD4C8
        main: red[600], // #8A271A
        dark: red[800],
        ...(mode === 'dark' && {
          light: red[200],
          main: red[500],
          dark: red[700],
        }),
      },
      success: {
        light: green[100], // #C7F2C0
        main: green[600], // #196A13
        dark: green[800],
        ...(mode === 'dark' && {
          light: green[200],
          main: green[500],
          dark: green[700],
        }),
      },
      grey: {
        ...gray,
      },
      divider: mode === 'dark' ? alpha(gray[700], 0.3) : gray[200], // #E5E7EB
      background: {
        default: gray[50], // #F8F9FA
        paper: '#FFFFFF', // #FFFFFF
        ...(mode === 'dark' && { default: gray[900], paper: gray[800] }),
      },
      text: {
        primary: gray[800], // #1F2937
        secondary: gray[600], // #4B5563
        warning: orange[600],
        ...(mode === 'dark' && { primary: gray[50], secondary: gray[400] }),
      },
      action: {
        hover: alpha(gray[200], 0.1), // Subtle hover
        selected: alpha(brand[50], 0.5), // primary-muted
        ...(mode === 'dark' && {
          hover: alpha(gray[600], 0.2),
          selected: alpha(gray[600], 0.3),
        }),
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
      h1: {
        fontSize: defaultTheme.typography.pxToRem(48),
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: -0.5,
        color: gray[800],
      },
      h2: {
        fontSize: defaultTheme.typography.pxToRem(36),
        fontWeight: 600,
        lineHeight: 1.2,
        color: gray[800],
      },
      h3: {
        fontSize: defaultTheme.typography.pxToRem(30),
        lineHeight: 1.2,
        fontWeight: 600,
        color: gray[800],
      },
      h4: {
        fontSize: defaultTheme.typography.pxToRem(24),
        fontWeight: 600,
        lineHeight: 1.5,
        color: gray[800],
      },
      h5: {
        fontSize: defaultTheme.typography.pxToRem(20),
        fontWeight: 600,
        color: gray[800],
      },
      h6: {
        fontSize: defaultTheme.typography.pxToRem(18),
        fontWeight: 600,
        color: gray[800],
      },
      subtitle1: {
        fontSize: defaultTheme.typography.pxToRem(18),
        fontWeight: 500,
        color: gray[600],
      },
      subtitle2: {
        fontSize: defaultTheme.typography.pxToRem(14),
        fontWeight: 500,
        color: gray[600],
      },
      body1: {
        fontSize: defaultTheme.typography.pxToRem(14),
        fontWeight: 400,
        color: gray[800],
      },
      body2: {
        fontSize: defaultTheme.typography.pxToRem(14),
        fontWeight: 400,
        color: gray[800],
      },
      caption: {
        fontSize: defaultTheme.typography.pxToRem(12),
        fontWeight: 400,
        color: gray[500],
      },
    },
    shape: {
      borderRadius: 12, // Updated to 12px for modern cards
    },
    shadows: customShadows,
  };
};

export const colorSchemes = {
  light: {
    palette: {
      primary: {
        light: brand[600], // #3E68A3
        main: brand[500], // #294A78
        dark: brand[700], // #1E3654
        contrastText: '#FFFFFF',
      },
      info: {
        light: '#E6EEF7',
        main: brand[500],
        dark: brand[700],
        contrastText: '#FFFFFF',
      },
      warning: {
        light: orange[100], // #FDECC8
        main: orange[600], // #8B6508
        dark: orange[800],
      },
      error: {
        light: red[100], // #FBD4C8
        main: red[600], // #8A271A
        dark: red[800],
      },
      success: {
        light: green[100], // #C7F2C0
        main: green[600], // #196A13
        dark: green[800],
      },
      grey: {
        ...gray,
      },
      divider: gray[200], // #E5E7EB
      background: {
        default: gray[50], // #F8F9FA
        paper: '#FFFFFF', // #FFFFFF
      },
      text: {
        primary: gray[800], // #1F2937
        secondary: gray[600], // #4B5563
        warning: orange[600],
      },
      action: {
        hover: alpha(gray[200], 0.1),
        selected: alpha(brand[50], 0.5), // primary-muted
      },
      baseShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
    },
  },
  dark: {
    palette: {
      primary: {
        contrastText: '#FFFFFF',
        light: brand[400],
        main: brand[500],
        dark: brand[800],
      },
      info: {
        contrastText: brand[50],
        light: brand[300],
        main: brand[500],
        dark: brand[800],
      },
      warning: {
        light: orange[200],
        main: orange[500],
        dark: orange[700],
      },
      error: {
        light: red[200],
        main: red[500],
        dark: red[700],
      },
      success: {
        light: green[200],
        main: green[500],
        dark: green[700],
      },
      grey: {
        ...gray,
      },
      divider: alpha(gray[700], 0.3),
      background: {
        default: gray[900],
        paper: gray[800],
      },
      text: {
        primary: gray[50],
        secondary: gray[400],
      },
      action: {
        hover: alpha(gray[600], 0.2),
        selected: alpha(gray[600], 0.3),
      },
      baseShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
    },
  },
};

export const typography = {
  fontFamily: 'Roboto, sans-serif',
  h1: {
    fontSize: defaultTheme.typography.pxToRem(48),
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: defaultTheme.typography.pxToRem(36),
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h3: {
    fontSize: defaultTheme.typography.pxToRem(30),
    lineHeight: 1.2,
    fontWeight: 600,
  },
  h4: {
    fontSize: defaultTheme.typography.pxToRem(24),
    fontWeight: 600,
    lineHeight: 1.5,
  },
  h5: {
    fontSize: defaultTheme.typography.pxToRem(20),
    fontWeight: 600,
  },
  h6: {
    fontSize: defaultTheme.typography.pxToRem(18),
    fontWeight: 600,
  },
  subtitle1: {
    fontSize: defaultTheme.typography.pxToRem(18),
    fontWeight: 500,
  },
  subtitle2: {
    fontSize: defaultTheme.typography.pxToRem(14),
    fontWeight: 500,
  },
  body1: {
    fontSize: defaultTheme.typography.pxToRem(14),
    fontWeight: 400,
  },
  body2: {
    fontSize: defaultTheme.typography.pxToRem(14),
    fontWeight: 400,
  },
  caption: {
    fontSize: defaultTheme.typography.pxToRem(12),
    fontWeight: 400,
  },
};

export const shape = {
  borderRadius: 12, // Updated to 12px
};

// @ts-ignore
const defaultShadows: Shadows = [
  'none',
  '0 1px 2px rgba(0, 0, 0, 0.03)', // Subtle shadow
  ...defaultTheme.shadows.slice(2),
];
export const shadows = defaultShadows;
