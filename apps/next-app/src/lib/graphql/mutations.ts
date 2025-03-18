import { graphql } from "./generated/gql"

export const mutationDisableUser = graphql(`
  mutation mutationDisableUser($userId: Int!) {
    updateuserCollection(
      atMost: 1
      set: { is_active: false }
      filter: { id: { eq: $userId } }
    ) {
      affectedCount
    }
  }
`)

export const mutationUpdateUser = graphql(`
  mutation mutationUpdateUser($userId: Int!, $userDetails: userUpdateInput!) {
    updateuserCollection(
      set: $userDetails
      atMost: 1
      filter: { id: { eq: $userId } }
    ) {
      affectedCount
    }
  }
`)

export const mutationInsertTraining = graphql(`
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
`)

export const mutationUpdateTraining = graphql(`
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

export const mutationDisableTraining = graphql(`
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

export const mutationUpdateAssignedTrainingStatus = graphql(`
  mutation mutationUpdateAssignedTrainingStatus(
    $assignedTrainingId: BigInt!
    $statusId: Int!
    $modifiedAt: Datetime!
    $startedAt: Datetime
    $completedAt: Datetime
  ) {
    updateassigned_learning_resourceCollection(
      set: {
        status_id: $statusId
        started_at: $startedAt
        completed_at: $completedAt
        modified_at: $modifiedAt
      }
      atMost: 1
      filter: { id: { eq: $assignedTrainingId } }
    ) {
      affectedCount
    }
  }
`)

export const mutationInsertRequirement = graphql(`
  mutation mutationInsertRequirement($input: compliance_resourceInsertInput!) {
    insertIntocompliance_resourceCollection(objects: [$input]) {
      affectedCount
      records {
        nodeId
        id
        name
        description
        url
        is_active
        deadline_at
        created_at
      }
    }
  }
`)

export const mutationUpdateRequirement = graphql(`
  mutation mutationUpdateRequirement(
    $resourceId: Int!
    $resourceDetails: compliance_resourceUpdateInput!
  ) {
    updatecompliance_resourceCollection(
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

export const mutationDisableRequirement = graphql(`
  mutation mutationDisableRequirement($resourceId: Int!) {
    updatecompliance_resourceCollection(
      set: { is_active: false }
      atMost: 1
      filter: { id: { eq: $resourceId } }
    ) {
      affectedCount
    }
  }
`)

export const mutationUpdateAssignedRequirementStatus = graphql(`
  mutation mutationUpdateAssignedRequirementStatus(
    $assignedComplianceId: BigInt!
    $statusId: Int!
    $modifiedAt: Datetime!
    $startedAt: Datetime
    $completedAt: Datetime
  ) {
    updateassigned_compliance_resourceCollection(
      set: {
        status_id: $statusId
        started_at: $startedAt
        completed_at: $completedAt
        modified_at: $modifiedAt
      }
      atMost: 1
      filter: { id: { eq: $assignedComplianceId } }
    ) {
      affectedCount
    }
  }
`)
