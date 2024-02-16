"use client"

import React, { useState } from 'react'
import Link from 'next/link';
import { loginSchema } from '@/validations/auth.validation';
import { SignInResponse, signIn } from "next-auth/react";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type Errors = {
    email?: string;
    password?: string;
} | null

const Form = () => {
    const router = useRouter();
    const [errors, setErrors] = useState<Errors>(null);
    const [isMutation, setIsMutation] = useState<boolean>(false);

    const clientAction = async (formData: FormData) => {
        if (isMutation) return null;
        setIsMutation(true);

        try {
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

            const res: SignInResponse | undefined = await signIn("credentials", {
                ...data,
                redirect: false,
            });

            if (res?.error === "CredentialsSignin") {
                setErrors({
                    email: "Wrong email or password",
                    password: "Wrong email or password",
                })
            }

            if (res && res.ok && res.status === 200) {
                router.push('/');
            }
        } catch (error) {
            console.info("[ERROR_CLIENT_ACTION]", error);

            toast.error("Something went wrong");
        } finally {
            setIsMutation(false);
        }
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
            <button type="submit" className="btn btn-primary" disabled={isMutation}>
                Login
            </button>
        </form>
    )
}

export default Form