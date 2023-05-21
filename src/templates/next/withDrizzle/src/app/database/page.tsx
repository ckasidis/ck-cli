import { db, users } from '@WORKSPACE_NAME/db'

import { CreateUserForm } from '@/components/CreateUserForm'
import { UserCard } from '@/components/UserCard'

export default async function DatabasePage() {
  const allUsers = await db.select().from(users)

  return (
    <div className="mx-auto grid max-w-6xl gap-y-4 px-6 py-4">
      <h1 className="mt-4 text-2xl">Postgres + Drizzle</h1>
      <CreateUserForm />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}
