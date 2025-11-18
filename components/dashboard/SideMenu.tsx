'use client'
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Image from 'next/image';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';

const expandedWidth = 240;
const collapsedWidth = 64;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'collapsed',
})<{ collapsed?: boolean }>(({ theme, collapsed }) => ({
  width: collapsed ? collapsedWidth : expandedWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  transition: 'width 0.2s ease',
  [`& .${drawerClasses.paper}`]: {
    width: collapsed ? collapsedWidth : expandedWidth,
    boxSizing: 'border-box',
    transition: 'width 0.2s ease',
    overflowX: 'hidden',
  },
}));

export default function SideMenu() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Drawer
      variant="permanent"
      collapsed={collapsed}
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #E5E7EB',
        },
      }}
    >
      <Box
        sx={{
          overflow: 'auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          pt: 'calc(var(--template-frame-height, 0px) + 4px)',
        }}
      >
        {/* Logo Block */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 2.5,
            px: collapsed ? 1 : 2,
            position: 'relative',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: collapsed ? 20 : 'auto',
              height: collapsed ? 20 : 18,
              mb: collapsed ? 0 : 1.5,
              position: 'relative',
            }}
          >
            <Image
              src="/kaitaki_HQ.png"
              alt="Kaitaki"
              width={collapsed ? 20 : 50}
              height={collapsed ? 20 : 18}
              style={{
                objectFit: 'contain',
                maxWidth: '100%',
                height: 'auto',
              }}
              priority
            />
          </Box>
          {!collapsed && (
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                color: 'text.primary',
                fontSize: '0.875rem',
              }}
            >
              Kaitaki
            </Typography>
          )}
          {/* Toggle Button */}
          <IconButton
            onClick={toggleCollapse}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              width: 32,
              height: 32,
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: '#E8EEF7',
              },
            }}
          >
            {collapsed ? (
              <ChevronRightRoundedIcon fontSize="small" />
            ) : (
              <ChevronLeftRoundedIcon fontSize="small" />
            )}
          </IconButton>
        </Box>
        <Divider sx={{ mx: collapsed ? 1 : 2 }} />
        {/* Navigation */}
        <MenuContent collapsed={collapsed} />
      </Box>
      <Divider />
      <Tooltip title={collapsed ? 'Riley Carter' : ''} placement="right">
        <Stack
          direction={collapsed ? 'column' : 'row'}
          sx={{
            p: collapsed ? 1.5 : 2,
            gap: 1,
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            flexShrink: 0,
          }}
        >
          <Avatar
            sizes="small"
            alt="Riley Carter"
            src="/static/images/avatar/7.jpg"
            sx={{ width: 36, height: 36 }}
          />
          {!collapsed && (
            <>
              <Box sx={{ mr: 'auto', minWidth: 0 }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 500, 
                    lineHeight: '16px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Riley Carter
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: 'text.secondary',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'block',
                  }}
                >
                  riley@email.com
                </Typography>
              </Box>
              <OptionsMenu />
            </>
          )}
        </Stack>
      </Tooltip>
    </Drawer>
  );
}
