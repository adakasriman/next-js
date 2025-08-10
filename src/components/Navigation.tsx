"use client";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const navLinks = [
    { href: '/users', label: 'Users' },
    { href: '/properties', label: 'Properties' },
    { href: '/units', label: 'Units' },
    { href: '/property-manager-assignments', label: 'Property Manager Assignments' },
];

export function Navigation() {
    const pathname = usePathname();

    return (
        <div className="flex gap-8 items-center">
            {navLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        pathname.startsWith(link.href)
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                >
                    {link.label}
                </Link>
            ))}
        </div>
    );
}