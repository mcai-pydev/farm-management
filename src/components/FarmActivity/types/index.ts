import { ReactNode } from 'react';

export interface ActivityFilters {
  type?: 'land_prep' | 'labor' | 'tools' | 'general';
  status?: 'planned' | 'in_progress' | 'completed';
  dateRange?: {
    start: Date;
    end: Date;
  };
  location?: string;
}

export interface Resource {
  id: string;
  type: 'tool' | 'equipment' | 'material';
  name: string;
  quantity: number;
  unit: string;
  status: 'available' | 'in_use' | 'maintenance';
}

export interface ActivityRecord {
  id: string;
  type: 'land_prep' | 'labor' | 'tools' | 'general';
  date: Date;
  description: string;
  location: {
    fieldId: string;
    coordinates?: [number, number];
  };
  resources: Resource[];
  laborHours: number;
  status: 'planned' | 'in_progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  assignedTo?: string[];
}

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export interface TopBarProps extends BaseComponentProps {
  onDateChange: (date: Date) => void;
  onFilterChange: (filters: ActivityFilters) => void;
  selectedDate: Date;
  currentFilters: ActivityFilters;
}

export interface ActivityListProps extends BaseComponentProps {
  activities: ActivityRecord[];
  onActivityClick: (activityId: string) => void;
  isLoading?: boolean;
  error?: Error;
}

export interface ActivityCardProps extends BaseComponentProps {
  activity: ActivityRecord;
  onClick: (activityId: string) => void;
  isSelected?: boolean;
}

export interface ActivityFormProps extends BaseComponentProps {
  initialValues?: Partial<ActivityRecord>;
  onSubmit: (data: Partial<ActivityRecord>) => Promise<void>;
  isSubmitting?: boolean;
  error?: Error;
} 