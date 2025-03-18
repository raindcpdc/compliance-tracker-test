import { graphql } from "./generated/gql"

export const queryGetUser = graphql(`
  query queryGetUser($userId: Int!) {
    userCollection(filter: { id: { eq: $userId } }) {
      edges {
        node {
          id
          user_role {
            id
            name
          }
          first_name
          last_name
          email
          is_active
        }
      }
    }
  }
`)

export const queryGetAllUsers = graphql(`
  query queryGetAllUsers {
    userCollection(
      orderBy: [{ last_name: AscNullsFirst }, { first_name: AscNullsFirst }]
    ) {
      edges {
        node {
          id
          user_role {
            id
            name
          }
          first_name
          last_name
          email
          is_active
        }
      }
    }
  }
`)

export const queryGetAssignedUsersByTrainingResource = graphql(`
  query queryGetAssignedUsersByTrainingResource($resourceId: Int!) {
    assigned_learning_resourceCollection(
      filter: { resource_id: { eq: $resourceId } }
    ) {
      edges {
        node {
          user {
            id
            first_name
            last_name
          }
          status_id
          completed_at
        }
      }
    }
  }
`)

export const queryGetAssignedUsersByRequirementResource = graphql(`
  query queryGetAssignedUsersByRequirementResource($resourceId: Int!) {
    assigned_compliance_resourceCollection(
      filter: { resource_id: { eq: $resourceId } }
    ) {
      edges {
        node {
          user {
            id
            first_name
            last_name
          }
          status_id
          completed_at
        }
      }
    }
  }
`)

export const queryGetTrainings = graphql(`
  query queryGetTrainings($isMandatory: Boolean) {
    learning_resourceCollection(
      filter: { is_mandatory: { eq: $isMandatory }, is_active: { eq: true } }
    ) {
      edges {
        node {
          id
          name
          description
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
`)

export const queryGetTrainingList = graphql(`
  query queryGetTrainingList {
    learning_resourceCollection(filter: { is_active: { eq: true } }) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`)

export const queryGetTraining = graphql(`
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
`)

export const queryGetAssignedTrainings = graphql(`
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
`)

export const queryGetRequirement = graphql(`
  query queryGetRequirement($id: Int!) {
    compliance_resourceCollection(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          name
          description
          url
          deadline_at
          is_active
        }
      }
    }
  }
`)

export const queryGetRequirements = graphql(`
  query queryGetRequirements($isActive: Boolean) {
    compliance_resourceCollection(filter: { is_active: { eq: $isActive } }) {
      edges {
        node {
          id
          name
          description
          url
          deadline_at
          is_active
        }
      }
    }
  }
`)

export const queryGetRequirementList = graphql(`
  query queryGetRequirementList {
    compliance_resourceCollection(filter: { is_active: { eq: true } }) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`)

export const queryGetAssignedRequirements = graphql(`
  query queryGetAssignedRequirements($userId: Int!) {
    assigned_compliance_resourceCollection(
      filter: { user_id: { eq: $userId } }
    ) {
      edges {
        node {
          id
          user {
            id
            first_name
            last_name
          }
          compliance_resource {
            id
            name
            description
            url
            deadline_at
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
`)
