import ListPosts from "@/components/list-posts/list-posts";
import Sidebar from "@/components/sidebar/sidebar";
import prismadb from "@/lib/prismaDb";
import { authOptions } from "@/lib/utils/auth-options";
import FolderType from "@/types/folder.type";
import PostType from "@/types/post.type";
import SessionType from "@/types/session.type";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
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

  return (
    <main className="flex">
      <Sidebar recents={recents} folders={folders} userId={session.user.userId} />
      <ListPosts />
    </main>
  );
}
