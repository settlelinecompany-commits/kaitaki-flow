'use client'

import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import ROPADashboard from './ROPADashboard';
import ROPATable from './ROPATable';
import ROPAAddEditModal from './ROPAAddEditModal';
import { ROPAActivity } from './ropaTypes';

export default function ROPAPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<ROPAActivity | null>(null);

  const handleEditActivity = (activity: ROPAActivity) => {
    setEditingActivity(activity);
    setModalOpen(true);
  };

  const handleAddActivity = () => {
    setEditingActivity(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingActivity(null);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', minWidth: 0 }}>
      <Stack spacing={3}>
        {/* Page Header */}
        <Box sx={{ pt: 1 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 0.5 }}>
            Record of Processing Activities
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '14px', lineHeight: '20px' }}>
            Monitor and maintain the accuracy of your organization's processing activities.
          </Typography>
        </Box>

        {/* Dashboard */}
        <ROPADashboard />

        {/* Table */}
        <ROPATable
          onEditActivity={handleEditActivity}
          onAddActivity={handleAddActivity}
        />

        {/* Add/Edit Modal */}
        <ROPAAddEditModal
          open={modalOpen}
          onClose={handleCloseModal}
          activity={editingActivity}
        />
      </Stack>
    </Box>
  );
}

