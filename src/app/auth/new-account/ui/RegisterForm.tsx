"use client";

import Link from "next/link";

import { useForm } from "react-hook-form";
import clsx from "clsx";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    const { name, email, password } = data;
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
          pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
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
