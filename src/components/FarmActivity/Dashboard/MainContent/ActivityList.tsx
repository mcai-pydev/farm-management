import React from 'react';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';
import { ActivityListProps } from '../../types';
import ActivityCard from './ActivityCard';
import { styled } from '@mui/material/styles';

const StyledList = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  }
}));

const ActivityList: React.FC<ActivityListProps> = ({
  activities,
  onActivityClick,
  isLoading,
  error,
  className
}) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error">
          Failed to load activities: {error.message}
        </Alert>
      </Box>
    );
  }

  if (activities.length === 0) {
    return (
      <Box p={4} textAlign="center">
        <Typography color="textSecondary">
          No activities found for the selected filters
        </Typography>
      </Box>
    );
  }

  return (
    <StyledList className={className}>
      {activities.map(activity => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          onClick={onActivityClick}
        />
      ))}
    </StyledList>
  );
};

export default ActivityList; 