import React from 'react'

type Props = {
    title: string;
}

const Subtitle = ({ title }: Props) => {
    return (
        <h4 className="font-sans font-semibold text-14 text-white/60">{title}</h4>
    )
}

export default Subtitle