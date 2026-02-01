/* eslint-disable @next/next/no-img-element */
import { getCurrentUser } from "@/features/auth/current-user";

export default async function ProfilePage() {
  const user = await getCurrentUser({
    withFullUser: true,
    redirectIfNotFound: true,
  });
  return (
    <div>
      <p>{user.email}</p>
      {user.photo && <img src={user.photo} alt="avatar" />}
    </div>
  );
}
