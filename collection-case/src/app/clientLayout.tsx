'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import { Provider } from 'react-redux';
import store from '../store/store';
import { useRouter } from 'next/navigation';

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SessionProvider>
      <AuthenticatedLayout>{children}</AuthenticatedLayout>
    </SessionProvider>
  );
}

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  
  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  return <>{children}</>;
}
