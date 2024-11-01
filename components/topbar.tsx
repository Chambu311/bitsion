import { User } from "lucide-react";
import SignOutButton from "./sign-out-button";
import Link from "next/link";

export default function TopBar(props: { email: string }) {
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <Link href="/home" className="text-2xl font-bold text-gray-900">Home</Link>
                <div className="flex items-center gap-5">
                    <User className="text-black" />
                    <span className="text-sm font-medium text-gray-700 mr-4">{props.email}</span>
                    <SignOutButton />
                </div>
            </div>
        </header>
    )
}