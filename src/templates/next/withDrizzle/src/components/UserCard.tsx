'use client'

import { useTransition } from 'react'
import { z } from 'zod'

import { readUserSchema } from '@WORKSPACE_NAME/db'

import { deleteUserAction } from '@/app/_actions'

interface UserCardProps {
  user: z.infer<typeof readUserSchema>
}

export function UserCard({ user }: UserCardProps) {
  const [isPending, startTransition] = useTransition()
  const { id, firstName, lastName } = user
  return (
    <div className="rounded bg-gray-50 p-4 shadow">
      <div className="flex items-baseline justify-between">
        <span className="font-medium">
          {firstName} {lastName}
        </span>
        <span className="text-sm text-slate-600">ID: {id}</span>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button
          className="text-sm text-blue-600 hover:text-blue-700"
          onClick={() => startTransition(() => deleteUserAction({ id }))}
          disabled={isPending}
        >
          {isPending ? 'Deleting...' : 'Delete User'}
        </button>
      </div>
    </div>
  )
}
