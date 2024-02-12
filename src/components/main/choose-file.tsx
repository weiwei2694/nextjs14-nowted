"use client"

import React from 'react'
import { AiOutlineFileText } from "react-icons/ai";

const ChooseFile = () => {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center text-center gap-y-10">
                <AiOutlineFileText className="w-80 h-80 text-white" />
                <h1 className="font-sans font-semibold text-28 text-white">Choose A Folder To View</h1>
                <p className="font-sans font-normal text-16 text-white/60">Choose a note from the list on the left to view its contents, or create a<br /> new note to add to your collection.</p>
            </div>
        </div>
    )
}

export default ChooseFile