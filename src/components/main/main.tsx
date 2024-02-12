"use client";

import React, { useState } from 'react'
import { CiFolderOn } from 'react-icons/ci';
import { IoEllipsisHorizontalCircle } from 'react-icons/io5';
import { MdOutlineDateRange } from 'react-icons/md';
import ChooseFile from './choose-file';
import { IPostWithFolderName } from '@/interfaces/post.interface';
import Menu from './menu';

type Props = {
    post: IPostWithFolderName | null;
}

const Main = ({ post }: Props) => {
    const [openMenu, setOpenMenu] = useState(false);

    const clientAction = async () => {
        //...
    }

    return (
        <div className="p-50 flex flex-col gap-y-30 w-full bg-primary">
            {post ? (
                <>
                    {/* Title & Menu */}
                    <div className="flex justify-between gap-x-30">
                        <h1 className="font-sans font-semibold text-32 text-white">{post.title}</h1>
                        <div className="relative">
                            <button onClick={() => setOpenMenu(prev => !prev)}>
                                <IoEllipsisHorizontalCircle className="w-33 h-33 text-white/60" />
                            </button>

                            {openMenu ? <Menu /> : null}
                        </div>
                    </div>
                    {/* Date & Folder */}
                    <div className="flex flex-col">
                        <div className="flex items-center pb-15">
                            <div className="flex items-center gap-x-16 w-160">
                                <MdOutlineDateRange className="w-23 h-23 text-white/60" />
                                <h4 className="font-sans font-semibold text-16 text-white/60">Date</h4>
                            </div>
                            <h4 className="font-sans font-semibold text-16 text-white underline">{post.createdAt.toLocaleDateString()}</h4>
                        </div>
                        <div className="h-1 w-full bg-white/10" />
                        <div className="flex items-center pt-15">
                            <div className="flex items-center gap-x-16 w-160">
                                <CiFolderOn className="w-23 h-23 text-white/60" />
                                <h4 className="font-sans font-semibold text-16 text-white/60">Folder</h4>
                            </div>
                            <h4 className="font-sans font-semibold text-16 text-white underline">{post.folder.name}</h4>
                        </div>
                    </div>
                    {/* Line */}
                    <div className="h-1 w-full bg-white/10" />
                    {/* Textarea/Body */}
                    <form action={clientAction} className="w-full h-full">
                        <textarea defaultValue={post.body} className="bg-transparent border-none outline-none text-white font-normal text-16 w-full h-full resize-none placeholder:text-white/60" name="body" autoFocus placeholder="What do you want to note?">
                        </textarea>
                    </form>
                </>
            ) : (
                <ChooseFile />
            )}
        </div>
    )
}

export default Main