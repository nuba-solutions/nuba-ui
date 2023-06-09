import Link from 'next/link'
import React from 'react'
import Tippy from '@tippyjs/react';

interface NavButtonProps {
    children: React.ReactNode,
    link?: string,
    notification?: boolean
    tip?: string
}
const NavButton: React.FC<NavButtonProps> = ({children, link, notification, tip}) => {
    return (
        <Tippy content={tip? tip : null} delay={500} className={`${tip? 'tooltip' : ''}`}>
            {link ? (
                <Link href={link} className='relative text-xl text-slate-400 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-100 rounded-full hover:bg-gray-200 hover:dark:bg-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600'>
                    {notification && <span className='absolute top-[5px] right-[5px] h-[12px] w-[12px] rounded-full bg-red-500 border-2 border-white dark:border-gray-800'></span>}
                    {children}
                </Link>
            ) : (
                <button className='relative text-xl text-slate-400 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-100 rounded-full hover:bg-gray-200 hover:dark:bg-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600'>
                    {notification && <span className='absolute top-[5px] right-[5px] h-[12px] w-[12px] rounded-full bg-red-500 border-2 border-white dark:border-gray-800'></span>}
                    {children}
                </button>
            )}
        </Tippy>
    )
}

export default NavButton