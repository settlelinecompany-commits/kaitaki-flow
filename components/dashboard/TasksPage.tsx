'use client'

import { useState, useMemo } from 'react';
import {
  Box,
  Stack,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  Typography,
  Chip,
  Avatar,
  AvatarGroup,
  IconButton,
  Drawer,
  Divider,
  Button,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CommentIcon from '@mui/icons-material/Comment';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import WarningIcon from '@mui/icons-material/Warning';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BusinessIcon from '@mui/icons-material/Business';

// Types
type TaskStatus = 'todo' | 'in_progress' | 'awaiting_approval';
type TaskPriority = 'low' | 'medium' | 'high';
type TaskSource = 'GAP' | 'DPIA' | 'Voice' | 'TIA' | 'ROPA' | 'Vendor';

interface Task {
  id: string;
  title: string;
  description: string;
  source: TaskSource;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  assignees: string[];
  subtasks: { id: string; title: string; completed: boolean }[];
  sourceObject: string;
  originalAnswer?: string;
  kaiRecommendation?: string;
  completenessScore?: number;
  attachments: string[];
  activityLog: {
    id: string;
    timestamp: Date;
    type: 'kai' | 'user' | 'system';
    content: string;
    author?: string;
  }[];
  needsApproval: boolean;
  department: string;
}

// Mock Data
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Review PDPL GAP findings for HR Department',
    description: 'Review and validate all GAP assessment findings related to HR data processing activities under PDPL.',
    source: 'GAP',
    status: 'todo',
    priority: 'high',
    dueDate: '2025-01-20',
    assignees: ['Riley Carter', 'Sarah Johnson'],
    subtasks: [
      { id: '1-1', title: 'Review Article 11 compliance gaps', completed: false },
      { id: '1-2', title: 'Validate data retention schedules', completed: false },
      { id: '1-3', title: 'Document mitigation plans', completed: false },
    ],
    sourceObject: 'Generated from GAP Assessment Q4 Finance',
    originalAnswer: 'HR department processes employee data without explicit consent mechanisms.',
    kaiRecommendation: 'Implement granular consent forms and update privacy notices.',
    completenessScore: 65,
    attachments: [],
    activityLog: [
      {
        id: '1-1',
        timestamp: new Date('2025-01-15T10:00:00'),
        type: 'system',
        content: 'Task created from GAP Assessment',
      },
      {
        id: '1-2',
        timestamp: new Date('2025-01-15T10:05:00'),
        type: 'kai',
        content: 'I recommend reviewing Article 11 requirements first, as this is a high-priority compliance gap.',
      },
    ],
    needsApproval: false,
    department: 'HR',
  },
  {
    id: '2',
    title: 'Confirm retention schedule update for Marketing',
    description: 'Approve the updated data retention schedule for marketing customer data processing.',
    source: 'ROPA',
    status: 'awaiting_approval',
    priority: 'medium',
    dueDate: '2025-01-18',
    assignees: ['Riley Carter'],
    subtasks: [
      { id: '2-1', title: 'Review retention periods', completed: true },
      { id: '2-2', title: 'Confirm legal basis alignment', completed: true },
      { id: '2-3', title: 'Approve schedule update', completed: false },
    ],
    sourceObject: 'From ROPA Update Needed',
    attachments: ['retention-schedule-marketing.pdf'],
    activityLog: [
      {
        id: '2-1',
        timestamp: new Date('2025-01-14T14:00:00'),
        type: 'system',
        content: 'Task created from ROPA update request',
      },
      {
        id: '2-2',
        timestamp: new Date('2025-01-14T15:30:00'),
        type: 'user',
        content: 'Retention periods reviewed and validated.',
        author: 'Sarah Johnson',
      },
    ],
    needsApproval: true,
    department: 'Marketing',
  },
  {
    id: '3',
    title: 'Upload evidence for Article 11 compliance',
    description: 'Collect and upload evidence documents demonstrating Article 11 consent mechanisms.',
    source: 'DPIA',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2025-01-22',
    assignees: ['Sarah Johnson'],
    subtasks: [
      { id: '3-1', title: 'Collect consent forms', completed: true },
      { id: '3-2', title: 'Document opt-out mechanisms', completed: false },
      { id: '3-3', title: 'Upload to evidence repository', completed: false },
    ],
    sourceObject: 'From Voice Assessment – PDPL Article 11',
    kaiRecommendation: 'Ensure all consent forms include clear opt-out instructions and withdrawal mechanisms.',
    completenessScore: 40,
    attachments: ['consent-form-template.pdf'],
    activityLog: [
      {
        id: '3-1',
        timestamp: new Date('2025-01-16T09:00:00'),
        type: 'system',
        content: 'Task created from DPIA findings',
      },
      {
        id: '3-2',
        timestamp: new Date('2025-01-16T11:00:00'),
        type: 'kai',
        content: 'I can help draft the consent form template if needed.',
      },
    ],
    needsApproval: false,
    department: 'IT',
  },
  {
    id: '4',
    title: 'Approve DPIA for Payroll System',
    description: 'Review and approve the Data Protection Impact Assessment for the new payroll system implementation.',
    source: 'DPIA',
    status: 'awaiting_approval',
    priority: 'high',
    dueDate: '2025-01-19',
    assignees: ['Riley Carter'],
    subtasks: [
      { id: '4-1', title: 'Review risk assessment', completed: true },
      { id: '4-2', title: 'Validate mitigation measures', completed: true },
      { id: '4-3', title: 'Sign off on DPIA', completed: false },
    ],
    sourceObject: 'Generated from DPIA Assessment',
    attachments: ['payroll-dpia-report.pdf', 'risk-mitigation-plan.pdf'],
    activityLog: [
      {
        id: '4-1',
        timestamp: new Date('2025-01-13T08:00:00'),
        type: 'system',
        content: 'DPIA completed and ready for approval',
      },
      {
        id: '4-2',
        timestamp: new Date('2025-01-13T10:00:00'),
        type: 'user',
        content: 'Risk assessment looks comprehensive. Mitigation measures are well-documented.',
        author: 'Sarah Johnson',
      },
    ],
    needsApproval: true,
    department: 'Finance',
  },
  {
    id: '5',
    title: 'Review Voice Assessment completeness',
    description: 'Review the Voice Assessment results and ensure all required information has been captured.',
    source: 'Voice',
    status: 'todo',
    priority: 'medium',
    dueDate: '2025-01-21',
    assignees: ['Riley Carter'],
    subtasks: [
      { id: '5-1', title: 'Verify all questions answered', completed: false },
      { id: '5-2', title: 'Check for missing context', completed: false },
    ],
    sourceObject: 'From Voice Assessment – PDPL Article 11',
    completenessScore: 75,
    attachments: [],
    activityLog: [
      {
        id: '5-1',
        timestamp: new Date('2025-01-17T12:00:00'),
        type: 'system',
        content: 'Voice Assessment completed',
      },
    ],
    needsApproval: false,
    department: 'Operations',
  },
  {
    id: '6',
    title: 'Add vendor contract to Zoho CRM entry',
    description: 'Upload the vendor contract and data processing agreement for Zoho CRM to the ROPA entry.',
    source: 'Vendor',
    status: 'in_progress',
    priority: 'low',
    dueDate: '2025-01-25',
    assignees: ['Sarah Johnson'],
    subtasks: [
      { id: '6-1', title: 'Locate vendor contract', completed: true },
      { id: '6-2', title: 'Upload to ROPA entry', completed: false },
    ],
    sourceObject: 'From ROPA Update Needed',
    attachments: ['zoho-crm-dpa.pdf'],
    activityLog: [
      {
        id: '6-1',
        timestamp: new Date('2025-01-17T14:00:00'),
        type: 'system',
        content: 'Task created from vendor assessment',
      },
    ],
    needsApproval: false,
    department: 'IT',
  },
  {
    id: '7',
    title: 'Sign off on cross-border transfer mitigation plan',
    description: 'Review and approve the mitigation plan for cross-border data transfers to EU vendors.',
    source: 'TIA',
    status: 'awaiting_approval',
    priority: 'high',
    dueDate: '2025-01-17',
    assignees: ['Riley Carter'],
    subtasks: [
      { id: '7-1', title: 'Review transfer impact assessment', completed: true },
      { id: '7-2', title: 'Validate SCC clauses', completed: true },
      { id: '7-3', title: 'Approve mitigation plan', completed: false },
    ],
    sourceObject: 'Generated from TIA Assessment',
    attachments: ['cross-border-mitigation-plan.pdf', 'scc-clauses.pdf'],
    activityLog: [
      {
        id: '7-1',
        timestamp: new Date('2025-01-15T09:00:00'),
        type: 'system',
        content: 'TIA completed and mitigation plan ready',
      },
      {
        id: '7-2',
        timestamp: new Date('2025-01-15T13:00:00'),
        type: 'kai',
        content: 'The mitigation plan includes Standard Contractual Clauses (SCCs) which are appropriate for EU transfers.',
      },
    ],
    needsApproval: true,
    department: 'Legal',
  },
];

