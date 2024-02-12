"use client"

import React, { useState } from 'react'
import Link from 'next/link';
import { loginSchema } from '@/validations/auth.validation';
import { signIn } from "next-auth/react";

type Errors = {
    email?: string;
    password?: string;
} | null

const Form = () => {
    const [errors, setErrors] = useState<Errors>(null);

    const clientAction = async (formData: FormData) => {
        const data = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        };

        const validations = loginSchema.safeParse(data);
        if (!validations.success) {
            let newErrors: Errors = {};

            validations.error.issues.forEach(issue => {
                newErrors = { ...newErrors, [issue.path[0]]: issue.message };
            });

            setErrors(newErrors);
            return null;
        } else {
            setErrors(null);
        }

        signIn("credentials", data);
    }

    return (
        <form action={clientAction} className="flex flex-col gap-y-20">
            {/* Email */}
            <div className="flex flex-col gap-y-3">
                <label htmlFor="email" className="label">Email</label>
                <input type="email" placeholder="Email" id="email" name="email" autoFocus className={`input ${errors?.email ? 'input-error' : null}`} />

                {errors?.email && <p className="text-red-500 font-sans">{errors?.email}</p>}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-y-3">
                <label htmlFor="password" className="label">Password</label>
                <input type="password" placeholder="Name" id="password" name="password" className={`input ${errors?.password ? 'input-error' : null}`} />

                {errors?.password && <p className="text-red-500 font-sans">{errors?.password}</p>}
            </div>

            {/* Redirect To Register Page */}
            <p className="text-primary font-sans">
                You don't have an account yet? <Link href="/auth/register" className="text-indigo-600 underline hover:text-indigo-600/90">Register now!</Link>
            </p>

            {/* Button Submit */}
            <button type="submit" className="btn btn-primary">
                Login
            </button>
        </form>
    )
}

export default Form