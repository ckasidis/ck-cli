import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'

export * from 'drizzle-orm'
export * from './schema'

export const db = drizzle(sql)
