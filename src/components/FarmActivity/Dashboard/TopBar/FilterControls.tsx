import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  SelectChangeEvent
} from '@mui/material';
import { ActivityFilters, BaseComponentProps } from '../../types';

interface FilterControlsProps extends BaseComponentProps {
  value: ActivityFilters;
  onChange: (filters: ActivityFilters) => void;
}

const activityTypes = [
  { value: 'land_prep', label: 'Land Preparation' },
  { value: 'labor', label: 'Labor' },
  { value: 'tools', label: 'Tools' },
  { value: 'general', label: 'General' }
];

const activityStatuses = [
  { value: 'planned', label: 'Planned' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' }
];

const FilterControls: React.FC<FilterControlsProps> = ({
  value,
  onChange,
  className
}) => {
  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    onChange({
      ...value,
      type: event.target.value as ActivityFilters['type']
    });
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    onChange({
      ...value,
      status: event.target.value as ActivityFilters['status']
    });
  };

  return (
    <Box className={className}>
      <Stack direction="row" spacing={2}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="activity-type-label">Type</InputLabel>
          <Select
            labelId="activity-type-label"
            id="activity-type"
            value={value.type || ''}
            label="Type"
            onChange={handleTypeChange}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {activityTypes.map(type => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="activity-status-label">Status</InputLabel>
          <Select
            labelId="activity-status-label"
            id="activity-status"
            value={value.status || ''}
            label="Status"
            onChange={handleStatusChange}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {activityStatuses.map(status => (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default FilterControls; 