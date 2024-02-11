import React from 'react'

type Props = {
    title: string;
    icon: JSX.Element;
    active: boolean;
    activeColor?: string;
}

const List = ({ title, icon, active, activeColor }: Props) => {
    return (
        <div className={`py-10 px-20 h-40 w-full flex items-center gap-x-15 cursor-pointer ${active ? activeColor : "opacity-60"}`}>
            {icon}
            <h3 className="font-sans text-16 font-semibold text-white">{title}</h3>
        </div>
    )
}

export default List;