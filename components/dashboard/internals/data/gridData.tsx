import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { GridCellParams, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

type SparkLineData = number[];

function getDaysInMonth(month: number, year: number) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString('en-US', {
    month: 'short',
  });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}

function renderSparklineCell(params: GridCellParams<SparkLineData, any>) {
  const data = getDaysInMonth(4, 2024);
  const { value, colDef } = params;

  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <SparkLineChart
        data={value}
        width={colDef.computedWidth || 100}
        height={32}
        plotType="bar"
        showHighlight
        showTooltip
        color="hsl(210, 98%, 42%)"
        xAxis={{
          scaleType: 'band',
          data,
        }}
      />
    </div>
  );
}

function renderRiskLevel(riskLevel: 'High' | 'Medium' | 'Low') {
  const colors: { [index: string]: 'error' | 'warning' | 'success' } = {
    High: 'error',
    Medium: 'warning',
    Low: 'success',
  };

  return <Chip label={riskLevel} color={colors[riskLevel] || 'success'} size="small" />;
}

export function renderAvatar(
  params: GridCellParams<{ name: string; color: string }, any, any>,
) {
  if (params.value == null) {
    return '';
  }

  return (
    <Avatar
      sx={{
        backgroundColor: params.value.color,
        width: '24px',
        height: '24px',
        fontSize: '0.85rem',
      }}
    >
      {params.value.name.toUpperCase().substring(0, 1)}
    </Avatar>
  );
}

export const columns: GridColDef[] = [
  { field: 'processingActivityName', headerName: 'Processing Activity Name', flex: 2, minWidth: 250 },
  {
    field: 'businessUnit',
    headerName: 'Business Unit',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'lawfulBasis',
    headerName: 'Lawful Basis',
    flex: 1.2,
    minWidth: 140,
  },
  {
    field: 'riskLevel',
    headerName: 'Risk Level',
    flex: 0.8,
    minWidth: 100,
    renderCell: (params) => renderRiskLevel(params.value as any),
  },
  {
    field: 'assessmentsLinked',
    headerName: 'Assessments Linked',
    flex: 1.5,
    minWidth: 180,
  },
  {
    field: 'lastUpdated',
    headerName: 'Last Updated',
    flex: 1,
    minWidth: 120,
  },
];

