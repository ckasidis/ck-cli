'use client'

import { createUserSchema } from '@WORKSPACE_NAME/db'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createUserAction } from '@/app/_actions'

type CreateUserInput = z.infer<typeof createUserSchema>

export function CreateUserForm() {
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  })

  const onSubmit = (input: CreateUserInput) => {
    reset()
    startTransition(() => createUserAction(input))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid max-w-sm gap-y-2">
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        type="text"
        className="rounded border px-4 py-2"
        {...register('firstName')}
      />
      {errors?.firstName && <p className="text-red-500">Invalid First Name</p>}

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        type="text"
        className="rounded border px-4 py-2"
        {...register('lastName')}
      />
      {errors?.lastName && <p className="text-red-500">Invalid Last Name</p>}

      <button
        className="my-2 justify-self-start rounded bg-indigo-600 px-4 py-2 text-white shadow hover:bg-indigo-700"
        type="submit"
        disabled={isPending}
      >
        {isPending ? 'Loading...' : 'Create User'}
      </button>
    </form>
  )
}
