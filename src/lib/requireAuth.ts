import { withAuth } from "@workos-inc/authkit-nextjs";
import { NextResponse } from "next/server";

export function requireAuth(handler: Function) {
  return async function (req: Request, ...rest: any[]) {
    const { user } = await withAuth({ ensureSignedIn: true });

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return handler(req, user, ...rest);
  };
}
