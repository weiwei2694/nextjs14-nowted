"use client"

import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {
    title: string;
    icon: JSX.Element;
    active: boolean;
    activeColor?: string;
    folderId?: string;
    postId?: string;
}

const List = ({ title, icon, active, activeColor, folderId, postId }: Props) => {
    const router = useRouter();

    const redirectTo = () => {
        if (folderId && postId) {
            router.push(`/?folderId=${folderId}&postId=${postId}`);
        } else {
            router.push(`/?folderId=${folderId}`);
        }
    }

    const trimmedTitle = title.length > 25 ? title.substring(0, 25) + '...' : title;

    return (
        <div onClick={redirectTo} className={`py-10 px-20 h-40 w-full flex items-center gap-x-15 cursor-pointer ${active ? activeColor : "opacity-60"}`}>
            {icon}
            <h3 className="font-sans text-16 font-semibold text-white">{trimmedTitle}</h3>
        </div>
    )
}

export default List;