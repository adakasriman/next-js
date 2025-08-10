import Link from "next/link";
import {
    withAuth,
    getSignInUrl,
    getSignUpUrl,
    signOut,
} from "@workos-inc/authkit-nextjs";
import { Button } from "./ui/button";
import { Navigation } from "@/components/Navigation";
import Image from "next/image";

export default async function Header() {
    const { user } = await withAuth();

    const handleSignOut = async () => {
        "use server";
        return await signOut();
    };

    return (
        <header className="flex justify-between items-center p-4 border-b">
            <a href="#">
                <Image
                    src="/logos/logo_orange_light.svg"
                    alt="My Condo"
                    width={160}
                    height={40}
                    className="h-8 w-auto"
                />
            </a>

            {!user ? (
                <div className="flex gap-2">
                    <Button asChild>
                        <Link href={await getSignInUrl()}>Sign In</Link>
                    </Button>
                    <Button asChild className="bg-red-500">
                        <Link href={await getSignUpUrl()}>Sign Up</Link>
                    </Button>
                </div>
            ) : (
                <div className="flex gap-2 items-center">
                    <Navigation />
                    <form action={handleSignOut}>
                        <Button type="submit" variant="destructive">Sign Out</Button>
                    </form>
                </div>
            )}
        </header>
    );
}