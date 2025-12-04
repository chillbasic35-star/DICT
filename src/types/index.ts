export type UserRole = 'CITIZEN' | 'STAFF' | 'ADMIN' | 'SUPERVISOR';

export type WithIsActive<T> = T & {
  [key: string]: string | boolean | undefined;
  isActive: boolean;
};

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  officeId?: string;
  photoURL?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type UserWithIndex = WithIsActive<User>;

export type ReportStatus = 'PENDING' | 'IN_PROGRESS' | 'IN_REVIEW' | 'RESOLVED' | 'REJECTED';
export type ReportPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Attachment {
  id: string;
  reportId: string;
  type: 'IMAGE' | 'FILE';
  url: string;
}

export interface Report {
  id: string;
  citizenId: string;
  title: string;
  description?: string;
  categoryId: string;
  status: ReportStatus;
  priority?: ReportPriority;
  assignedToStaffId?: string;
  locationId?: string;
  attachments: Attachment[];
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

export type CategoryWithIndex = WithIsActive<Category>;

export interface Location {
  id: string;
  name: string;
  region?: string;
  province?: string;
  cityMunicipality?: string;
  barangay?: string;
}

export interface ChatMessage {
  id: string;
  reportId: string;
  senderId: string;
  senderRole: UserRole;
  message: string;
  createdAt: string;
  isInternal: boolean;
}
