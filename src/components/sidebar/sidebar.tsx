"use client"

import Image from 'next/image'
import React, { useRef, useState } from 'react'

import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { FaRegFileAlt, FaRegStar } from "react-icons/fa";
import { FiFolderPlus, FiTrash, FiArchive } from "react-icons/fi";
import { LuFolderOpen } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";

import Subtitle from './subtitle';
import List from './list';
import { signOut } from 'next-auth/react';
import FolderType from '@/types/folder.type';
import { createFolderSchema } from '@/validations/folder.validation';
import { FolderCreateAction } from '@/actions/folder.action';
import { useFormStatus } from 'react-dom'

type Props = {
  userId: string;
  folders: FolderType[];
}

type Errors = {
  name: string;
} | null;

const Sidebar = ({ folders, userId }: Props) => {
  const [errors, setErrors] = useState<Errors>(null);
  const [openNewFolder, setOpenNewFolder] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();

  const toggleCreateNewFolder = () => {
    setOpenNewFolder(prev => !prev);
  }

  const logoutHandler = () => {
    signOut();
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
    <nav className="w-300 bg-[#1b1b1b] h-screen py-30 flex flex-col gap-y-30 overflow-y-auto">
      {/* Logo & Search Buttonn */}
      <div className="px-20 flex items-center justify-between">
        <Image
          src="/assets/nowted.svg"
          alt="Nowted Logo"
          width={101}
          height={38}
          className="w-101 h-38"
        />
        <FiSearch className="w-20 h-20 text-white opacity-40 cursor-pointer" />
      </div>
      {/* New Note Button */}
      <div className="px-20">
        <button className="rounded-3 bg-white/5 text-white w-full h-40 p-20 flex items-center justify-center gap-x-8 font-sans font-semibold text-16">
          <FaPlus className="w-20 h-20" />
          New Note
        </button>
      </div>
      {/* Recents */}
      <div>
        <div className="px-20 mb-10">
          <Subtitle title="Recents" />
        </div>
        <div className="flex flex-col gap-y-5">
          <List
            title="Reflection on the Month of June"
            icon={<FaRegFileAlt className="w-20 h-20 text-white" />}
            active={true}
            activeColor="bg-[#312EB5]"
          />
          <List
            title="Project proposal"
            icon={<FaRegFileAlt className="w-20 h-20 text-white" />}
            active={false}
          />
          <List
            title="Travel itinerary"
            icon={<FaRegFileAlt className="w-20 h-20 text-white" />}
            active={false}
          />
        </div>
      </div>
      {/* Folders */}
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
              icon={<LuFolderOpen className="w-20 h-20 text-white" />}
              active={false}
            />
          )) : <h3 className="font-sans text-16 font-semibold text-white/60 px-20">There Are No Folders</h3>}
        </div>
      </div>
      {/* More */}
      <div>
        <div className="px-20 mb-10">
          <Subtitle title="More" />
        </div>
        <div className="flex flex-col gap-y-5">
          <List
            title="Favorites"
            icon={<FaRegStar className="w-20 h-20 text-white" />}
            active={false}
          />
          <List
            title="Trash"
            icon={<FiTrash className="w-20 h-20 text-white" />}
            active={false}
          />
          <List
            title="Archived Notes"
            icon={<FiArchive className="w-20 h-20 text-white" />}
            active={false}
          />
        </div>
      </div>
      {/* Settings */}
      <div>
        <div className="px-20 mb-10">
          <Subtitle title="Settings" />
        </div>
        <div className="flex flex-col gap-y-5">
          <div onClick={logoutHandler} className="py-10 px-20 h-40 w-full flex items-center gap-x-15 cursor-pointer opacity-60 hover:opacity-100 hover:bg-white/5 transition">
            <IoIosLogOut className="w-20 h-20 text-white" />
            <h3 className="font-sans text-16 font-semibold text-white">Logout</h3>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar