"use client"

import { updatePostDeletedAtAction, updatePostFavoritedAtAction } from '@/actions/post.action';
import React, { Dispatch, SetStateAction, useTransition, MouseEvent } from 'react'
import { FaRegStar } from 'react-icons/fa6';
import { FiArchive, FiTrash } from 'react-icons/fi';
import { GoStarFill } from 'react-icons/go';
import { toast } from 'sonner';

type Props = {
    setOpenMenu: Dispatch<SetStateAction<boolean>>;
    postId: string | null;
    favoritedAt: Date | null;
}

const Menu = ({ setOpenMenu, postId, favoritedAt }: Props) => {
    const [isPending, startTransition] = useTransition();

    const closeMenu = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        e.stopPropagation();
        setOpenMenu(false);
    }

    const deleted = async () => {
        if (!postId || isPending) return null;

        try {
            startTransition(() => {
                updatePostDeletedAtAction({ postId, path: window.location.pathname });
            });
        } catch (error) {
            console.info('[ERROR_DELETED]', error);

            toast.error("Something went wrong.");
        }
    }

    const favorited = async () => {
        if (!postId || isPending) return null;

        try {
            startTransition(() => {
                updatePostFavoritedAtAction({ postId, path: window.location.pathname });
            });
        } catch (error) {
            console.info('[ERROR_FAVORITED]', error);

            toast.error("Something went wrong.");
        }
    }

    return (
        <div onClick={e => closeMenu(e)} className="absolute top-44 right-0 bg-[#333333] p-15 rounded-6 text-white w-202 flex flex-col gap-y-20">
            <button onClick={favorited} disabled={isPending} className="flex items-center gap-x-15">
                {favoritedAt ? <GoStarFill className="w-20 h-20" /> : <FaRegStar className="w-20 h-20" />}
                <h5 className="font-sans font-normal text-16">{favoritedAt ? "Unfavorited" : "Add to favorites"}</h5>
            </button>
            <button className="flex items-center gap-x-15">
                <FiArchive className="w-20 h-20" />
                <h5 className="font-sans font-normal text-16">Archived</h5>
            </button>
            <div className="h-1 w-full bg-white/5" />
            <button className="flex items-center gap-x-15" disabled={isPending} onClick={deleted}>
                <FiTrash className="w-20 h-20" />
                <h5 className="font-sans font-normal text-16">Delete</h5>
            </button>
        </div>
    )
}

export default Menu