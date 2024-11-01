"use client"
import { signOut } from "@/app/actions/user/user.controller"

export default function SignOutButton() {
    return <button onClick={async () => await signOut()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign Out</button>
}
