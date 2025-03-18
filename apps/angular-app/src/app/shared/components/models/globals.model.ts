export type ResourceData = {
  id: number;
  type_id?: number;
  name: string;
  url: string;
  description: string;
  deadline_at: string;
  is_mandatory?: boolean;
  is_active: boolean;
  created_at: string;
};

export type LearningResourceType = {
  id: number;
  name: string;
  description: string;
};

export type ResourceStatus = {
  id: number;
  name: string;
  description: string;
};

export type AssignedResourceFields = {
  id: number;
  user_id: number;
  resource_id: number;
  status_id: number;
  started_at: string;
  completed_at: string;
  modified_at: string;
  created_at: string;
};

export type User = {
  id: number;
  role_id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_active: string;
  auth_id: string;
};

export enum ResourceStatusOptions {
  NOT_STARTED = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3,
}
