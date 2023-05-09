import Link from 'next/link'
import React from 'react'

interface DropdownListItemProps {
    onClick?: () => void
    link?: string
    name: string
}

const DropdownListItem: React.FC<DropdownListItemProps> = ({onClick, link, name}) => {
    return (
        <li>
            {link ? (
                <Link
                    href={link}
                    className={`select-none cursor-pointer flex items-center py-3 pl-8 hover:bg-gray-200 dark:hover:bg-gray-600 text-slate-500 dark:text-slate-300`}
                >
                    {name}
                </Link>
            ) : (
                <span
                    onClick={onClick}
                    className={`select-none cursor-pointer flex items-center py-3 pl-8 hover:bg-gray-200 dark:hover:bg-gray-600 text-slate-500 dark:text-slate-300`}
                >
                    {name}
                </span>
            )}
        </li>
    )
}

export default DropdownListItem