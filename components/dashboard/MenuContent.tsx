'use client'

import { usePathname, useRouter } from 'next/navigation';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import TaskRoundedIcon from '@mui/icons-material/TaskRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';

interface NavItem {
  text: string;
  icon: React.ComponentType;
  path: string;
}

const navItems: NavItem[] = [
  { text: 'Overview', icon: DashboardRoundedIcon, path: '/' },
  { text: 'Kai Assistant', icon: ChatRoundedIcon, path: '/kai' },
  { text: 'Assessments', icon: AssignmentRoundedIcon, path: '/assessments' },
  { text: 'ROPA', icon: DescriptionRoundedIcon, path: '/ropa' },
  { text: 'Risks', icon: WarningRoundedIcon, path: '/risks' },
  { text: 'Tasks & Approvals', icon: TaskRoundedIcon, path: '/tasks' },
  { text: 'Governance', icon: AdminPanelSettingsRoundedIcon, path: '/governance' },
];

interface MenuContentProps {
  collapsed?: boolean;
}

export default function MenuContent({ collapsed = false }: MenuContentProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <List 
      dense 
      sx={{ 
        flexGrow: 1,
        pt: 2,
        pb: 2,
        px: collapsed ? 1 : 1.5,
      }}
    >
      {navItems.map((item) => {
        const isSelected = pathname === item.path || (item.path === '/' && pathname === '/');
        const IconComponent = item.icon;
        const listItem = (
          <ListItem 
            key={item.path} 
            disablePadding 
            sx={{ 
              display: 'block',
              mb: 0.5,
            }}
          >
            <ListItemButton 
              selected={isSelected} 
              onClick={() => handleNavigation(item.path)}
              sx={{
                borderRadius: 1,
                py: 1,
                px: collapsed ? 1 : 1.5,
                justifyContent: collapsed ? 'center' : 'flex-start',
                minHeight: 40,
                '&.Mui-selected': {
                  backgroundColor: '#E8EEF7', // primary-muted
                  '&:hover': {
                    backgroundColor: '#E8EEF7',
                  },
                },
                '&:hover': {
                  backgroundColor: '#F4F6F8',
                },
              }}
            >
              <ListItemIcon 
                sx={{ 
                  minWidth: collapsed ? 0 : 40,
                  justifyContent: 'center',
                  color: isSelected ? 'primary.main' : 'text.secondary',
                }}
              >
                <IconComponent />
            </ListItemIcon>
              {!collapsed && (
                <ListItemText 
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: isSelected ? 500 : 400,
                  }}
                />
              )}
          </ListItemButton>
        </ListItem>
        );

        if (collapsed) {
          return (
            <Tooltip key={item.path} title={item.text} placement="right" arrow>
              {listItem}
            </Tooltip>
          );
        }

        return listItem;
      })}
    </List>
  );
}
