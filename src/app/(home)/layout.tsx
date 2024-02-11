import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils/auth-options";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nowted",
  description: "Nowted is a visually striking and highly functional note-taking app with a variety of features and tools to help users organize, edit, and access their notes. The app has a clean and modern design, with a three-column layout that allows users to easily navigate and access their notes. The first column is a sidebar that contains a list of folders, recent opened files, a search function, and other features. The second column is a list of the files in the opened folder, and the third column is a WYSIWYG (What You See Is What You Get) editor that allows users to edit and format their notes. It is a key part of the user's overall note-taking experience, and can be used to organize and access notes in a variety of ways.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/login');

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
