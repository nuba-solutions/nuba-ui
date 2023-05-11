import { usePageHeader } from "@/contexts/PageHeaderContext"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { SetStateAction, useState } from "react"
import { IoChevronDown, IoChevronUp } from "react-icons/io5"

interface SidebarListItemProps {
    children?: React.ReactNode
    onClick?: () => void | React.Dispatch<SetStateAction<boolean>>
    link?: string
    notification?: boolean
    name: string
    iconLeft?: React.ReactNode
    iconRight?: React.ReactNode
    rightText?: string
    count?: number
    compact?: boolean
    dropdown?: boolean
    isChildActive?: boolean
    classes?: string
    pageHeader?: {title: string, sub: string}
}

const SidebarListItem: React.FC<SidebarListItemProps> = ({children, name, onClick, link, iconLeft, iconRight, rightText, count, compact, dropdown, isChildActive, classes, pageHeader}) => {
    const path = usePathname();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { setPageHeader } = usePageHeader()

    return (
        <li>
            {link ? (
                <>
                    <Link
                        onClick={() => {
                            onClick;
                            pageHeader ? setPageHeader({title: pageHeader.title, sub: pageHeader.sub}) : ''
                        }}
                        href={link}
                        className={`select-none cursor-pointer flex items-center ${compact? 'justify-center' : 'justify-between'} h-[45px] px-2 rounded-lg text-slate-300 ${isDropdownOpen ? 'rounded-b-none bg-gray-100 dark:bg-gray-700' : 'bg-none'} hover:bg-gray-100 dark:hover:bg-gray-700 ${path == `/${link}` ? "active" : "dark:text-slate-500"} ${classes ?  classes : ''}`}
                    >
                        <div className="flex items-center">
                            {
                                iconLeft ? (
                                    <div className="text-lg">
                                        {iconLeft}
                                    </div>
                                ) : ('')
                            }
                            {!compact ? <span className="ml-2 text-slate-500 dark:text-slate-300">{name}</span> : ''}
                        </div>
                        {
                            !compact ? (
                                <div className="flex items-center">
                                    {
                                        rightText ? (
                                            <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium bg-gray-200 text-slate-600 dark:text-slate-100 rounded-full dark:bg-gray-700">{rightText}</span>
                                        ) : ('')
                                    }
                                    {
                                        count ? (
                                            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-white rounded-full bg-red-500">{count}</span>
                                        ) : ('')
                                    }
                                    {
                                        iconRight ? (
                                            <div className="text-slate-400 dark:text-slate-400 ml-2 text-lg">
                                                {iconRight}
                                            </div>
                                        ) : ('')
                                    }
                                </div>
                            ) : ('')
                        }
                    </Link>
                </>
                ) : (
                    <>
                        <span
                            onClick={!dropdown? onClick : () => setIsDropdownOpen(prev => !prev)}
                            onMouseEnter={() => setIsDropdownOpen(true)}
                            onMouseLeave={() => setIsDropdownOpen(false)}
                            title={name}
                            className={`select-none cursor-pointer flex ${compact? 'justify-center' : 'justify-between'} items-center h-[45px] px-2 rounded-lg text-slate-300 dark:text-slate-500 ${isDropdownOpen && dropdown ? 'rounded-b-none bg-gray-100 dark:bg-gray-700': 'bg-none'} hover:bg-gray-100 dark:hover:bg-gray-700`}>
                            <div className="flex items-center">
                                {
                                    iconLeft ? (
                                        <div className="text-lg">
                                            {iconLeft}
                                        </div>
                                    ) : ('')
                                }
                                {!compact ? <span className="ml-2 text-slate-500 dark:text-slate-300">{name}</span> : ''}
                            </div>
                            {
                                !compact ? (
                                    <div className="flex items-center">
                                        {
                                            rightText ? (
                                                <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium bg-gray-200 text-slate-600 dark:text-slate-100 rounded-full dark:bg-gray-700">{rightText}</span>
                                            ) : ('')
                                        }
                                        {
                                            count ? (
                                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-white rounded-full bg-red-500">{count}</span>
                                            ) : ('')
                                        }
                                        {
                                            iconRight && !dropdown? (
                                                <div className="text-slate-400 dark:text-slate-400 ml-2 text-lg">
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
                        {dropdown ? (
                            <div
                                className={`${isDropdownOpen ? 'opacity-1' : 'hidden opacity-0'}`}
                                onMouseEnter={() => setIsDropdownOpen(true)}
                                onMouseLeave={() => setIsDropdownOpen(false)}
                            >
                                {children}
                            </div>
                        ) : ''}
                    </>
                )
            }
        </li>
    )
}

export default SidebarListItem