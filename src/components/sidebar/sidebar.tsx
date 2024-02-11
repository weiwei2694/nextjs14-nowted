"use client"

import Image from 'next/image'
import React, { useState } from 'react'

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

type Props = {
  folders: FolderType[]
}

const Sidebar = ({ folders }: Props) => {
  const [openNewFolder, setOpenNewFolder] = useState(false);

  const toggleCreateNewFolder = () => {
    setOpenNewFolder(prev => !prev);
  }

  const logoutHandler = () => {
    signOut();
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
            <div className="py-10 px-20 h-40 w-full flex items-center gap-x-15 cursor-pointer">
              <LuFolderOpen className="w-20 h-20 text-white" />
              <div>
                <input type="text" name="folder" placeholder="New Folder" className="w-full bg-transparent text-white outline-none border-none font-sans font-semibold placeholder:text-white/60" autoFocus />
              </div>
            </div>
          ) : null}
          {folders.length ? folders.map(folder => (
            <List
              key={folder.id}
              title={folder.name}
              icon={<LuFolderOpen className="w-20 h-20 text-white" />}
              active={true}
              activeColor="bg-white/5"
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