"use client";

import React from 'react'
import { CiFolderOn } from 'react-icons/ci';

const ChooseFolder = () => {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center text-center">
                <CiFolderOn className="w-40 h-40 text-white/60" />
                <h1 className="font-sans font-semibold text-16 text-white/60">Choose A Folder To View</h1>
            </div>
        </div>
    )
}

export default ChooseFolder