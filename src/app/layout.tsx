import './globals.css';
import Header from '@/components/Header';
import AuthProviderWrapper from '@/app/providers/AuthProviderWrapper';
import { ReduxProvider } from '@/app/providers';
import { Toaster } from "react-hot-toast";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProviderWrapper>
          <ReduxProvider>
            <Header />
            {children}
            <Toaster />
          </ReduxProvider>
        </AuthProviderWrapper>
      </body>
    </html>
  );
}