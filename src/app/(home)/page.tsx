import ListPosts from "@/components/list-posts/list-posts";
import Main from "@/components/main/main";
import CreateNewNoteModal from "@/components/sidebar/create-new-note-modal";
import Sidebar from "@/components/sidebar/sidebar";
import { ICategory } from "@/interfaces/category.interface";
import { IFolderWithPosts } from "@/interfaces/folder.interface";
import { IPostWithFolderName } from "@/interfaces/post.interface";
import prismadb from "@/lib/prismaDb";
import { authOptions } from "@/lib/utils/auth-options";
import FolderType from "@/types/folder.type";
import PostType from "@/types/post.type";
import SessionType from "@/types/session.type";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type SearchParams = {
  folderId?: string;
  postId?: string;
  category?: string;
}

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const session: SessionType = await getServerSession(authOptions);
  if (!session) redirect('/auth/login');

  const folders: FolderType[] = await prismadb.folder.findMany({
    where: {
      userId: session.user.userId
    }
  })
  const recents: PostType[] = await prismadb.post.findMany({
    where: {
      userId: session.user.userId,
      NOT: {
        archivedAt: null,
      }
    },
    take: 5,
    orderBy: {
      createdAt: 'desc'
    }
  })

  const { folderId, postId, category } = searchParams;

  let categoryWithPosts: any | null = null;
  let selectedCategory: string | null = null;
  let folder: IFolderWithPosts | null = null;

  if (
    category &&
    ["archived-notes", "favorites", "trash"].includes(category)
  ) {
    const categories: ICategory = {
      "archived-notes": ["archivedAt", "Archived Notes"],
      "favorites": ["favoritedAt", "Favorites"],
      "trash": ["deletedAt", "Trash"],
    }
    selectedCategory = categories[category][0];

    categoryWithPosts = await prismadb.post.findMany({
      where: {
        userId: session.user.userId,
        NOT: {
          [selectedCategory]: null
        }
      }
    });

    selectedCategory = categories[category][1];

    if (category && !categoryWithPosts)
      redirect('/');
  } else {
    folder = await prismadb.folder.findFirst({
      where: {
        id: folderId,
        userId: session.user.userId
      },
      include: {
        posts: {
          where: {
            archivedAt: null
          }
        }
      }
    });

    if (!folderId && folder)
      redirect(`/?folderId=${folder.id}`);
    if (!folder)
      redirect('/');
  }


  let post: IPostWithFolderName | null = null;
  if (postId && folder) {
    post = await prismadb.post.findFirst({
      where: {
        id: postId,
        userId: session.user.userId,
        folderId: folder.id,
        archivedAt: null
      },
      include: {
        folder: {
          select: {
            name: true
          }
        }
      }
    });

    if (!post) {
      redirect(`/?folderId=${folderId}`);
    }
  } else if (postId && categoryWithPosts) {
    post = await prismadb.post.findFirst({
      where: {
        id: postId,
        userId: session.user.userId,
        archivedAt: null
      },
      include: {
        folder: {
          select: {
            name: true
          }
        }
      }
    });

    if (!post) {
      redirect(`/?category=${selectedCategory}`);
    }
  }

  return (
    <main className="flex">
      <Sidebar recents={recents} folders={folders} userId={session.user.userId} />
      {folder && <ListPosts type="Folder" folderName={folder.name} postId={postId} posts={folder.posts} />}
      {categoryWithPosts && <ListPosts type="Category" folderName={selectedCategory} posts={categoryWithPosts} postId={postId} />}
      <Main post={post} />

      {/* components/sidebar/create-new-note-modal.tsx */}
      <CreateNewNoteModal folders={folders} userId={session.user.userId} />
    </main>
  );
}
