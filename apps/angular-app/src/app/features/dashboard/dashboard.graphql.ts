import { gql } from 'apollo-angular';

export const GET_ALL_ACTIVE_USERS = gql`
  query queryGetAllActiveUsers($isActive: Boolean) {
    userCollection(filter: { is_active: { eq: true } }) {
      edges {
        node {
          id
          role_id
          first_name
          last_name
          email
          assigned_learning_resourceCollection {
            edges {
              node {
                nodeId
                id
                user_id
                resource_id
                status_id
                started_at
                learning_resource {
                  nodeId
                  id
                  type_id
                  name
                  url
                  description
                  deadline_at
                  is_mandatory
                  is_active
                  created_at
                }
                completed_at
              }
            }
          }
        }
      }
    }
  }
`;
