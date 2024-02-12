"use client";

import React from 'react'
import List from './list';
import PostType from '@/types/post.type';
import ChooseFolder from './choose-folder';

type Props = {
    folder: {
        name: string;
        posts: PostType[];
    } | null;
    postId: string | undefined;
}

const ListPosts = ({ folder, postId }: Props) => {
    return (
        <section className="min-w-350 max-w-350 h-screen overflow-y-auto py-30 bg-[#1C1C1C] flex flex-col gap-y-30">
            {folder ? (
                <>
                    <h2 className="px-20 font-sans font-semibold text-22 text-white">{folder.name}</h2>

                    <div className="flex flex-col gap-y-20 px-20">
                        {folder.posts.map(post => (
                            <List
                                title={post.title}
                                createdAt={post.createdAt.toLocaleDateString()}
                                body={post.body}
                                active={postId === post.id}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <ChooseFolder />
            )}
        </section>
    )
}

export default ListPosts