import FolderType from '@/types/folder.type';
import PostType from '@/types/post.type';

export interface ICreate {
	name: string;
	path: string;
	userId: string;
}

export interface IFolderWithPosts extends FolderType {
	posts: PostType[];
}
