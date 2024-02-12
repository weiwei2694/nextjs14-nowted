"use client"

import { createPostAction } from "@/actions/post.action";
import FolderType from "@/types/folder.type";
import { createPostSchema } from "@/validations/post.validation";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";

type Errors = {
    title?: string;
    folderId?: string;
} | null

type Props = {
    folders: FolderType[];
    userId: string;
}

const CreateNewNoteModal = ({ folders, userId }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const modal = searchParams.get('modal');
    const folderId = searchParams.get('folderId');
    const postId = searchParams.get('postId');

    const [errors, setErrors] = useState<Errors>(null);
    const [isMutation, setIsMutation] = useState(false);

    const clientAction = async (formData: FormData) => {
        if (isMutation) return null;
        setIsMutation(true);

        try {
            const data = {
                userId,
                folderId: formData.get('folderId') as string || "",
                title: formData.get('title') as string || "",
                path: window.location.pathname
            };

            const validations = createPostSchema.safeParse(data);
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

            const res = await createPostAction(data);
            if (res.message === "Post created successfully.") {
                router.push(`/?folderId=${res?.data?.folderId}&postId=${res?.data?.id}`);
            }
        } catch (error) {
            console.info(["[ERROR_CLIENT_ACTION]"], error);
        } finally {
            setIsMutation(false);
        }
    }

    const cancel = () => {
        if (folderId && postId) {
            router.push(`/?folderId=${folderId}&postId=${postId}`);
        } else if (folderId) {
            router.push(`/?folderId=${folderId}`);
        } else {
            router.push('/');
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
                        <label htmlFor="title" className="label">Title</label>
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
                        <button type="submit" className="btn btn-primary" disabled={isMutation}>
                            Save
                        </button>
                        {/* Cancel */}
                        <button type="button" className="w-fit flex-1 btn btn-danger" onClick={cancel} disabled={isMutation}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div >
    ) : null;
}

export default CreateNewNoteModal