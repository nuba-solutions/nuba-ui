import Link from "next/link"
import React from "react"

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
}

const SidebarListItem: React.FC<SidebarListItemProps> = ({name, onClick, link, iconLeft, iconRight, rightText, count}) => {
    return (
        <li>
            {link ? (
                    <Link href="/dashboard" className="cursor-pointer flex items-center justify-between py-3 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <div className="flex items-center">
                            {
                                iconLeft ? (
                                    <div className="text-slate-400 text-lg">
                                        {iconLeft}
                                    </div>
                                ) : ('')
                            }
                            <span className="ml-2">{name}</span>
                        </div>
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
                    </Link>
                ) : (
                    <span onClick={onClick} className="cursor-pointer flex justify-between items-center py-3 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <div className="flex items-center">
                            {
                                iconLeft ? (
                                    <div className="text-slate-400 text-lg">
                                        {iconLeft}
                                    </div>
                                ) : ('')
                            }
                            <span className="ml-2">{name}</span>
                        </div>
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
                    </span>
                )
            }
        </li>
    )
}

export default SidebarListItem