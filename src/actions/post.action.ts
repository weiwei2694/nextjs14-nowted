'use server';

import { ICreatePost } from '@/interfaces/post.interface';
import prismadb from '@/lib/prismaDb';
import { revalidatePath } from 'next/cache';

export const createPostAction = async ({
	title,
	folderId,
	userId,
	path,
}: ICreatePost) => {
	try {
		const post = await prismadb.post.create({
			data: {
				title,
				folderId,
				body: '',
				userId,
			},
		});

		return { data: post, message: 'Post created successfully.' };
	} catch (error) {
		console.info(['[ERROR_CREATE_POST_ACTION]'], error);

		return { data: null, message: 'Something went wrong.' };
	} finally {
		revalidatePath(path);
	}
};
