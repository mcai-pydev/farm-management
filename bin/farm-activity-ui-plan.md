# Farm Activity UI Planning

## 🎯 Overview
Planning document for the Farm Activity Management UI components and data flow.

## 📋 Core Components

### 1. ActivityDashboard
```tsx
// src/components/activity/ActivityDashboard.tsx
interface ActivityDashboardProps {
  date: Date;
  filters: ActivityFilters;
  onFilterChange: (filters: ActivityFilters) => void;
}
```

### 2. ActivityRecordForm
```tsx
// src/components/activity/forms/ActivityRecordForm.tsx
interface ActivityRecord {
  type: 'land_prep' | 'labor' | 'tools' | 'general';
  date: Date;
  description: string;
  location: FieldLocation;
  resources: Resource[];
  laborHours: number;
  status: 'planned' | 'in_progress' | 'completed';
}
```

### 3. ResourceAllocation
```tsx
// src/components/activity/resources/ResourceAllocation.tsx
interface Resource {
  id: string;
  type: 'tool' | 'equipment' | 'material';
  name: string;
  quantity: number;
  unit: string;
  status: 'available' | 'in_use' | 'maintenance';
}
```

## 🔄 Data Flow

1. User Journey
   ```mermaid
   graph TD
   A[Dashboard View] --> B[Create Activity]
   B --> C[Allocate Resources]
   C --> D[Set Schedule]
   D --> E[Save Record]
   E --> F[Update Dashboard]
   ```

2. State Management
   ```typescript
   interface ActivityState {
     records: ActivityRecord[];
     resources: Resource[];
     filters: ActivityFilters;
     selectedDate: Date;
   }
   ```

## 📱 UI Components Hierarchy

```
ActivityDashboard/
├── TopBar/
│   ├── DatePicker
│   ├── FilterControls
│   └── QuickActions
├── MainContent/
│   ├── ActivityList
│   │   ├── ActivityCard
│   │   └── ActivityDetails
│   └── ResourcePanel
└── ActionBar/
    ├── CreateButton
    └── BatchActions
```

## 🎨 Design Guidelines

1. Color Scheme
   - Primary: #2E7D32 (Forest Green)
   - Secondary: #FFA000 (Amber)
   - Error: #D32F2F
   - Success: #388E3C

2. Typography
   - Headings: Inter
   - Body: Roboto
   - Monospace: JetBrains Mono

3. Spacing
   - Base unit: 8px
   - Grid: 24px
   - Component padding: 16px

## 📊 Features & Views

1. Daily View
   - Timeline of activities
   - Resource allocation bars
   - Weather integration

2. Weekly Planner
   - Drag-n-drop scheduling
   - Resource conflicts
   - Labor distribution

3. Resource Management
   - Tool checkout system
   - Maintenance scheduling
   - Usage tracking

## 🔐 Access Control

```typescript
enum ActivityPermission {
  VIEW = 'activity:view',
  CREATE = 'activity:create',
  EDIT = 'activity:edit',
  DELETE = 'activity:delete',
  APPROVE = 'activity:approve'
}
```

## 📝 Form Validation

```typescript
const activityValidation = {
  description: yup.string().required().min(10),
  date: yup.date().required().min(new Date()),
  laborHours: yup.number().positive().max(24),
  resources: yup.array().of(resourceSchema).min(1)
};
```

## 🔄 API Integration

```typescript
interface ActivityAPI {
  baseUrl: '/api/v1/activities';
  endpoints: {
    list: GET '/';
    create: POST '/';
    update: PUT '/:id';
    delete: DELETE '/:id';
    resources: GET '/resources';
  }
}
```

## 📱 Responsive Design

1. Breakpoints
   ```scss
   $breakpoints: (
     'mobile': 320px,
     'tablet': 768px,
     'desktop': 1024px,
     'wide': 1440px
   );
   ```

2. Layout Adjustments
   - Mobile: Single column, collapsible sections
   - Tablet: Two-column layout
   - Desktop: Three-column with sidebar

## 🧪 Testing Strategy

1. Component Tests
   ```typescript
   describe('ActivityRecordForm', () => {
     it('validates required fields');
     it('handles resource allocation');
     it('submits form data correctly');
   });
   ```

2. Integration Tests
   - Form submission flow
   - Resource allocation conflicts
   - Date-based filtering

## 📦 Dependencies

```json
{
  "@mui/material": "^5.x",
  "@tanstack/react-query": "^4.x",
  "date-fns": "^2.x",
  "react-hook-form": "^7.x",
  "yup": "^1.x"
}
``` 