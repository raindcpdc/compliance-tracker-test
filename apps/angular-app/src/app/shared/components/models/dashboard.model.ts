import { AssignedResourceFields, ResourceData, User } from './globals.model';

export type UsersData = {
  node: User & {
    assigned_learning_resourceCollection: {
      edges: {
        node: AssignedResourceFields & {
          learning_resource: ResourceData;
        };
      }[];
    };
  };
};
