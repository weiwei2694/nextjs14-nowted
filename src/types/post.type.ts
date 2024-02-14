type PostType = {
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
};

export default PostType;
