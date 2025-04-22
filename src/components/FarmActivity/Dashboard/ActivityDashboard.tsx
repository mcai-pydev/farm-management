import React, { useState } from 'react';
import { Box, Container, Paper } from '@mui/material';
import { ActivityFilters, ActivityRecord, BaseComponentProps } from '../types';
import TopBar from './TopBar';
import ActivityList from './MainContent/ActivityList';
import { useQuery } from '@tanstack/react-query';
import { fetchActivities } from '../api/activities';

interface ActivityDashboardProps extends BaseComponentProps {
  defaultDate?: Date;
  defaultFilters?: ActivityFilters;
}

const ActivityDashboard: React.FC<ActivityDashboardProps> = ({
  defaultDate = new Date(),
  defaultFilters = {},
  className
}) => {
  // State
  const [selectedDate, setSelectedDate] = useState<Date>(defaultDate);
  const [filters, setFilters] = useState<ActivityFilters>(defaultFilters);
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);

  // Data fetching
  const {
    data: activities,
    isLoading,
    error
  } = useQuery<ActivityRecord[]>({
    queryKey: ['activities', selectedDate, filters],
    queryFn: () => fetchActivities({ date: selectedDate, ...filters })
  });

  // Event handlers
  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  const handleFilterChange = (newFilters: ActivityFilters) => {
    setFilters(newFilters);
  };

  const handleActivityClick = (activityId: string) => {
    setSelectedActivityId(activityId);
  };

  return (
    <Container maxWidth="xl" className={className}>
      <Box sx={{ py: 3 }}>
        <Paper elevation={0} sx={{ mb: 3 }}>
          <TopBar
            selectedDate={selectedDate}
            currentFilters={filters}
            onDateChange={handleDateChange}
            onFilterChange={handleFilterChange}
          />
        </Paper>

        <Paper elevation={1}>
          <ActivityList
            activities={activities || []}
            onActivityClick={handleActivityClick}
            isLoading={isLoading}
            error={error as Error}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default ActivityDashboard; 