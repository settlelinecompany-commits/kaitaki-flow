'use client'

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import ChatIcon from '@mui/icons-material/Chat';
import CustomDatePicker from './CustomDatePicker';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import MenuButton from './MenuButton';
import ColorModeIconDropdown from './ColorModeIconDropdown';
import { useKai } from './KaiContext';
import Search from './Search';

export default function Header() {
  const { isOpen, togglePanel } = useKai();

  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs />
      <Stack direction="row" sx={{ gap: 1 }}>
        <Search />
        <CustomDatePicker />
        <Button
          variant={isOpen ? 'contained' : 'outlined'}
          startIcon={<ChatIcon />}
          onClick={togglePanel}
          sx={{ textTransform: 'none' }}
        >
          Kai
        </Button>
        <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton>
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
}
