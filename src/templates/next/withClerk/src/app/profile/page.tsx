import { currentUser } from '@clerk/nextjs'

export default async function ProfilePage() {
  const { id } = await currentUser()
  return (
    <div className="mx-auto grid max-w-6xl gap-y-4 px-6 py-4">
      <h1 className="mt-4 text-2xl">Profile</h1>
      <p>id: {id}</p>
    </div>
  )
}
