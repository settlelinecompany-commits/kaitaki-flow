# Design System Guide

This document outlines the design system, theme configuration, and styling guidelines for the MUI Dashboard application. All new components should follow these patterns to maintain visual consistency.

## Theme Configuration

### Core Theme Files

1. **`components/dashboard/themePrimitives.ts`** - Core design tokens (colors, typography, shadows, shape)
2. **`components/dashboard/theme/customizations.ts`** - Component-specific style overrides
3. **`components/dashboard/AppTheme.tsx`** - Theme provider wrapper

### Using the Theme

Always wrap your components with the `AppTheme` provider:

```tsx
import AppTheme from '@/components/dashboard/AppTheme';

export default function MyComponent() {
  return (
    <AppTheme>
      {/* Your component */}
    </AppTheme>
  );
}
```

## Color Palette

### Primary Colors (Brand Blue)
- **Main**: `hsl(210, 98%, 48%)` - Primary actions, links, highlights
- **Light**: `hsl(210, 100%, 80%)` - Hover states, light backgrounds
- **Dark**: `hsl(210, 100%, 35%)` - Active states, emphasis

### Success Colors (Green)
- **Light Background**: `hsl(120, 80%, 95%)` - Chip backgrounds, success indicators
- **Text**: `hsl(120, 59%, 30%)` - Success text, labels
- **Main**: `hsl(120, 44%, 53%)` - Success actions

### Error Colors (Red)
- **Light Background**: `hsl(0, 100%, 97%)` - Error chip backgrounds
- **Text**: `hsl(0, 90%, 30%)` - Error text, labels
- **Main**: `hsl(0, 90%, 40%)` - Error actions

### Gray Scale
- **50**: `hsl(220, 35%, 97%)` - Lightest backgrounds
- **100**: `hsl(220, 30%, 94%)` - Card backgrounds
- **200**: `hsl(220, 20%, 88%)` - Dividers, borders
- **400**: `hsl(220, 20%, 65%)` - Secondary text
- **600**: `hsl(220, 20%, 35%)` - Disabled states
- **800**: `hsl(220, 30%, 6%)` - Primary text (dark mode)
- **900**: `hsl(220, 35%, 3%)` - Darkest backgrounds

### Using Colors in Components

```tsx
import { useTheme } from '@mui/material/styles';

function MyComponent() {
  const theme = useTheme();
  
  // Access colors via theme
  const primaryColor = theme.palette.primary.main;
  const successColor = theme.palette.success.main;
  
  // Or use CSS variables (preferred for Custom Theme)
  const primaryVar = 'var(--template-palette-primary-main)';
}
```

## Typography

### Font Family
- **Primary**: `Roboto, sans-serif`
- Fallback: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif`

### Font Sizes
- **H1**: 48px (3rem), weight: 600, line-height: 1.2
- **H2**: 36px (2.25rem), weight: 600, line-height: 1.2
- **H3**: 30px (1.875rem), line-height: 1.2
- **H4**: 24px (1.5rem), weight: 600, line-height: 1.5
- **H5**: 20px (1.25rem), weight: 600
- **H6**: 18px (1.125rem), weight: 600
- **Subtitle1**: 18px (1.125rem)
- **Subtitle2**: 14px (0.875rem), weight: 500
- **Body1**: 14px (0.875rem)
- **Body2**: 14px (0.875rem), weight: 400
- **Caption**: 12px (0.75rem), weight: 400

### Using Typography

```tsx
import Typography from '@mui/material/Typography';

<Typography variant="h4" component="h2">
  Title
</Typography>
<Typography variant="body2" sx={{ color: 'text.secondary' }}>
  Secondary text
</Typography>
```

## Component Styling Patterns

### Chips

Success and Error chips use light pastel backgrounds:

```tsx
import Chip from '@mui/material/Chip';

// Success chip (light green background, dark green text)
<Chip size="small" color="success" label="+25%" />

