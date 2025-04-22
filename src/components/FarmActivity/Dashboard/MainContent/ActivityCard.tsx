import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
  CardActionArea,
  Stack
} from '@mui/material';
import {
  AccessTime as TimeIcon,
  Room as LocationIcon,
  Person as PersonIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { ActivityCardProps } from '../../types';

const statusColors = {
  planned: 'info',
  in_progress: 'warning',
  completed: 'success'
} as const;

const typeLabels = {
  land_prep: 'Land Preparation',
  labor: 'Labor',
  tools: 'Tools',
  general: 'General'
} as const;

const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  onClick,
  isSelected,
  className
}) => {
  const handleClick = () => {
    onClick(activity.id);
  };

  return (
    <Card 
      className={className}
      raised={isSelected}
      sx={{
        borderLeft: 4,
        borderLeftColor: theme => 
          theme.palette[statusColors[activity.status]].main
      }}
    >
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Typography variant="h6" component="h3" gutterBottom>
              {activity.description}
            </Typography>
            <IconButton size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>

          <Stack spacing={1} mt={2}>
            <Box display="flex" gap={1}>
              <Chip
                size="small"
                label={typeLabels[activity.type]}
                color="primary"
                variant="outlined"
              />
              <Chip
                size="small"
                label={activity.status}
                color={statusColors[activity.status]}
              />
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <TimeIcon fontSize="small" color="action" />
              <Typography variant="body2" color="textSecondary">
                {format(activity.date, 'PPP')}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <LocationIcon fontSize="small" color="action" />
              <Typography variant="body2" color="textSecondary">
                Field: {activity.location.fieldId}
              </Typography>
            </Box>

            {activity.assignedTo && activity.assignedTo.length > 0 && (
              <Box display="flex" alignItems="center" gap={1}>
                <PersonIcon fontSize="small" color="action" />
                <Typography variant="body2" color="textSecondary">
                  Assigned: {activity.assignedTo.length} people
                </Typography>
              </Box>
            )}

            {activity.resources.length > 0 && (
              <Typography variant="body2" color="textSecondary">
                Resources: {activity.resources.length} items
              </Typography>
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ActivityCard; 