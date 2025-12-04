// app/(supervisor)/types.ts
export interface Report {
  id: string;
  title: string;
  status: 'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  assignedTo: string | null;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  assignedReports: number;
}

export type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

export interface StatCardProps {
  value: string;
  label: string;
  color: string;
  style?: any;
}