'use client';

import { authClient, signIn } from '@/lib/auth/auth-client';
import Image from 'next/image';

export default function Login() {
  const handleLogin = () => {
    signIn();
  };

  const { data: session } = authClient.useSession();

  console.log(session);

  return (
    <>
      {!session ? (
        <div className="flex flex-col items-center justify-center w-screen h-screen gap-20">
          <Image
            src="/images/spotify_logo.png"
            alt="spotify logo"
            width={320}
            height={96}
            objectFit="contain"
          />
          <button
            className="flex px-12 py-2 text-lg tracking-widest uppercase rounded-full focus:outline-none bg-primary hover:bg-opacity-80"
            onClick={handleLogin}>
            Login
          </button>
        </div>
      ) : (
        <h1>Welcome {session?.user.name}</h1>
      )}
    </>
  );
}
