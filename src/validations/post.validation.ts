import * as z from 'zod';

export const createPostSchema = z.object({
	title: z
		.string()
		.min(1, { message: 'Title is required' })
		.max(225, { message: 'Title must be less than 100 characters' }),
	folderId: z.string().min(1, { message: 'Folder is required' }),
	userId: z.string().min(1),
});

export const updatePostBodySchema = z.object({
	id: z.string().min(1, { message: 'Folder is required' }),
	body: z.string(),
});
