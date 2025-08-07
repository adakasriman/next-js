// src/app/page.tsx
import {
  withAuth,
  getSignInUrl,
  getSignUpUrl,
  signOut,
} from '@workos-inc/authkit-nextjs';
import ExcelUpload from './components/UploadExcel';
import Link from 'next/link';

export default async function HomePage() {
  const { user } = await withAuth();

  if (!user) {
    const signInUrl = await getSignInUrl();
    const signUpUrl = await getSignUpUrl();

    return (
      <main>
        <h1>Please sign in or sign up</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href={signInUrl}>Sign In</Link>
          <Link href={signUpUrl}>Sign Up</Link>
        </div>
      </main>
    );
  }

  const handleSignOut = async () => {
    'use server';
    return await signOut();
  }

  return (
    <main>
      <p>Welcome back{user.firstName ? `, ${user.firstName}` : ''}!</p>
      <ExcelUpload />
      <form action={handleSignOut}>
        <button type="submit">Sign Out</button>
      </form>
    </main>
  );
}
