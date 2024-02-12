"use client"

import React from 'react'
import { FaRegStar } from 'react-icons/fa6';
import { FiArchive, FiTrash } from 'react-icons/fi';
import { GrFormEdit } from 'react-icons/gr';

const Menu = () => {
    return (
        <div className="absolute top-44 right-0 bg-[#333333] p-15 rounded-6 text-white w-202 flex flex-col gap-y-20">
            <button className="flex items-center gap-x-15">
                <FaRegStar className="w-20 h-20" />
                <h5 className="font-sans font-normal text-16">Add to favorites</h5>
            </button>
            <button className="flex items-center gap-x-15">
                <FiArchive className="w-20 h-20" />
                <h5 className="font-sans font-normal text-16">Archived</h5>
            </button>
            <div className="h-1 w-full bg-white/5" />
            <button className="flex items-center gap-x-15" onClick={() => { }}>
                <GrFormEdit className="w-20 h-20" />
                <h5 className="font-sans font-normal text-16">Edit</h5>
            </button>
            <button className="flex items-center gap-x-15">
                <FiTrash className="w-20 h-20" />
                <h5 className="font-sans font-normal text-16">Delete</h5>
            </button>
        </div>
    )
}

export default Menu