"use client";

import { authenticate } from "@/actions";
import Link from "next/link";

import { useFormState } from "react-dom";

const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);

  return (
    <form className="flex flex-col" action={dispatch}>
      <label htmlFor="email">Email</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
      />

      <label htmlFor="password">Password</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
      />

      <button type="submit" className="btn-primary">
        Login
      </button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Sign up
      </Link>
    </form>
  );
};

export default LoginForm;