// Error chip (light red background, dark red text)
<Chip size="small" color="error" label="-8%" />
```

**Custom styling is automatically applied** via `feedbackCustomizations` in `theme/customizations.ts`.

### Cards

```tsx
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

<Card variant="outlined" sx={{ height: '100%' }}>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### Buttons

```tsx
import Button from '@mui/material/Button';

// Primary button
<Button variant="contained" color="primary" size="small">
  Action
</Button>

// Outlined button
<Button variant="outlined" color="primary" size="small">
  Secondary
</Button>
```

### Spacing

Use MUI's spacing system (8px base unit):

```tsx
// In sx prop
sx={{ p: 2 }}        // padding: 16px (2 * 8px)
sx={{ m: 3 }}        // margin: 24px (3 * 8px)
sx={{ gap: 1 }}      // gap: 8px
sx={{ spacing: 2 }}  // Stack/Grid spacing: 16px
```

## Layout Patterns

### Dashboard Layout Structure

```tsx
<AppTheme>
  <CssBaseline enableColorScheme />
  <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%', maxWidth: '100vw' }}>
    <SideMenu />
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0 }}>
      <AppNavbar />
      <Box component="main" sx={{ flexGrow: 1, overflow: 'auto', overflowX: 'hidden' }}>
        <Stack spacing={2} sx={{ px: 3, pb: 5, pt: { xs: 8, md: 0 } }}>
          {/* Content */}
        </Stack>
      </Box>
    </Box>
  </Box>
</AppTheme>
```

### Key Layout Rules

1. **Use `px: 3` (padding-x)** instead of `mx: 3` (margin-x) for content containers
2. **Always set `minWidth: 0`** on flex children to prevent overflow
3. **Use `width: '100%'` with `maxWidth: '100vw'`** for root containers
4. **Set `overflowX: 'hidden'`** on main content areas

## CSS Variables

The theme uses CSS variables with the `template` prefix:

```css
/* Primary colors */
--template-palette-primary-main
--template-palette-primary-light
--template-palette-primary-dark

/* Success colors */
--template-palette-success-main
--template-palette-success-light

/* Background colors */
--template-palette-background-default
--template-palette-background-paper

/* Text colors */
--template-palette-text-primary
--template-palette-text-secondary
```

Access in `sx` prop:

```tsx
sx={{
  backgroundColor: 'var(--template-palette-primary-main)',
  color: 'var(--template-palette-text-primary)',
}}
```

## Adding New Component Customizations

To add custom styling for a new component, update `components/dashboard/theme/customizations.ts`:

```tsx
export const myComponentCustomizations = {
  MuiMyComponent: {
    styleOverrides: {
      root: ({ ownerState, theme }: any) => ({
        // Your custom styles
      }),
    },
  },
};
```

Then add it to `Dashboard.tsx`:

```tsx
const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
  ...feedbackCustomizations,
  ...myComponentCustomizations, // Add here
};
```

## Best Practices

1. **Always use theme colors** - Don't hardcode colors, use `theme.palette.*` or CSS variables
2. **Use MUI components** - Leverage MUI's component library for consistency
3. **Follow spacing system** - Use MUI's 8px spacing scale
4. **Responsive design** - Use breakpoints: `xs`, `sm`, `md`, `lg`, `xl`
5. **Accessibility** - Use semantic HTML and proper ARIA labels
6. **Type safety** - Use TypeScript types from `@mui/material/styles`

## Example: Creating a New Component

```tsx
'use client'

import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function MyNewCard() {
  const theme = useTheme();
  
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6" component="h2">
            Title
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Description text
          </Typography>
          <Chip size="small" color="success" label="+25%" />
        </Stack>
      </CardContent>
    </Card>
  );
}
```

## Resources

- [MUI Theme Documentation](https://mui.com/material-ui/customization/theming/)
- [MUI Component API](https://mui.com/material-ui/api/)
- [MUI System (sx prop)](https://mui.com/system/getting-started/the-sx-prop/)
- Theme source: `components/dashboard/themePrimitives.ts`
- Customizations: `components/dashboard/theme/customizations.ts`


