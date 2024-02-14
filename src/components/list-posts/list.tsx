"use client";

import PostType from '@/types/post.type';
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {
    post: PostType;
    active: boolean;
}

const List = ({ post, active }: Props) => {
    const searchParams = useSearchParams();
    const category = searchParams.get('category');
    const router = useRouter();

    const redirectTo = () => {
        if (category) {
            router.push(`/?category=${category}&postId=${post.id}`);
        } else {
            router.push(`/?folderId=${post.folderId}&postId=${post.id}`);
        }
    }

    const trimmedTitle = post.title.length > 90 ? post.title.substring(0, 90) + '...' : post.title;
    const trimmedBody = post.body.length > 20 ? post.body.substring(0, 20) + '...' : post.body;

    return (
        <div onClick={redirectTo} className={`p-20 flex flex-col gap-y-10 rounded-3 ${active ? "bg-white/15" : "bg-white/5"} cursor-pointer`}>
            <h4 className="font-sans font-semibold text-18 text-white">{trimmedTitle}</h4>
            <div className="flex items-center gap-x-10">
                <p className="font-sans font-normal text-16 text-white/40">{post.createdAt.toLocaleDateString()}</p>
                <p className="font-sans font-normal text-16 text-white/60">{trimmedBody}</p>
            </div>
        </div>
    )
}

export default List