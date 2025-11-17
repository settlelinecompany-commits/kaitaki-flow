'use client'

import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

export default function ColorModeIconDropdown() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light')

  return (
    <IconButton
      size="small"
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
      aria-label="Toggle color mode"
    >
      {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  )
}
