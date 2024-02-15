"use client";

import React from 'react'
import List from './list';
import PostType from '@/types/post.type';
import ChooseFolder from './choose-folder';

type Props = {
    posts: PostType[];
    folderName: string | null;
    postId: string | undefined;
    type: string;
}

const ListPosts = ({ folderName, posts, postId, type }: Props) => {
    return (
        <section className="min-w-350 max-w-350 h-screen overflow-y-auto py-30 bg-[#1C1C1C] flex flex-col gap-y-30">
            {folderName ? (
                <>
                    <h2 className="px-20 font-sans font-semibold text-22 text-white">{folderName}</h2>

                    <div className="flex flex-col gap-y-20 px-20">
                        {posts.length ? (
                            posts.map(post => (
                                <List
                                    key={post.id}
                                    post={post}
                                    active={postId === post.id}
                                />
                            ))
                        ) : (
                            <h3 className="subheading">
                                {type === "Folder"
                                    ? "This folder doesn't have any posts yet"
                                    : `This ${type} doesn't have any posts yet`}
                            </h3>
                        )}
                    </div>
                </>
            ) : (
                <ChooseFolder type={type} />
            )}
        </section>
    )
}

export default ListPosts