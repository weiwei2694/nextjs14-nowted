import * as z from 'zod';

export const createFolderSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(3, { message: 'Name must be at least 3 characters' })
		.max(20, { message: 'Name must be less than 20 characters' }),
});
