import { auth } from '@/lib/providers/spotify';
import { headers } from 'next/headers';

// Helper to get the Better Auth session on the server.
// Use in any server component or server action:
//   import { getServerSession } from "@/lib/auth/server";
//   const session = await getServerSession();
export async function getServerSession() {
  const h = await headers();

  return await auth.api.getSession({ headers: h });
}
