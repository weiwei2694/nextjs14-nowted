'use server';

import {
	ICreatePost,
	IDeletePostPermanent,
	IUpdatePostArchivedAt,
	IUpdatePostBody,
	IUpdatePostDeletedAt,
	IUpdatePostFavoritedAt,
} from '@/interfaces/post.interface';
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
		console.info('[ERROR_UPDATE_POST_BODY_ACTION]', error);

		return {
			data: null,
			message: 'Something went wrong.',
		};
	} finally {
		revalidatePath(path);
	}
};

export const updatePostDeletedAtAction = async ({
	postId,
	path,
}: IUpdatePostDeletedAt) => {
	try {
		const post = await prismadb.post.findUnique({
			where: {
				id: postId,
			},
		});

		if (!post) {
			return {
				data: null,
				message: 'Post not found.',
			};
		}

		if (post.deletedAt !== null) {
			await prismadb.post.update({
				where: {
					id: post.id,
				},
				data: {
					deletedAt: null,
				},
			});

			return {
				data: {
					postId: post.id,
					folderId: post.folderId,
				},
				message: 'Post undeleted successfully.',
			};
		}

		await prismadb.post.update({
			where: {
				id: post.id,
			},
			data: {
				deletedAt: new Date(),
				archivedAt: null,
				favoritedAt: null,
			},
		});

		return {
			data: null,
			message: 'Post deleted successfully.',
		};
	} catch (error) {
		console.info('[ERROR_UPDATED_POST_DELETED_AT_ACTION]', error);

		return {
			data: null,
			message: 'Something went wrong.',
		};
	} finally {
		revalidatePath(path);
	}
};

export const updatePostFavoritedAtAction = async ({
	postId,
	path,
}: IUpdatePostFavoritedAt) => {
	try {
		const post = await prismadb.post.findUnique({
			where: {
				id: postId,
			},
		});

		if (!post) {
			return {
				data: null,
				message: 'Post not found.',
			};
		}

		if (post.favoritedAt !== null) {
			await prismadb.post.update({
				where: {
					id: post.id,
				},
				data: {
					favoritedAt: null,
				},
			});

			return {
				data: null,
				message: 'Post unfavorited successfully.',
			};
		}

		await prismadb.post.update({
			where: {
				id: post.id,
			},
			data: {
				archivedAt: null,
				favoritedAt: new Date(),
			},
		});

		return {
			data: null,
			message: 'Post favorited successfully.',
		};
	} catch (error) {
		console.info('[ERROR_UPDATED_POST_FAVORITED_AT_ACTION]', error);

		return {
			data: null,
			message: 'Something went wrong.',
		};
	} finally {
		revalidatePath(path);
	}
};

export const updatePostArchivedAtAction = async ({
	postId,
	path,
}: IUpdatePostArchivedAt) => {
	try {
		const post = await prismadb.post.findUnique({
			where: {
				id: postId,
			},
		});

		if (!post) {
			return {
				data: null,
				message: 'Post not found.',
			};
		}

		if (post.archivedAt !== null) {
			await prismadb.post.update({
				where: {
					id: post.id,
				},
				data: {
					archivedAt: null,
				},
			});

			return {
				data: {
					postId: post.id,
					folderId: post.folderId,
				},
				message: 'Post unarchived successfully.',
			};
		}

		await prismadb.post.update({
			where: {
				id: post.id,
			},
			data: {
				archivedAt: new Date(),
				favoritedAt: null,
			},
		});

		return {
			data: { postId: post.id },
			message: 'Post archived successfully.',
		};
	} catch (error) {
		console.info('[ERROR_UPDATED_POST_FAVORITED_AT_ACTION]', error);

		return {
			data: null,
			message: 'Something went wrong.',
		};
	} finally {
		revalidatePath(path);
	}
};

export const deletePostPermanentAction = async ({
	postId,
	path,
}: IDeletePostPermanent) => {
	try {
		const post = await prismadb.post.findUnique({
			where: {
				id: postId,
			},
		});

		if (!post) {
			return {
				data: null,
				message: 'Post not found.',
			};
		}

		if (post.deletedAt === null) {
			return {
				data: null,
				message: 'Forbidden',
			};
		}

		await prismadb.post.delete({
			where: {
				id: post.id,
			},
		});

		return {
			data: null,
			message: 'Post deleted permanently.',
		};
	} catch (error) {
		console.info('[ERROR_UPDATED_POST_FAVORITED_AT_ACTION]', error);

		return {
			data: null,
			message: 'Something went wrong.',
		};
	} finally {
		revalidatePath(path);
	}
};
