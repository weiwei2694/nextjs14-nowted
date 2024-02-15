"use client"

import React, { useState, useEffect } from 'react'
import { CiFolderOn } from 'react-icons/ci';
import { IoEllipsisHorizontalCircle } from 'react-icons/io5';
import { MdOutlineDateRange } from 'react-icons/md';
import ChooseFile from './choose-file';
import Menu from './menu';
import { updatePostBodySchema } from '@/validations/post.validation';
import { updatePostBodyAction } from '@/actions/post.action';
import { toast } from 'sonner'
import RestoreDeleted from './restore-deleted';
import { useDebounce } from 'use-debounce';
import { useSearchParams } from 'next/navigation';
import { IPostWithFolderName } from '@/interfaces/post.interface';

type Errors = {
    body?: string;
} | null

type Props = {
    post: IPostWithFolderName;
}

const DisplayPost = ({ post }: Props) => {
    const postId = useSearchParams().get('postId');
    const [isMutation, setIsMutation] = useState(false);
    const [body, setBody] = useState<string>(post?.body || "");
    const [errors, setErrors] = useState<Errors>(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [debounced] = useDebounce(body, 300);

    useEffect(() => {
        setBody(post?.body || "");
    }, [postId]);

    const clientAction = async () => {
        if (isMutation) return null;
        setIsMutation(true);

        try {
            const data = {
                id: post?.id || "",
                body: debounced || "",
                path: window.location.pathname
            }

            const validations = updatePostBodySchema.safeParse(data);
            if (!validations.success) {
                let newErrors: Errors = {};

                validations.error.issues.forEach(issue => {
                    newErrors = { ...newErrors, [issue.path[0]]: issue.message };
                });

                setErrors(newErrors);
                return null;
            } else {
                setErrors(null);
            }

            const res = await updatePostBodyAction(data);
            if (res.message === "Something went wrong.") {
                throw new Error(res.message);
            }
        } catch (error) {
            console.info("[ERROR_CLIENT_ACTION]", error);

            toast.error("Something went wrong.");
        } finally {
            setIsMutation(false);
        }
    }

    useEffect(() => {
        clientAction();
    }, [debounced]);

    return (
        <>
            {/* Title & Menu */}
            <div className="flex justify-between gap-x-30">
                <h1 className="font-sans font-semibold text-32 text-white">{post.title}</h1>
                <div className="relative">
                    <button onClick={() => setOpenMenu(prev => !prev)}>
                        <IoEllipsisHorizontalCircle className="w-33 h-33 text-white/60" />
                    </button>

                    {openMenu ? <Menu setOpenMenu={setOpenMenu} postId={post?.id} favoritedAt={post?.favoritedAt} archivedAt={post?.archivedAt} /> : null}
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
            <div className="flex flex-col gap-y-3 h-full w-full">
                <textarea
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    className="bg-transparent border-none outline-none text-white font-normal text-16 w-full h-full resize-none placeholder:text-white/60"
                    name="body"
                    autoFocus
                >
                </textarea>

                {errors?.body && <p className="text-red-500 font-sans">{errors?.body}</p>}
            </div>
        </>
    )
}

export default DisplayPost