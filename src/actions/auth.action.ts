'use server';

import { IRegister } from '@/interfaces/auth.interface';
import prismadb from '@/lib/prismaDb';
import { hash } from 'bcrypt';
import { revalidatePath } from 'next/cache';

export const authRegisterAction = async ({
	name,
	email,
	password,
	path,
}: IRegister) => {
	try {
		const emailAlreadyExists = await prismadb.user.findFirst({
			where: {
				email,
			},
		});

		if (emailAlreadyExists) {
			return {
				data: null,
				message: 'Email already exists',
			};
		}

		const user = await prismadb.user.create({
			data: {
				name,
				email,
				password: await hash(password, 10),
			},
		});

		return {
			data: user,
			message: 'User created successfully',
		};
	} catch (error) {
		console.info('[ERROR_AUTH_REGISTER]', error);

		return {
			data: null,
			message: 'Something went wrong',
		};
	} finally {
		revalidatePath(path);
	}
};
