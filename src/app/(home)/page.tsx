import Sidebar from "@/components/sidebar/sidebar";
import prismadb from "@/lib/prismaDb";
import { authOptions } from "@/lib/utils/auth-options";
import FolderType from "@/types/folder.type";
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

  return (
    <Sidebar folders={folders} />
  );
}
