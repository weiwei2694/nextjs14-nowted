'use server';

import { ICreatePost, IUpdatePostBody } from '@/interfaces/post.interface';
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

export const updatePostBodyAction = async ({
	id,
	body,
	path,
}: IUpdatePostBody) => {
	try {
		const post = prismadb.post.update({
			where: { id },
			data: { body },
		});

		return {
			data: post,
			message: 'Post updated successfully.',
		};
	} catch (error) {
		console.info(['[ERROR_UPDATE_POST_BODY_ACTION]'], error);

		return {
			data: null,
			message: 'Something went wrong.',
		};
	} finally {
		revalidatePath(path);
	}
};
