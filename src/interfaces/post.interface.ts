export interface ICreatePost {
	title: string;
	userId: string;
	folderId: string;
	path: string;
}

export interface IUpdatePostBody {
	id: string;
	body: string;
	path: string;
}

export interface IPostWithFolderName {
	id: string;
	title: string;
	body: string;
	userId: string;
	folderId: string;
	archivedAt: Date;
	deletedAt: Date;
	favoritedAd: Date;
	createdAt: Date;
	updatedAt: Date;
	folder: {
		name: string;
	};
}

export interface IUpdatePostDeletedAt {
	postId: string;
	path: string;
}
