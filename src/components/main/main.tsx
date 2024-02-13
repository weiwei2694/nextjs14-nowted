"use client";

import React from 'react'

import { IPostWithFolderName } from '@/interfaces/post.interface';
import { Toaster } from 'sonner'
import DisplayPost from './display-post';
import ChooseFile from './choose-file';
import RestoreDeleted from './restore-deleted';

type Props = {
    post: IPostWithFolderName | null;
}

const Main = ({ post }: Props) => {
    return (
        <div className="p-50 flex flex-col gap-y-30 w-full bg-primary">
            <div className="absolute">
                <Toaster position="top-right" richColors />
            </div>

            {post && post.deletedAt === null && <DisplayPost post={post} />}
            {post && post.deletedAt !== null && <RestoreDeleted postId={post.id} />}
            {!post && <ChooseFile />}
        </div>
    )
}

export default Main