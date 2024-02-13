import { updatePostDeletedAtAction } from '@/actions/post.action';
import React, { useTransition } from 'react'
import { MdRestore } from "react-icons/md";

type Props = {
    postId: string;
}

const RestoreDeleted = ({ postId }: Props) => {
    const [isRestorePending, setRestoreTransition] = useTransition();
    const restoreAction = () => {
        if (!postId || isRestorePending) return null;

        try {
            setRestoreTransition(() => {
                updatePostDeletedAtAction({ postId, path: window.location.pathname });
            });
        } catch (error) {
            console.info('[ERROR_RESTORE_ACTION]', error);
        }
    }

    return (
        <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center text-center gap-y-10">
                <MdRestore className="w-80 h-80 text-white" />
                <h1 className="font-sans font-semibold text-28 text-white">Restore</h1>
                <p className="font-sans font-normal text-16 text-white/60">Don't want to lose this note? It's not too late! Just click the 'Restore'<br /> button and it will be added back to your list. It's that simple..</p>
                <button className="btn bg-[#312EB5] hover:bg-[#312EB5]/90 disabled:bg=[#312EB5]/60 !w-fit text-white" disabled={isRestorePending} onClick={restoreAction}>Restore</button>
            </div>
        </div>
    )
}

export default RestoreDeleted