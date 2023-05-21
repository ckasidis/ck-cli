import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { users } from './schema'

const selectUserSchema = createSelectSchema(users)
const insertUserSchema = createInsertSchema(users, {
  id: (schema) => schema.id.positive(),
  firstName: (schema) => schema.firstName.min(1).max(255),
  lastName: (schema) => schema.lastName.min(1).max(255),
})

export const createUserSchema = insertUserSchema.omit({
  id: true,
  createdAt: true,
})
export const readUserSchema = selectUserSchema
export const updateUserSchema = createUserSchema.partial()
export const deleteUserSchema = selectUserSchema.pick({ id: true })
