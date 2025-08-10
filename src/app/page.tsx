import { withAuth } from "@workos-inc/authkit-nextjs";

export default async function HomePage() {
  const { user } = await withAuth();

  return (
    <main>
      {!user ? (
        <p style={{ padding: "1rem" }}>Please sign in or sign up</p>
      ) : (
        <>
          <p style={{ padding: "1rem" }}>
            Welcome back{user.firstName ? `, ${user.firstName}` : ""}!
          </p>
        </>
      )}
    </main>
  );
}