export const rows: GridRowsProp = [
  {
    id: 1,
    processingActivityName: 'Employee Leave Management',
    businessUnit: 'HR',
    lawfulBasis: 'Legitimate Interest',
    riskLevel: 'Medium',
    assessmentsLinked: 'DPIA',
    lastUpdated: '2 days ago',
  },
  {
    id: 2,
    processingActivityName: 'Customer Registration Portal',
    businessUnit: 'IT',
    lawfulBasis: 'Consent',
    riskLevel: 'High',
    assessmentsLinked: 'GAP, DPIA',
    lastUpdated: '5 days ago',
  },
  {
    id: 3,
    processingActivityName: 'Payroll Processing',
    businessUnit: 'Finance',
    lawfulBasis: 'Legal Obligation',
    riskLevel: 'High',
    assessmentsLinked: 'DPIA, TIA',
    lastUpdated: '1 day ago',
  },
  {
    id: 4,
    processingActivityName: 'Marketing Lead Form',
    businessUnit: 'Marketing',
    lawfulBasis: 'Consent',
    riskLevel: 'Medium',
    assessmentsLinked: 'ROPA',
    lastUpdated: '3 days ago',
  },
  {
    id: 5,
    processingActivityName: 'Employee Performance Reviews',
    businessUnit: 'HR',
    lawfulBasis: 'Legitimate Interest',
    riskLevel: 'Low',
    assessmentsLinked: 'DPIA',
    lastUpdated: '7 days ago',
  },
  {
    id: 6,
    processingActivityName: 'Customer Support Tickets',
    businessUnit: 'Operations',
    lawfulBasis: 'Contract',
    riskLevel: 'Medium',
    assessmentsLinked: 'GAP',
    lastUpdated: '4 days ago',
  },
  {
    id: 7,
    processingActivityName: 'Vendor Payment Processing',
    businessUnit: 'Finance',
    lawfulBasis: 'Contract',
    riskLevel: 'Low',
    assessmentsLinked: 'Vendor Assessment',
    lastUpdated: '6 days ago',
  },
  {
    id: 8,
    processingActivityName: 'Employee Onboarding',
    businessUnit: 'HR',
    lawfulBasis: 'Legal Obligation',
    riskLevel: 'Medium',
    assessmentsLinked: 'DPIA, LIA',
    lastUpdated: '2 days ago',
  },
  {
    id: 9,
    processingActivityName: 'Customer Analytics Platform',
    businessUnit: 'IT',
    lawfulBasis: 'Legitimate Interest',
    riskLevel: 'High',
    assessmentsLinked: 'DPIA, TIA',
    lastUpdated: '1 day ago',
  },
  {
    id: 10,
    processingActivityName: 'Email Marketing Campaigns',
    businessUnit: 'Marketing',
    lawfulBasis: 'Consent',
    riskLevel: 'Medium',
    assessmentsLinked: 'GAP, ROPA',
    lastUpdated: '5 days ago',
  },
  {
    id: 11,
    processingActivityName: 'Employee Benefits Administration',
    businessUnit: 'HR',
    lawfulBasis: 'Contract',
    riskLevel: 'Low',
    assessmentsLinked: 'DPIA',
    lastUpdated: '8 days ago',
  },
  {
    id: 12,
    processingActivityName: 'Order Fulfillment System',
    businessUnit: 'Operations',
    lawfulBasis: 'Contract',
    riskLevel: 'Medium',
    assessmentsLinked: 'GAP, DPIA',
    lastUpdated: '3 days ago',
  },
  {
    id: 13,
    processingActivityName: 'Customer Feedback Surveys',
    businessUnit: 'Marketing',
    lawfulBasis: 'Consent',
    riskLevel: 'Low',
    assessmentsLinked: 'ROPA',
    lastUpdated: '9 days ago',
  },
  {
    id: 14,
    processingActivityName: 'Account Settings Management',
    businessUnit: 'IT',
    lawfulBasis: 'Contract',
    riskLevel: 'Low',
    assessmentsLinked: 'GAP',
    lastUpdated: '4 days ago',
  },
  {
    id: 15,
    processingActivityName: 'Authentication & Login',
    businessUnit: 'IT',
    lawfulBasis: 'Legitimate Interest',
    riskLevel: 'High',
    assessmentsLinked: 'DPIA, TIA',
    lastUpdated: '1 day ago',
  },
  {
    id: 16,
    processingActivityName: 'Promotional Campaigns',
    businessUnit: 'Marketing',
    lawfulBasis: 'Consent',
    riskLevel: 'Medium',
    assessmentsLinked: 'GAP, ROPA',
    lastUpdated: '6 days ago',
  },
  {
    id: 17,
    processingActivityName: 'Employee Training Records',
    businessUnit: 'HR',
    lawfulBasis: 'Legitimate Interest',
    riskLevel: 'Low',
    assessmentsLinked: 'DPIA',
    lastUpdated: '10 days ago',
  },
  {
    id: 18,
    processingActivityName: 'Blog & Content Management',
    businessUnit: 'Marketing',
    lawfulBasis: 'Consent',
    riskLevel: 'Low',
    assessmentsLinked: 'ROPA',
    lastUpdated: '7 days ago',
  },
  {
    id: 19,
    processingActivityName: 'Webinar Registration',
    businessUnit: 'Marketing',
    lawfulBasis: 'Consent',
    riskLevel: 'Medium',
    assessmentsLinked: 'GAP, DPIA',
    lastUpdated: '2 days ago',
  },
  {
    id: 20,
    processingActivityName: 'Contact Us Form',
    businessUnit: 'Operations',
    lawfulBasis: 'Legitimate Interest',
    riskLevel: 'Low',
    assessmentsLinked: 'ROPA',
    lastUpdated: '5 days ago',
  },
  {
    id: 21,
    processingActivityName: 'Case Study Submissions',
    businessUnit: 'Marketing',
    lawfulBasis: 'Consent',
    riskLevel: 'Low',
    assessmentsLinked: 'ROPA',
    lastUpdated: '11 days ago',
  },
  {
    id: 22,
    processingActivityName: 'Industry News Subscriptions',
    businessUnit: 'Marketing',
    lawfulBasis: 'Consent',
    riskLevel: 'Low',
    assessmentsLinked: 'ROPA',
    lastUpdated: '8 days ago',
  },
  {
    id: 23,
    processingActivityName: 'User Forum Discussions',
    businessUnit: 'IT',
    lawfulBasis: 'Consent',
    riskLevel: 'Medium',
    assessmentsLinked: 'GAP, DPIA',
    lastUpdated: '3 days ago',
  },
  {
    id: 24,
    processingActivityName: 'API Documentation Access',
    businessUnit: 'IT',
    lawfulBasis: 'Contract',
    riskLevel: 'Low',
    assessmentsLinked: 'GAP',
    lastUpdated: '6 days ago',
  },
  {
    id: 25,
    processingActivityName: 'Consulting Service Requests',
    businessUnit: 'Operations',
    lawfulBasis: 'Contract',
    riskLevel: 'Medium',
    assessmentsLinked: 'DPIA',
    lastUpdated: '4 days ago',
  },
  {
    id: 26,
    processingActivityName: 'User Review Submissions',
    businessUnit: 'Marketing',
    lawfulBasis: 'Consent',
    riskLevel: 'Low',
    assessmentsLinked: 'ROPA',
    lastUpdated: '9 days ago',
  },
  {
    id: 27,
    processingActivityName: 'Team Member Profiles',
    businessUnit: 'HR',
    lawfulBasis: 'Legitimate Interest',
    riskLevel: 'Low',
    assessmentsLinked: 'DPIA',
    lastUpdated: '7 days ago',
  },
  {
    id: 28,
    processingActivityName: 'Notification Preferences',
    businessUnit: 'IT',
    lawfulBasis: 'Consent',
    riskLevel: 'Low',
    assessmentsLinked: 'GAP',
    lastUpdated: '5 days ago',
  },
  {
    id: 29,
    processingActivityName: 'Dashboard Metrics & Analytics',
    businessUnit: 'IT',
    lawfulBasis: 'Legitimate Interest',
    riskLevel: 'High',
    assessmentsLinked: 'DPIA, TIA',
    lastUpdated: '1 day ago',
  },
  {
    id: 30,
    processingActivityName: 'Monthly Reporting',
    businessUnit: 'Finance',
    lawfulBasis: 'Legal Obligation',
    riskLevel: 'Medium',
    assessmentsLinked: 'DPIA',
    lastUpdated: '2 days ago',
  },
  {
    id: 31,
    processingActivityName: 'Employee Onboarding Training',
    businessUnit: 'HR',
    lawfulBasis: 'Legitimate Interest',
    riskLevel: 'Low',
    assessmentsLinked: 'DPIA',
    lastUpdated: '8 days ago',
  },
  {
    id: 32,
    processingActivityName: 'Knowledge Base Access',
    businessUnit: 'IT',
    lawfulBasis: 'Contract',
    riskLevel: 'Low',
    assessmentsLinked: 'GAP',
    lastUpdated: '6 days ago',
  },
  {
    id: 33,
    processingActivityName: 'Privacy Settings Controls',
    businessUnit: 'IT',
    lawfulBasis: 'Legal Obligation',
    riskLevel: 'Medium',
    assessmentsLinked: 'DPIA, LIA',
    lastUpdated: '3 days ago',
  },
  {
    id: 34,
    processingActivityName: 'Third-Party Service Integrations',
    businessUnit: 'IT',
    lawfulBasis: 'Contract',
    riskLevel: 'High',
    assessmentsLinked: 'Vendor Assessment, DPIA',
    lastUpdated: '1 day ago',
  },
  {
    id: 35,
    processingActivityName: 'Billing Information Management',
    businessUnit: 'Finance',
    lawfulBasis: 'Contract',
    riskLevel: 'High',
    assessmentsLinked: 'DPIA, TIA',
    lastUpdated: '2 days ago',
  },
];
