import {
  ResourceData,
  LearningResourceType,
  ResourceStatus,
  AssignedResourceFields,
} from './globals.model';

export type TrainingData = {
  id: number;
  trainingName: string;
  trainingDesc: string;
  dueDate: string;
  trainingUrl: string;
  status?: string;
  isMandatory?: boolean;
  resourceType?: string;
};

export type ResourceTypeOption = {
  value: string;
  label: string;
};

export type ResourceTypeData = {
  node: {
    id: number;
    name: string;
    description: string;
  };
};

export type LearningResourceData = {
  node: ResourceData & { learning_resource_type: LearningResourceType };
};

export type AssignedLearningResourceData = {
  node: AssignedResourceFields & {
    learning_resource: ResourceData;
    resource_status: ResourceStatus;
  };
};
