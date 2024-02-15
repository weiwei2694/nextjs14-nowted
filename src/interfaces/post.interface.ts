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
	archivedAt: Date | null;
	deletedAt: Date | null;
	favoritedAt: Date | null;
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

export interface IUpdatePostFavoritedAt extends IUpdatePostDeletedAt {
	// ...
}

export interface IUpdatePostArchivedAt extends IUpdatePostDeletedAt {
	// ...
}

export interface IDeletePostPermanent extends IUpdatePostDeletedAt {
	// ...
}