import RootLayout from './layout';
import ClientLayout from './clientLayout';

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout>
      <ClientLayout>{children}</ClientLayout>
    </RootLayout>
  );
}
