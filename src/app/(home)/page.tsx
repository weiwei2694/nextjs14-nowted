import ListPosts from "@/components/list-posts/list-posts";
import Main from "@/components/main/main";
import CreateNewNoteModal from "@/components/sidebar/create-new-note-modal";
import Sidebar from "@/components/sidebar/sidebar";
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
    },
    take: 5,
    orderBy: {
      createdAt: 'desc'
    }
  })

  const { folderId, postId } = searchParams;
  const folder = await prismadb.folder.findFirst({
    where: {
      id: folderId
    },
    include: {
      posts: true
    }
  });
  if (!folder)
    redirect('/');

  return (
    <main className="flex">
      <Sidebar recents={recents} folders={folders} userId={session.user.userId} />
      <ListPosts posts={folder.posts} postId={postId} folderName={folder.name} />
      <Main />

      {/* components/sidebar/create-new-note-modal.tsx */}
      <CreateNewNoteModal folders={folders} userId={session.user.userId} />
    </main>
  );
}
