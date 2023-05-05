import Link from 'next/link'
import React from 'react'

interface NavButtonProps {
    children: React.ReactNode,
    link?: string,
    notification?: boolean
}
const NavButton: React.FC<NavButtonProps> = ({children, link, notification}) => {
    return link ? (
        <Link href={link} className='relative text-xl text-slate-400 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-100 rounded-full hover:bg-gray-200 hover:dark:bg-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600'>
            {notification && <span className='absolute top-[8px] right-[8px] h-[8px] w-[8px] rounded-full bg-red-500'></span>}
            {children}
        </Link>
    ) : (
        <button className='relative text-xl text-slate-400 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-100 rounded-full hover:bg-gray-200 hover:dark:bg-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600'>
            {notification && <span className='absolute top-[8px] right-[8px] h-[8px] w-[8px] rounded-full bg-red-500'></span>}
            {children}
        </button>
    )
}

export default NavButton