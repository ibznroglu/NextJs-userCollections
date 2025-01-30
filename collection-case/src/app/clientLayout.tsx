'use client';

import { useSession,SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SessionProvider><AuthenticatedLayout>{children}</AuthenticatedLayout></SessionProvider>;
}

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && !session) {
      router.push('/login');
    } else if (status === 'authenticated' && session) {
      router.push('/collections');
    }
  }, [status, session, router]);

  return <>{children}</>;
}
