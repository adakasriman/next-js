import Link from "next/link";
import {
    withAuth,
    getSignInUrl,
    getSignUpUrl,
    signOut,
} from "@workos-inc/authkit-nextjs";
import { Button } from "./ui/button";

export default async function Header() {
    const { user } = await withAuth();

    const handleSignOut = async () => {
        "use server";
        return await signOut();
    };

    return (
        <header
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                borderBottom: "1px solid #ddd",
            }}
        >
            {/* Left side title */}
            <Link href="/" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                My Condo
            </Link>

            {/* Right side buttons */}
            {!user ? (
                <div style={{ display: "flex", gap: "1rem" }}>
                    <Link href={await getSignInUrl()}>Sign In</Link>
                    <Link href={await getSignUpUrl()}>Sign Up</Link>
                </div>
            ) : (
                <div style={{ display: "flex", gap: "1rem" }}>
                    <div style={{ display: "flex", gap: "1rem" }}>
                        <Link href="/users">Users</Link>
                        <Link href="/properties">Properties</Link>
                        <Link href="/units">Units</Link>
                    </div>
                    <form action={handleSignOut}>
                        <Button type="submit" className="bg-red-500">Sign Out</Button>
                    </form>
                </div>
            )}
        </header>
    );
}
