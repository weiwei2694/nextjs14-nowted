'use server';

import { ICreate } from '@/interfaces/folder.interface';
import prismadb from '@/lib/prismaDb';
import { revalidatePath } from 'next/cache';

export const FolderCreateAction = async ({ name, path, userId }: ICreate) => {
	try {
		const nameAlreadyExist = await prismadb.folder.findFirst({
			where: {
				name,
				userId,
			},
		});
		if (nameAlreadyExist) {
			return {
				data: null,
				message: 'Folder already exists',
			};
		}

		const newFolder = await prismadb.folder.create({
			data: {
				name,
				userId,
			},
		});

		return {
			data: newFolder,
			message: 'Folder created successfully.',
		};
	} catch (error) {
		console.info('[ERROR_FOLDER_CREATE_ACTION]', error);

		return {
			data: null,
			message: 'Something went wrong',
		};
	} finally {
		revalidatePath(path);
	}
};
