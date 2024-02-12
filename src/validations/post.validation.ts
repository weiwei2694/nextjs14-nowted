import * as z from 'zod';

export const createPostSchema = z.object({
	title: z
		.string()
		.min(1, { message: 'Title is required' })
		.max(225, { message: 'Title must be less than 100 characters' }),
	folderId: z.string({ required_error: 'Folder is required' }).min(1),
	userId: z.string({ required_error: 'Folder is required' }).min(1),
});
