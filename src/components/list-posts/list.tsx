import React from 'react'

type Props = {
    title: string
    createdAt: string
    body: string
    active: boolean
}

const List = ({ title, createdAt, body, active }: Props) => {
    return (
        <div className={`p-20 flex flex-col gap-y-10 rounded-3 ${active ? "bg-white/15" : "bg-white/5"} cursor-pointer`}>
            <h4 className="font-sans font-semibold text-18 text-white">{title}</h4>
            <div className="flex items-center gap-x-10">
                <p className="font-sans font-normal text-16 text-white/40">{createdAt}</p>
                <p className="font-sans font-normal text-16 text-white/60">{body}</p>
            </div>
        </div>
    )
}

export default List