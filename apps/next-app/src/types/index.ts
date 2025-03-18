import * as z from "zod"
import { LearningResourceType, UserRoleType } from "@/constants"

export enum ResourceType {
  Training = "1",
  Requirement = "2",
}

export type UserRole = {
  id: UserRoleType
  name: string
}

export type Employee = {
  employeeId: string
  name: string
  department: string
  training: string
  status: "Not Started" | "In Progress" | "Completed"
  startDate: string | null
  completionDate: string | null
}

export type User = {
  id: number
  firstName: string
  lastName?: string
}

export type AuthenticatedUser = User & {
  role?: UserRole
  avatarUrl?: string
  email?: string
  isActive?: boolean
}

export type AssignedUser = User & {
  statusId: number
  completionDate?: Date
}

export const editUserSchema = z.object({
  id: z.number(),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  roleId: z
    .string()
    .refine((val) => Object.values(UserRoleType).includes(Number(val)), {
      message: "Invalid role",
    }),
  isActive: z.boolean().default(true),
})

export type EditUserModel = z.infer<typeof editUserSchema>

// TODO: update validation rules
export const addTrainingSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  type: z
    .string()
    .refine(
      (val) => Object.values(LearningResourceType).includes(Number(val)),
      { message: "Invalid type" }
    ),
  url: z.string().optional(),
  dueDate: z.date({ required_error: "Due date is required" }),
  isMandatory: z.boolean().default(true),
})

export type AddTrainingModel = z.infer<typeof addTrainingSchema>

export const editTrainingSchema = addTrainingSchema.extend({
  id: z.string(),
})

export type EditTrainingModel = z.infer<typeof editTrainingSchema>

export const addRequirementSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  url: z.string().optional(),
  dueDate: z.date({ required_error: "Due date is required" }),
})

export type AddRequirementModel = z.infer<typeof addRequirementSchema>

export const editRequirementSchema = addRequirementSchema.extend({
  id: z.string(),
})

export type EditRequirementModel = z.infer<typeof editRequirementSchema>

export const userAssignmentSchema = z.object({
  movedToAssigned: z.array(z.number()).optional(),
  movedToUnassigned: z.array(z.number()).optional(),
})

export type UserAssignmentModel = z.infer<typeof userAssignmentSchema>
