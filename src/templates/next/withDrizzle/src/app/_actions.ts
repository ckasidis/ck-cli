'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
  createUserSchema,
  db,
  deleteUserSchema,
  eq,
  users,
} from '@WORKSPACE_NAME/db'

export async function createUserAction(
  input: z.infer<typeof createUserSchema>
) {
  input = createUserSchema.parse(input)
  await db.insert(users).values(input)
  revalidatePath('/')
}

export async function deleteUserAction(
  input: z.infer<typeof deleteUserSchema>
) {
  input = deleteUserSchema.parse(input)
  await db.delete(users).where(eq(users.id, input.id))
  revalidatePath('/')
}
