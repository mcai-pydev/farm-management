import React from 'react';
import { Box, Stack } from '@mui/material';
import { TopBarProps } from '../../types';
import DatePicker from './DatePicker';
import FilterControls from './FilterControls';
import QuickActions from './QuickActions';

const TopBar: React.FC<TopBarProps> = ({
  selectedDate,
  currentFilters,
  onDateChange,
  onFilterChange,
  className
}) => {
  return (
    <Box 
      className={className}
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <DatePicker
          value={selectedDate}
          onChange={onDateChange}
        />
        <FilterControls
          value={currentFilters}
          onChange={onFilterChange}
        />
      </Stack>
      
      <QuickActions />
    </Box>
  );
};

export default TopBar; 