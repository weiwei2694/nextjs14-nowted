"use client";

import React from 'react'
import { BiCategory } from 'react-icons/bi';
import { CiFolderOn } from 'react-icons/ci';

type Props = {
    type: string;
}

const ChooseFolder = ({ type }: Props) => {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center text-center">
                {type === "Category"
                    ? <BiCategory className="w-40 h-40 text-white/60" />
                    : <CiFolderOn className="w-40 h-40 text-white/60" />}
                <h1 className="font-sans font-semibold text-16 text-white/60">{type === "Category" ? "Does Not Have Any Posts" : "Choose A Folder To View"}</h1>
            </div>
        </div>
    )
}

export default ChooseFolder