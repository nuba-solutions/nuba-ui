import Link from "next/link"
import React, { useState } from "react"
import { IoChevronDown, IoChevronUp } from "react-icons/io5"

interface SidebarListItemProps {
    children?: React.ReactNode
    onClick?: () => void
    link?: string
    notification?: boolean
    name: string
    iconLeft?: React.ReactNode
    iconRight?: React.ReactNode
    rightText?: string
    count?: number
    compact?: boolean
    dropdown?: boolean
}

const SidebarListItem: React.FC<SidebarListItemProps> = ({children, name, onClick, link, iconLeft, iconRight, rightText, count, compact, dropdown}) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <li>
            {link ? (
                <Link href="/dashboard"
                    className={`select-none cursor-pointer flex items-center ${compact? 'justify-center' : 'justify-between'} h-[45px] px-2 rounded-lg ${isDropdownOpen ? 'rounded-b-none bg-gray-100 dark:bg-gray-700' : 'bg-none'} hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                    <div className="flex items-center">
                        {
                            iconLeft ? (
                                <div className="text-slate-400 text-lg">
                                    {iconLeft}
                                </div>
                            ) : ('')
                        }
                        {!compact ? <span className="ml-2">{name}</span> : ''}
                    </div>
                    {
                        !compact ? (
                            <div className="flex items-center">
                                {
                                    rightText ? (
                                        <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium bg-gray-200 rounded-full dark:bg-gray-700">{rightText}</span>
                                    ) : ('')
                                }
                                {
                                    count ? (
                                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-white rounded-full bg-red-500">{count}</span>
                                    ) : ('')
                                }
                                {
                                    iconRight ? (
                                        <div className="text-slate-500 dark:text-slate-400 ml-2 text-lg">
                                            {iconRight}
                                        </div>
                                    ) : ('')
                                }
                            </div>
                        ) : ('')
                    }
                </Link>
                ) : (
                    <>
                        <span
                            onClick={!dropdown? onClick : () => setIsDropdownOpen(prev => !prev)}
                            title={name}
                            className={`select-none cursor-pointer flex ${compact? 'justify-center' : 'justify-between'} items-center h-[45px] px-2 rounded-lg ${isDropdownOpen ? 'rounded-b-none bg-gray-100 dark:bg-gray-700': 'bg-none'} hover:bg-gray-100 dark:hover:bg-gray-700`}>
                            <div className="flex items-center">
                                {
                                    iconLeft ? (
                                        <div className="text-slate-400 text-lg">
                                            {iconLeft}
                                        </div>
                                    ) : ('')
                                }
                                {!compact ? <span className="ml-2">{name}</span> : ''}
                            </div>
                            {
                                !compact ? (
                                    <div className="flex items-center">
                                        {
                                            rightText ? (
                                                <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium bg-gray-200 rounded-full dark:bg-gray-700">{rightText}</span>
                                            ) : ('')
                                        }
                                        {
                                            count ? (
                                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-white rounded-full bg-red-500">{count}</span>
                                            ) : ('')
                                        }
                                        {
                                            iconRight && !dropdown? (
                                                <div className="text-slate-500 dark:text-slate-400 ml-2 text-lg">
                                                    {iconRight}
                                                </div>
                                            ) : ('')
                                        }
                                        {
                                            dropdown ? (
                                                <div className="text-slate-500 dark:text-slate-400 ml-2 text-lg">
                                                    {isDropdownOpen ? <IoChevronUp/> : <IoChevronDown/>}
                                                </div>
                                            ) : ('')
                                        }
                                    </div>
                                ) : ('')
                            }
                        </span>
                        {dropdown && isDropdownOpen? (
                            <>
                                <hr className="h-px bg-white border-0 dark:bg-gray-900"></hr>
                                <ul className={`bg-gray-100 dark:bg-gray-700 rounded-lg ${compact ? 'rounded-tl-none absolute min-w-[200px] shadow-xl' : 'rounded-t-none'} transition ease-in overflow-clip`}>
                                    {children}
                                </ul>
                            </>
                        ) : ''}
                    </>
                )
            }
        </li>
    )
}

export default SidebarListItem