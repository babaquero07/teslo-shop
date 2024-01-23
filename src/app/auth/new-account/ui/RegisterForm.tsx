"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import Link from "next/link";
import clsx from "clsx";

import { login, registerUser } from "@/actions";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    setErrorMessage("");

    const { name, email, password } = data;

    const response = await registerUser(name, email, password);
    if (!response.ok) {
      setErrorMessage(response.message);
      return;
    }

    await login(email.toLocaleLowerCase(), password);
    window.location.replace("/");
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      {/* {
            errors.name?.type === 'required' && <span className="text-red-500">Name is require*</span>
        } */}

      <label htmlFor="text">Full name</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": !!errors.name,
        })}
        type="text"
        autoFocus
        {...register("name", { required: true })}
      />

      <label htmlFor="email">Email</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": !!errors.email,
        })}
        type="email"
        {...register("email", {
          required: true,
          pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        })}
      />

      <label htmlFor="password">Password</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": !!errors.email,
        })}
        type="password"
        {...register("password", { required: true, minLength: 8 })}
      />

      {errorMessage && (
        <span className="text-red-500 mb-4">{errorMessage}</span>
      )}

      <button className="btn-primary" type="submit">
        Continue
      </button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Login
      </Link>
    </form>
  );
};

export default RegisterForm;
