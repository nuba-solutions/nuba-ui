import React, {useState} from 'react'
import ProfileImage from '../Profiles/ProfileImage'
import Image from 'next/image'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import SwitcherOne from '../Switchers/SwitcherOne'
import { IoMail, IoNotifications, IoSettings } from 'react-icons/io5'
import { useTheme } from '@/contexts/ThemeContext'
import NavButton from '../Buttons/NavButton'
import ProfileListItem from '../ListItems/ProfileListItem'
import { TbArrowBarToLeft, TbArrowBarToRight } from 'react-icons/tb'
import { usePageHeader } from '@/contexts/PageHeaderContext'

const NavbarOne = ({setIsSidebarOpen, setIsSidebarCompact, isSidebarCompact} : any) => {
    const { pageHeader, setPageHeader } = usePageHeader();
    const { theme, setTheme } = useTheme();
    const { user, logout } = useAuth()
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)

    const handleLogout = async () => {
        await logout()
    }

    return (
        <nav className="sticky top-0 z-50 w-full h-[70px] flex items-center justify-between pl-2 pr-4 bg-white border-b border-gray-200 dark:bg-slate-800 dark:border-gray-700">
            <div className="flex items-center justify-between w-[250px]">
                <div className='flex items-center'>
                    <button onClick={() => setIsSidebarOpen((prev: boolean) => !prev)} type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <span className="sr-only">Open sidebar</span>
                        <HiOutlineMenuAlt1 className='text-2xl'/>
                    </button>
                    <Link href="/dashboard" className='focus:outline-none'
                        onClick={() => setPageHeader({title: 'Dashboard', sub: 'Welcome to Nuba UI'})}
                    >
                        <Image
                            src="/logos/nuba-ui-logo-mixed.svg"
                            alt="Nuba Logo"
                            width={90}
                            height={50}
                            className='mx-4 hidden dark:block'
                            placeholder="blur"
                            blurDataURL={'/logos/nuba-ui-logo-mixed.svg'}
                            priority
                        />
                        <Image
                            src="/logos/nuba-ui-logo.svg"
                            alt="Nuba Logo"
                            width={90}
                            height={50}
                            className='mx-4 dark:hidden'
                            placeholder="blur"
                            blurDataURL={'/logos/nuba-ui-logo.svg'}
                            priority
                        />
                    </Link>
                </div>
                {isSidebarCompact ? (
                        <TbArrowBarToRight
                            onClick={() => setIsSidebarCompact((prev: boolean) => !prev)}
                            className='hidden lg:block cursor-pointer h-6 w-6 rounded-sm mr-5 text-gray-400'
                        />
                    ) : (
                        <TbArrowBarToLeft
                            onClick={() => setIsSidebarCompact((prev: boolean) => !prev)}
                            className='hidden lg:block cursor-pointer h-6 w-6 rounded-sm mr-5 text-gray-400'
                        />
                    )
                }
            </div>
            <div className="flex items-center lg:flex-1 justify-between">
                <div className='hidden lg:flex flex-col'>
                    <p className='text-base'>{pageHeader?.title}</p>
                    <p className='text-sm opacity-60'>{pageHeader?.sub}</p>
                </div>
                <div className='flex'>
                    <div className='hidden md:flex items-center mr-4 gap-x-2'>
                        <NavButton link='/users' tip='Email & Messages'>
                            <IoMail/>
                        </NavButton>
                        <NavButton notification tip='Notifications'>
                            <IoNotifications/>
                        </NavButton>
                        <NavButton tip='Settings'>
                            <IoSettings/>
                        </NavButton>
                    </div>
                    <div className="flex items-center ml-3">
                        <div>
                            <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-8 focus:ring-gray-200 dark:focus:ring-gray-600 hover:ring-4 hover:ring-gray-200 dark:hover:ring-gray-600"
                                onClick={() => setIsUserDropdownOpen(current => !current)}
                            >
                                <span className="sr-only">Open user menu</span>
                                <ProfileImage name={user?.displayName}/>
                            </button>
                            {isUserDropdownOpen ? (
                                <div className={`block absolute right-2 z-50 my-6 list-none overflow-clip bg-white divide-y divide-gray-200 rounded-lg shadow-xl dark:shadow-2xl dark:bg-gray-700 dark:divide-gray-600`}>
                                    <div className="px-4 py-4" role="none">
                                        <p className="text-sm font-semibold md:text-base" role="none">
                                            {user?.displayName}
                                        </p>
                                        <p className="text-sm truncate opacity-70" role="none">
                                            {user?.email}
                                        </p>
                                    </div>
                                    <ul className="py-2" role="none">
                                        <ProfileListItem link='/users' onClick={() => setIsUserDropdownOpen(false)}>
                                            Account
                                        </ProfileListItem>
                                        <ProfileListItem onClick={() => setIsUserDropdownOpen(false)}>
                                            Messages
                                        </ProfileListItem>
                                        <ProfileListItem notification onClick={() => setIsUserDropdownOpen(false)}>
                                            Notifications
                                        </ProfileListItem>
                                        <ProfileListItem onClick={() => setIsUserDropdownOpen(false)}>
                                            Settings
                                        </ProfileListItem>
                                        <ProfileListItem onClick={handleLogout}>
                                            Sign out
                                        </ProfileListItem>
                                    </ul>
                                    <div className='px-4 py-2 pt-4'>
                                        <SwitcherOne label='Dark Mode' onChange={() => setTheme(!theme || theme === '' ? 'dark' : '')} checked={theme === 'dark' ? true : false}/>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavbarOne