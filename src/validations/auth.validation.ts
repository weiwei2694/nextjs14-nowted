import * as z from 'zod';

export const registerSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(3, { message: 'Name must be at least 3 characters' })
		.max(100, { message: 'Name must be less than 100 characters' }),
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email' })
		.max(100, { message: 'Email must be less than 100 characters' }),
	password: z
		.string({ required_error: 'Password is required' })
		.min(8, { message: 'Password must be at least 8 characters' })
		.max(100, { message: 'Password must be less than 100 characters' }),
});

export const loginSchema = z.object({
	email: z
		.string()
		.email({ message: 'Email must be a valid email' })
		.max(100, { message: 'Email must be less than 100 characters' }),
	password: z
		.string()
		.min(1, { message: 'Password is required' })
		.max(100, { message: 'Password must be less than 100 characters' }),
});
