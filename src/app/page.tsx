// src/app/page.tsx
import {
  withAuth,
  getSignInUrl,
  getSignUpUrl,
  signOut,
} from '@workos-inc/authkit-nextjs';
import ExcelUpload from './components/UploadExcel';

export default async function HomePage() {
  const { user } = await withAuth();

  if (!user) {
    const [signInUrl, signUpUrl] = await Promise.all([
      getSignInUrl(),
      getSignUpUrl(),
    ]);

    return (
      <main>
        <h1>Please sign in or sign up</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href={signInUrl}>Sign In</a>
          <a href={signUpUrl}>Sign Up</a>
        </div>
      </main>
    );
  }

  async function handleSignOut() {
    'use server';
    await signOut();
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
