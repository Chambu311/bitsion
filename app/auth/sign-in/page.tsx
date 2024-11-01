"use client";
import { signIn } from "@/app/actions/user/user.controller";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function SignInPage() {
  const router = useRouter();
  const mutate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signIn(new FormData(event.currentTarget));
      router.push("/home");
    } catch (error: any) {
      alert(error.message);
    }
  };
  const isPending = false; // Assuming this is a placeholder for a state that indicates if the mutation is in progress
  return (
  <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
        Sign In
      </h2>
    </div>
    <div className="sm:mx-auto sm:w-full sm:max-w-sm rounded bg-white">
      <form onSubmit={mutate} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-900">
            Password
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isPending}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isPending ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link href="/auth/sign-up">Sign Up</Link>
      </p>
    </div>
  </div>
  );
}
