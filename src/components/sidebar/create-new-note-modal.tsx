"use client"

import FolderType from "@/types/folder.type";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";

type Errors = {
    title?: string;
    folderId?: string;
} | null

type Props = {
    folders: FolderType[]
}

const CreateNewNoteModal = ({ folders }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const modal = searchParams.get('modal');
    const folderId = searchParams.get('folderId');
    const postId = searchParams.get('postId');

    const [errors, setErrors] = useState<Errors>(null);

    const clientAction = async (formData: FormData) => {

    }

    const cancel = () => {
        if (folderId && postId) {
            router.push(`/?folderId=${folderId}&postId=${postId}`);
        } else if (folderId) {
            router.push(`/?folderId=${folderId}`);
        }
    }

    return modal === 'open' ? (
        <div className="z-50 absolute top-0 left-0 w-full h-full flex items-center justify-center bg-primary/15">
            <div className="p-30 rounded-3 bg-white shadow flex flex-col space-y-15 w-400">
                {/* Title */}
                <h1 className="font-sans text-34 font-semibold text-center text-primary">New Note</h1>

                {/* Title & Folder */}
                <form action={clientAction} className="flex flex-col gap-y-20">
                    <div className="flex flex-col gap-y-3">
                        <label htmlFor="title" className="label">Password</label>
                        <input type="text" placeholder="Title" id="title" name="title" className={`input ${errors?.title ? 'input-error' : null}`} />

                        {errors?.title && <p className="text-red-500 font-sans">{errors?.title}</p>}
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <label htmlFor="folderId" className="label">Choose Folder</label>
                        <select className={`input ${errors?.folderId ? 'input-error' : null}`} name="folderId" id="folderId">
                            {folders.map(folder => (
                                <option key={folder.id} value={folder.id}>{folder.name}</option>
                            ))}
                        </select>

                        {errors?.folderId && <p className="text-red-500 font-sans">{errors?.folderId}</p>}
                    </div>

                    {/* Button Submit & Cancel */}
                    <div className="flex flex-items-center gap-x-10">
                        {/* Submit */}
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                        {/* Cancel */}
                        <button type="button" className="w-fit flex-1 btn btn-danger" onClick={cancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div >
    ) : null;
}

export default CreateNewNoteModal