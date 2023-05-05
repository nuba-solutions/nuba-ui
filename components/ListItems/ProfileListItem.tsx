import Link from 'next/link'
import React from 'react'
import { IoNotifications } from 'react-icons/io5'

interface ProfileListItemProps {
    children: React.ReactNode,
    onClick?: () => void,
    link?: string
    notification?: boolean
}

const ProfileListItem: React.FC<ProfileListItemProps> = ({children, onClick,  link, notification}) => {
    return  link ? (
        <li>
            <Link href="" className='select-none relative flex flex-row items-center justify-between px-4 py-2 md:text-base hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white' role="menuitem">
                <span className='flex items-center'>
                    {children}
                </span>
                {notification && <span className='absolute right-[15px] h-[8px] w-[8px] rounded-full bg-red-500'></span>}
            </Link>
        </li>
    ) : (
        <li>
            <span onClick={onClick} className={`select-none relative flex flex-row items-center justify-between px-4 py-2 md:text-base hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white' ${onClick ? 'cursor-pointer' : ''}`} role="menuitem">
                <span className='flex items-center'>
                    {children}
                </span>
                {notification && <span className='absolute right-[15px] h-[8px] w-[8px] rounded-full bg-red-500'></span>}
            </span>
        </li>
    )
}

export default ProfileListItem