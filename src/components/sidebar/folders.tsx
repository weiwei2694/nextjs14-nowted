"use client";

import { LuFolderOpen } from "react-icons/lu";
import { FiFolderPlus } from "react-icons/fi";

import React, { useRef, useState } from 'react'
import { createFolderSchema } from '@/validations/folder.validation';
import { FolderCreateAction } from '@/actions/folder.action';
import { useFormStatus } from 'react-dom'
import FolderType from "@/types/folder.type";
import Subtitle from "./subtitle";
import List from "./list";
import { useSearchParams } from 'next/navigation';

type Errors = {
  name: string;
} | null;

type Props = {
  userId: string;
  folders: FolderType[];
}

const Folders = ({ folders, userId }: Props) => {
  const searchParams = useSearchParams();
  const folderId = searchParams.get('folderId');

  const [errors, setErrors] = useState<Errors>(null);
  const [openNewFolder, setOpenNewFolder] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();

  const toggleCreateNewFolder = () => {
    setOpenNewFolder(prev => !prev);
  }

  const clientAction = async (formData: FormData) => {
    if (pending) return null;

    const data = {
      name: formData.get('name') as string,
      userId,
      path: window.location.pathname
    }

    const validations = createFolderSchema.safeParse(data);
    if (!validations.success) {
      setErrors({ name: validations.error.issues[0].message });
      return null;
    } else {
      setErrors(null);
    }

    const res = await FolderCreateAction(data);
    if (res.message === "Folder already exists") {
      setErrors({ name: res.message });
      return null;
    }

    if (formRef.current)
      formRef.current.reset();
    setOpenNewFolder(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between px-20 mb-10">
        <Subtitle title="Folders" />
        <FiFolderPlus className="text-white/60 w-20 h-20 cursor-pointer" onClick={toggleCreateNewFolder} />
      </div>
      <div className="flex flex-col gap-y-5">
        {openNewFolder ? (
          <form ref={formRef} action={clientAction}>
            <div className="py-10 px-20 h-40 w-full flex items-center gap-x-15 cursor-pointer">
              <LuFolderOpen className="w-20 h-20 text-white" />
              <div>
                <input type="text" name="name" placeholder="New Folder" className="w-full bg-transparent text-white outline-none border-none font-sans font-semibold placeholder:text-white/60 disabled:text-white/5" autoFocus />
              </div>
            </div>
            {errors?.name && (
              <div className="px-20 mb-10">
                <p className="text-red-500 font-sans font-semibold text-14">{errors.name}</p>
              </div>
            )}
          </form>
        ) : null}
        {folders.length ? folders.map(folder => (
          <List
            key={folder.id}
            title={folder.name}
            folderId={folder.id}
            icon={<LuFolderOpen className="w-20 h-20 text-white" />}
            active={folderId === folder.id}
            activeColor={folderId === folder.id ? "bg-white/5" : ""}
          />
        )) : <h3 className="subheading px-20">There Are No Folders</h3>}
      </div>
    </div>
  )
}

export default Folders