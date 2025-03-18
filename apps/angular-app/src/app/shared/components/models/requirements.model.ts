import {
  AssignedResourceFields,
  ResourceData,
  ResourceStatus,
} from './globals.model';

export type RequirementData = {
  id: number;
  requirementName: string;
  requirementDesc: string;
  dueDate: string;
  requirementUrl: string;
  status?: string;
};

export type RequirementResourceData = {
  node: ResourceData;
};

export type AssignedComplianceResourceData = {
  node: AssignedResourceFields & {
    compliance_resource: ResourceData;
    resource_status: ResourceStatus;
  };
};
