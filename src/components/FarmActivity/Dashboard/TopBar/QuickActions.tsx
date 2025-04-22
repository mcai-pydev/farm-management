import React from 'react';
import { Button, Stack } from '@mui/material';
import { Add as AddIcon, FilterList as FilterIcon, Download as DownloadIcon } from '@mui/icons-material';
import { BaseComponentProps } from '../../types';

interface QuickActionsProps extends BaseComponentProps {
  onCreateActivity?: () => void;
  onExport?: () => void;
  onAdvancedFilter?: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  onCreateActivity,
  onExport,
  onAdvancedFilter,
  className
}) => {
  return (
    <Stack direction="row" spacing={1} className={className}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={onCreateActivity}
        size="small"
      >
        New Activity
      </Button>

      <Button
        variant="outlined"
        color="primary"
        startIcon={<FilterIcon />}
        onClick={onAdvancedFilter}
        size="small"
      >
        Advanced
      </Button>

      <Button
        variant="outlined"
        color="primary"
        startIcon={<DownloadIcon />}
        onClick={onExport}
        size="small"
      >
        Export
      </Button>
    </Stack>
  );
};

export default QuickActions; 