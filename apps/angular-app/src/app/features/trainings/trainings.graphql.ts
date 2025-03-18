import { gql } from 'apollo-angular';

export const GET_ALL_TRAININGS = gql`
  query queryGetAllActiveTrainings($isMandatory: Boolean) {
    learning_resourceCollection(
      filter: { is_mandatory: { eq: $isMandatory }, is_active: { eq: true } }
    ) {
      edges {
        node {
          id
          name
          description
          url
          is_mandatory
          deadline_at
          learning_resource_type {
            id
            name
            description
          }
          is_active
        }
      }
    }
  }
`;

export const GET_TRAINING = gql`
  query queryGetTraining($id: Int!) {
    learning_resourceCollection(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          name
          description
          url
          is_mandatory
          deadline_at
          learning_resource_type {
            id
            name
            description
          }
          is_active
        }
      }
    }
  }
`;

export const GET_MY_TRAININGS = gql`
  query queryGetAssignedTrainings($userId: Int!) {
    assigned_learning_resourceCollection(filter: { user_id: { eq: $userId } }) {
      edges {
        node {
          id
          user {
            id
            first_name
            last_name
          }
          learning_resource {
            name
            description
            deadline_at
            url
          }
          resource_status {
            id
            name
          }
          started_at
          completed_at
        }
      }
    }
  }
`;

export const GET_ALL_TRAINING_TYPES = gql`
  query Learning_resource_typeCollection {
    learning_resource_typeCollection {
      edges {
        node {
          id
          name
          description
        }
      }
    }
  }
`;

export const ADD_TRAINING = gql`
  mutation mutationInsertTraining($input: learning_resourceInsertInput!) {
    insertIntolearning_resourceCollection(objects: [$input]) {
      affectedCount
      records {
        id
        type_id
        name
        url
        description
        deadline_at
        is_mandatory
        created_at
      }
    }
  }
`;

export const UPDATE_TRAINING = gql(`
  mutation mutationUpdateTraining(
    $resourceId: Int!
    $resourceDetails: learning_resourceUpdateInput!
  ) {
    updatelearning_resourceCollection(
      set: $resourceDetails
      atMost: 1
      filter: { id: { eq: $resourceId } }
    ) {
      affectedCount
      records {
        id
      }
    }
  }
`)

export const DISABLE_TRAINING = gql(`
  mutation mutationDisableTraining($resourceId: Int!) {
    updatelearning_resourceCollection(
      set: { is_active: false }
      atMost: 1
      filter: { id: { eq: $resourceId } }
    ) {
      affectedCount
    }
  }
`)
