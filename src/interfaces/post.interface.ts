export interface ICreatePost {
	title: string;
	userId: string;
	folderId: string;
	path: string;
}

export interface IPostWithFolderName {
	id: string;
	title: string;
	body: string;
	userId: string;
	folderId: string;
	createdAt: Date;
	updatedAt: Date;
	folder: {
		name: string;
	};
}
