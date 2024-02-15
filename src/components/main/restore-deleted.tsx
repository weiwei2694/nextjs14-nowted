import { deletePostPermanentAction, updatePostDeletedAtAction } from '@/actions/post.action';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useTransition } from 'react'
import { MdRestore } from "react-icons/md";
import { toast } from 'sonner';

type Props = {
    postId: string;
}

const RestoreDeleted = ({ postId }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const folderId = searchParams.get("folderId");
    const category = searchParams.get("category");
    const [isPending, startTransition] = useTransition();

    const restoreAction = () => {
        if (!postId || isPending) return null;

        try {
            startTransition(async () => {
                const res = await updatePostDeletedAtAction({ postId, path: window.location.pathname });

                if (res.message === "Post undeleted successfully." && res.data) {
                    router.push(`/?folderId=${res.data.folderId}&postId=${res.data.postId}`);
                }
            });
        } catch (error) {
            console.info('[ERROR_RESTORE_ACTION]', error);

            toast('Something went wrong.');
        }
    }

    const deletePermanent = () => {
        if (!postId || isPending) return null;

        try {
            startTransition(async () => {
                await deletePostPermanentAction({ postId, path: window.location.pathname });

                if (folderId && postId) {
                    router.push(`/?folderId=${folderId}&postId=${postId}`)
                } else if (category) {
                    router.push(`/?category=${category}`)
                }
            });
        } catch (error) {
            console.info('[ERROR_DELETE_PERMANENT]', error);

            toast('Something went wrong.');
        }
    }

    return (
        <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center text-center gap-y-10">
                <MdRestore className="w-80 h-80 text-white" />
                <h1 className="font-sans font-semibold text-28 text-white">Restore</h1>
                <p className="font-sans font-normal text-16 text-white/60">Don't want to lose this note? It's not too late! Just click the 'Restore'<br /> button and it will be added back to your list. It's that simple..</p>
                <div className="flex justify-center gap-x-10">
                    <button className="btn bg-[#312EB5] hover:bg-[#312EB5]/90 disabled:bg=[#312EB5]/60 !w-fit text-white" disabled={isPending} onClick={restoreAction}>Restore</button>
                    <button className="btn btn-danger" disabled={isPending} onClick={deletePermanent}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default RestoreDeleted