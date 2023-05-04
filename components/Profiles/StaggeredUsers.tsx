import React, { Children } from 'react'
import ProfileImage from './ProfileImage'
import Link from 'next/link'

interface StaggeredUsersProps {
    children: React.ReactNode,
    vertical?: boolean,
    size?: string,
    link?: string,
}

const StaggeredUsers: React.FC<StaggeredUsersProps> = ({children, vertical, size, link}) => {
    let sizeClass: string = ''

    switch(size) {
        case 'sm':
            sizeClass = 'h-[25px] w-[25px]'
            break;
        case 'md':
            sizeClass = 'h-[35px] w-[35px]'
            break;
        case 'lg':
            sizeClass = 'h-[45px] w-[45px]'
            break;
        case 'xl':
            sizeClass = 'h-[55px] w-[55px] text-lg'
            break;
        case '2xl':
            sizeClass = 'h-[65px] w-[65px] text-2xl'
            break;
        default:
            sizeClass = 'h-[35px] w-[35px]'
            break;
    }

    return (
        <>
            {
                link ? (
                    <Link href={link} className={`${vertical ? 'flex-col -space-y-3' : 'flex-row items-center -space-x-3'} flex w-fit`}>
                        {children}
                        {Children.count(children) >= 5 ?
                            (
                                <div className={`${sizeClass} overflow-clip shadow-md rounded-full flex items-center justify-center font-semibold leading-4 bg-secondary-500 text-white outline outline-2 outline-slate-50 dark:outline-slate-700`}>
                                    {`${Children.count(children)}+`}
                                </div>
                            ) : (null)}
                    </Link>
                ) : (
                    <div className={`${vertical ? 'flex-col -space-y-3' : 'flex-row items-center -space-x-3'} flex w-fit`}>
                        {children}
                        {Children.count(children) >= 5 ?
                        (
                            <div className={`${sizeClass} overflow-clip shadow-md rounded-full flex items-center justify-center font-semibold leading-4 bg-secondary-500 dark:bg-primary-500 text-white outline outline-2 outline-slate-50 dark:outline-slate-700`}>
                                {`${Children.count(children)}+`}
                            </div>
                        ) : (null)}
                    </div>
                )
            }
        </>
    )
}

export default StaggeredUsers