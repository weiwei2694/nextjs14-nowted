import Image from 'next/image'
import React from 'react'
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { FaRegFileAlt, FaRegStar } from "react-icons/fa";
import { FiFolderPlus, FiTrash, FiArchive } from "react-icons/fi";
import Subtitle from './subtitle';
import { LuFolderOpen } from "react-icons/lu";
import List from './list';

const Sidebar = () => {
  return (
    <nav className="w-300 bg-[#1b1b1b] h-screen py-30 flex flex-col gap-y-30">
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
      {/* New Note Buttonn */}
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
          <FiFolderPlus className="text-white/60 w-20 h-20 cursor-pointer" />
        </div>
        <div className="flex flex-col gap-y-5">
          <List
            title="Personal"
            icon={<LuFolderOpen className="w-20 h-20 text-white" />}
            active={true}
            activeColor="bg-white/5"
          />
          <List
            title="Work"
            icon={<LuFolderOpen className="w-20 h-20 text-white" />}
            active={false}
          />
          <List
            title="Travel"
            icon={<LuFolderOpen className="w-20 h-20 text-white" />}
            active={false}
          />
          <List
            title="Events"
            icon={<LuFolderOpen className="w-20 h-20 text-white" />}
            active={false}
          />
          <List
            title="Finances"
            icon={<LuFolderOpen className="w-20 h-20 text-white" />}
            active={false}
          />
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
    </nav>
  )
}

export default Sidebar