const getSourceIcon = (source: TaskSource) => {
  switch (source) {
    case 'GAP':
      return <AssessmentIcon fontSize="small" />;
    case 'DPIA':
      return <DescriptionIcon fontSize="small" />;
    case 'Voice':
      return <CommentIcon fontSize="small" />;
    case 'TIA':
      return <WarningIcon fontSize="small" />;
    case 'ROPA':
      return <AssignmentIcon fontSize="small" />;
    case 'Vendor':
      return <BusinessIcon fontSize="small" />;
  }
};

const getPriorityColor = (priority: TaskPriority): 'success' | 'warning' | 'error' => {
  switch (priority) {
    case 'high':
      return 'error';
    case 'medium':
      return 'warning';
    case 'low':
      return 'success';
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return `${Math.abs(diffDays)} days overdue`;
  } else if (diffDays === 0) {
    return 'Due today';
  } else if (diffDays === 1) {
    return 'Due tomorrow';
  } else {
    return `Due in ${diffDays} days`;
  }
};

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filters, setFilters] = useState({
    priority: '',
    dueDate: '',
    source: '',
    riskLevel: '',
    department: '',
  });
  const [commentText, setCommentText] = useState('');

  // Filter tasks based on tab, search, and filters
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    // Tab filter
    if (activeTab === 1) {
      // Approvals
      filtered = filtered.filter((t) => t.needsApproval);
    } else if (activeTab === 2) {
      // Assigned to Me
      filtered = filtered.filter((t) => t.assignees.includes('Riley Carter'));
    } else if (activeTab === 3) {
      // Completed (no completed status in mock data, so empty for now)
      filtered = [];
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.source.toLowerCase().includes(query) ||
          t.department.toLowerCase().includes(query)
      );
    }

    // Other filters
    if (filters.priority) {
      filtered = filtered.filter((t) => t.priority === filters.priority);
    }
    if (filters.source) {
      filtered = filtered.filter((t) => t.source === filters.source);
    }
    if (filters.department) {
      filtered = filtered.filter((t) => t.department === filters.department);
    }

    return filtered;
  }, [tasks, activeTab, searchQuery, filters]);

  // Group tasks by status
  const tasksByStatus = useMemo(() => {
    const grouped: Record<TaskStatus, Task[]> = {
      todo: [],
      in_progress: [],
      awaiting_approval: [],
    };

    filteredTasks.forEach((task) => {
      grouped[task.status].push(task);
    });

    return grouped;
  }, [filteredTasks]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleClosePanel = () => {
    setSelectedTask(null);
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStatus: TaskStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    );
  };

  const handleSubtaskToggle = (taskId: string, subtaskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            subtasks: task.subtasks.map((st) =>
              st.id === subtaskId ? { ...st, completed: !st.completed } : st
            ),
          };
        }
        return task;
      })
    );

    // Update selected task if it's the one being modified
    if (selectedTask?.id === taskId) {
      setSelectedTask((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          subtasks: prev.subtasks.map((st) =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          ),
        };
      });
    }
  };

  const handleApprove = () => {
    if (selectedTask) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === selectedTask.id ? { ...task, status: 'todo', needsApproval: false } : task
        )
      );
      setSelectedTask(null);
    }
  };

  const handleReject = () => {
    if (selectedTask) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === selectedTask.id ? { ...task, status: 'todo', needsApproval: false } : task
        )
      );
      setSelectedTask(null);
    }
  };

  const tabLabels = ['All Tasks', 'Approvals', 'Assigned to Me', 'Completed'];
  const statusColumns: { status: TaskStatus; label: string }[] = [
    { status: 'todo', label: 'To Do' },
    { status: 'in_progress', label: 'In Progress' },
    { status: 'awaiting_approval', label: 'Awaiting Approval' },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        minWidth: 0,
        mx: { xs: -3, md: -3 }, // Offset DashboardLayout padding
        px: { xs: 3, md: 3 }, // Re-add padding
        py: 0,
        backgroundColor: 'background.default',
        minHeight: 'calc(100vh - 64px)', // Account for navbar
      }}
    >
      {/* Top Filters Bar */}
      <Box
        sx={{
          backgroundColor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          mb: 3,
          position: 'sticky',
          top: 0,
          zIndex: 10,
          mx: { xs: -3, md: -3 }, // Full width
          px: { xs: 3, md: 3 }, // Re-add padding
        }}
      >
        <Stack spacing={2} sx={{ py: 2 }}>
          {/* Tabs */}
          <Tabs value={activeTab} onChange={handleTabChange} sx={{ minHeight: 40 }}>
            {tabLabels.map((label, index) => (
              <Tab
                key={index}
                label={label}
                sx={{
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  minHeight: 40,
                  px: 2,
                }}
              />
            ))}
          </Tabs>

          {/* Search and Filters */}
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              placeholder="Search tasks…"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                flex: 1,
                maxWidth: 400,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'background.default',
                },
              }}
            />

            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={filters.priority}
                label="Priority"
                onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Source</InputLabel>
              <Select
                value={filters.source}
                label="Source"
                onChange={(e) => setFilters({ ...filters, source: e.target.value })}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="GAP">GAP</MenuItem>
                <MenuItem value="DPIA">DPIA</MenuItem>
                <MenuItem value="Voice">Voice</MenuItem>
                <MenuItem value="TIA">TIA</MenuItem>
                <MenuItem value="ROPA">ROPA</MenuItem>
                <MenuItem value="Vendor">Vendor</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Department</InputLabel>
              <Select
                value={filters.department}
                label="Department"
                onChange={(e) => setFilters({ ...filters, department: e.target.value })}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="IT">IT</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
                <MenuItem value="Operations">Operations</MenuItem>
                <MenuItem value="Legal">Legal</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </Box>

      {/* Kanban Board */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'repeat(3, 1fr)' },
          gap: 3,
          mb: 3,
        }}
      >
        {statusColumns.map((column) => {
          const columnTasks = tasksByStatus[column.status];
          return (
            <Box key={column.status}>
              {/* Column Header */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2,
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                  {column.label}
                </Typography>
                <Chip
                  label={columnTasks.length}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '0.75rem',
                    backgroundColor: 'action.hover',
                  }}
                />
              </Box>

              {/* Column Content */}
              <Box
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.status)}
                sx={{
                  minHeight: 200,
                  backgroundColor: 'background.default',
                  borderRadius: 2,
                  p: 1.5,
                  border: '1px dashed',
                  borderColor: 'divider',
                }}
              >
                <Stack spacing={1.5}>
                  {columnTasks.map((task) => (
                    <Card
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      onClick={() => handleTaskClick(task)}
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        border: '1px solid',
                        borderColor: 'divider',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                        transition: 'all 0.2s',
                        '&:hover': {
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                          borderColor: 'primary.main',
                        },
                      }}
                    >
                      <Stack spacing={1.5}>
                        {/* Title and Source */}
                        <Box>
                          <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ mb: 0.5 }}>
                            <Box
                              sx={{
                                color: 'text.secondary',
                                display: 'flex',
                                alignItems: 'center',
                                mt: 0.25,
                              }}
                            >
                              {getSourceIcon(task.source)}
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 500,
                                fontSize: '0.875rem',
                                flex: 1,
                                lineHeight: 1.4,
                              }}
                            >
                              {task.title}
                            </Typography>
                          </Stack>
                          <Chip
                            label={task.source}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: '0.625rem',
                              backgroundColor: 'action.hover',
                              color: 'text.secondary',
                            }}
                          />
                        </Box>

                        {/* Priority and Due Date */}
                        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                          <Chip
                            label={task.priority}
                            size="small"
                            color={getPriorityColor(task.priority)}
                            sx={{ height: 20, fontSize: '0.625rem', textTransform: 'capitalize' }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'text.secondary',
                              fontSize: '0.75rem',
                            }}
                          >
                            {formatDate(task.dueDate)}
                          </Typography>
                        </Stack>

                        {/* Assignees and Subtasks */}
                        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                          {task.assignees.length > 0 && (
                            <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: '0.75rem' } }}>
                              {task.assignees.map((assignee, idx) => (
                                <Avatar key={idx} sx={{ width: 24, height: 24 }}>
                                  {assignee.charAt(0)}
                                </Avatar>
                              ))}
                            </AvatarGroup>
                          )}
                          {task.subtasks.length > 0 && (
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                              {task.subtasks.filter((st) => st.completed).length}/{task.subtasks.length} subtasks
                            </Typography>
                          )}
                        </Stack>
                      </Stack>
                    </Card>
                  ))}
                </Stack>
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Slide-Over Panel */}
      <Drawer
        anchor="right"
        open={!!selectedTask}
        onClose={handleClosePanel}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 500, md: 600 },
            maxWidth: '90vw',
          },
        }}
      >
        {selectedTask && (
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <Box
              sx={{
                p: 3,
                borderBottom: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  {getSourceIcon(selectedTask.source)}
                  <Chip
                    label={selectedTask.source}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '0.625rem',
                      backgroundColor: 'action.hover',
                    }}
                  />
                  <Chip
                    label={selectedTask.priority}
                    size="small"
                    color={getPriorityColor(selectedTask.priority)}
                    sx={{ height: 20, fontSize: '0.625rem', textTransform: 'capitalize' }}
                  />
                </Stack>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {selectedTask.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  {selectedTask.description}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {formatDate(selectedTask.dueDate)} • {selectedTask.department}
                </Typography>
              </Box>
              <IconButton onClick={handleClosePanel} size="small">
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Content */}
            <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
              <Stack spacing={3}>
                {/* Source Object */}
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Source
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {selectedTask.sourceObject}
                  </Typography>
                </Box>

                {/* Context */}
                {(selectedTask.originalAnswer || selectedTask.kaiRecommendation || selectedTask.completenessScore) && (
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Context
                    </Typography>
                    <Stack spacing={1.5}>
                      {selectedTask.originalAnswer && (
                        <Box>
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                            Original Answer:
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                            {selectedTask.originalAnswer}
                          </Typography>
                        </Box>
                      )}
                      {selectedTask.kaiRecommendation && (
                        <Box>
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                            Kai's Recommendation:
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                            {selectedTask.kaiRecommendation}
                          </Typography>
                        </Box>
                      )}
                      {selectedTask.completenessScore !== undefined && (
                        <Box>
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                            Completeness Score: {selectedTask.completenessScore}%
                          </Typography>
                        </Box>
                      )}
                    </Stack>
                  </Box>
                )}

                {/* Subtasks */}
                {selectedTask.subtasks.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Subtasks
                    </Typography>
                    <Stack spacing={1}>
                      {selectedTask.subtasks.map((subtask) => (
                        <FormControlLabel
                          key={subtask.id}
                          control={
                            <Checkbox
                              checked={subtask.completed}
                              onChange={() => handleSubtaskToggle(selectedTask.id, subtask.id)}
                              size="small"
                            />
                          }
                          label={
                            <Typography
                              variant="body2"
                              sx={{
                                textDecoration: subtask.completed ? 'line-through' : 'none',
                                color: subtask.completed ? 'text.secondary' : 'text.primary',
                              }}
                            >
                              {subtask.title}
                            </Typography>
                          }
                        />
                      ))}
                    </Stack>
                  </Box>
                )}

                {/* Attachments */}
                {selectedTask.attachments.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Attachments
                    </Typography>
                    <Stack spacing={1}>
                      {selectedTask.attachments.map((attachment, idx) => (
                        <Paper
                          key={idx}
                          variant="outlined"
                          sx={{
                            p: 1.5,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            cursor: 'pointer',
                            '&:hover': {
                              backgroundColor: 'action.hover',
                            },
                          }}
                        >
                          <AttachFileIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                          <Typography variant="body2" sx={{ flex: 1 }}>
                            {attachment}
                          </Typography>
                        </Paper>
                      ))}
                    </Stack>
                  </Box>
                )}

                {/* Add Comment */}
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Add Comment
                  </Typography>
                  <TextField
                    multiline
                    rows={3}
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    fullWidth
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'background.default',
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      if (commentText.trim() && selectedTask) {
                        const newActivity = {
                          id: Date.now().toString(),
                          timestamp: new Date(),
                          type: 'user' as const,
                          content: commentText.trim(),
                          author: 'Riley Carter',
                        };
                        setTasks((prev) =>
                          prev.map((task) =>
                            task.id === selectedTask.id
                              ? { ...task, activityLog: [...task.activityLog, newActivity] }
                              : task
                          )
                        );
                        setSelectedTask({
                          ...selectedTask,
                          activityLog: [...selectedTask.activityLog, newActivity],
                        });
                        setCommentText('');
                      }
                    }}
                    disabled={!commentText.trim()}
                    sx={{ mt: 1 }}
                  >
                    Post Comment
                  </Button>
                </Box>

                {/* Activity Log */}
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Activity Log
                  </Typography>
                  <List dense>
                    {selectedTask.activityLog.map((activity) => (
                      <ListItem key={activity.id} sx={{ px: 0, py: 1 }}>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              backgroundColor:
                                activity.type === 'kai'
                                  ? 'primary.main'
                                  : activity.type === 'user'
                                  ? 'success.main'
                                  : 'grey.300',
                            }}
                          >
                            {activity.type === 'kai' ? 'K' : activity.type === 'user' ? activity.author?.charAt(0) : 'S'}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                              {activity.content}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              {activity.author && `${activity.author} • `}
                              {activity.timestamp.toLocaleString()}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Stack>
            </Box>

            {/* Footer Actions */}
            <Box
              sx={{
                p: 3,
                borderTop: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                gap: 2,
              }}
            >
              {selectedTask.needsApproval ? (
                <>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<CheckCircleOutlineIcon />}
                    onClick={handleApprove}
                    sx={{ flex: 1 }}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<CancelIcon />}
                    onClick={handleReject}
                    sx={{ flex: 1 }}
                  >
                    Reject
                  </Button>
                </>
              ) : (
                <Button variant="outlined" startIcon={<PersonIcon />} sx={{ flex: 1 }}>
                  Reassign
                </Button>
              )}
            </Box>
          </Box>
        )}
      </Drawer>
    </Box>
  );
}

