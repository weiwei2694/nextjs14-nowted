"use client"

import React, { useState } from 'react'
import Link from 'next/link';
import { registerSchema } from '@/validations/auth.validation';
import { authRegisterAction } from '@/actions/auth.action';
import { toast } from 'sonner';

type Errors = {
    name?: string;
    email?: string;
    password?: string;
} | null

const Form = () => {
    const [errors, setErrors] = useState<Errors>(null);
    const [isMutation, setIsMutation] = useState<boolean>(false);

    const clientAction = async (formData: FormData) => {
        if (isMutation) return null;
        setIsMutation(true);

        try {
            const data = {
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                password: formData.get('password') as string,
                path: window.location.pathname
            };

            const validations = registerSchema.safeParse(data);
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

            const res = await authRegisterAction(data);
            if (res.message === "Email already exists") {
                setErrors({ email: "Email already exists" });
            }
            if (res.message === "User created successfully") {
                window.location.href = "/auth/login";
            }
        } catch (error) {
            console.info('[ERROR_CLIENT_ACTION]', error);

            toast("Something went wrong");
        } finally {
            setIsMutation(false);
        }
    }

    return (
        <form action={clientAction} className="flex flex-col gap-y-20">
            {/* Name */}
            <div className="flex flex-col gap-y-3">
                <label htmlFor="name" className="label">Name</label>
                <input type="text" placeholder="Name" id="name" name="name" autoFocus className={`input ${errors?.name ? 'input-error' : null}`} />

                {errors?.name && <p className="text-red-500 font-sans">{errors?.name}</p>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-y-3">
                <label htmlFor="email" className="label">Email</label>
                <input type="email" placeholder="Email" id="email" name="email" className={`input ${errors?.email ? 'input-error' : null}`} />

                {errors?.email && <p className="text-red-500 font-sans">{errors?.email}</p>}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-y-3">
                <label htmlFor="password" className="label">Password</label>
                <input type="password" placeholder="Name" id="password" name="password" className={`input ${errors?.password ? 'input-error' : null}`} />

                {errors?.password && <p className="text-red-500 font-sans">{errors?.password}</p>}
            </div>

            {/* Redirect To Login Page */}
            <p className="text-primary font-sans">
                Have you registered? <Link href="/auth/login" className="text-indigo-600 underline hover:text-indigo-600/90">Login now!</Link>
            </p>

            {/* Button Submit */}
            <button type="submit" className="btn btn-primary" disabled={isMutation}>
                Register
            </button>
        </form>
    )
}

export default Form