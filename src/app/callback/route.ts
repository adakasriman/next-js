// src/app/callback/route.ts

import { handleAuth } from '@workos-inc/authkit-nextjs';

// Customize redirect path after successful sign-in (default: '/')
export const GET = handleAuth({
  returnPathname: '/', // change this if you want to redirect elsewhere after login
});
