'use client';
import { AuthKitProvider } from '@workos-inc/authkit-nextjs/components';

export default function AuthProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthKitProvider>{children}</AuthKitProvider>;
}
