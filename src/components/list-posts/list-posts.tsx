"use client";

import React from 'react'
import List from './list';

const ListPosts = () => {
    return (
        <section className="w-350 h-screen overflow-y-auto py-30 bg-[#1C1C1C] flex flex-col gap-y-30">
            <h2 className="px-20 font-sans font-semibold text-22 text-white">Personal</h2>

            <div className="flex flex-col gap-y-20 px-20">
                <List
                    title="My Goals for the Next Year"
                    createdAt="31/12/2022"
                    body="As the year comes to a ..."
                    active={false}
                />
                <List
                    title="Reflection on the Month of June"
                    createdAt="21/06/2022"
                    body="It's hard to believe that ..."
                    active={true}
                />
                <List
                    title="My Favorite Memories from Childhood"
                    createdAt="31/12/2022"
                    body="I was reminiscing about ..."
                    active={false}
                />
                <List
                    title="Reflections on My First Year of College"
                    createdAt="31/12/2022"
                    body="It's hard to believe that ..."
                    active={false}
                />
                <List
                    title="Thoughts on the Pandemic"
                    createdAt="31/12/2022"
                    body="It's hard to believe that ..."
                    active={false}
                />
                <List
                    title="My Favorite Recipes"
                    createdAt="31/12/2022"
                    body="I love cooking and trying ..."
                    active={false}
                />
            </div>
        </section>
    )
}

export default ListPosts