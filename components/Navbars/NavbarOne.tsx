import React, {useState} from 'react'
import ProfileImage from '../Profiles/ProfileImage'
import Image from 'next/image'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import SwitcherOne from '../Switchers/SwitcherOne'
import { IoAccessibility, IoAirplane, IoMail, IoNotifications } from 'react-icons/io5'
import { useTheme } from '@/contexts/ThemeContext'

const NavbarOne = () => {
    const { theme, setTheme } = useTheme();
    const { user, logout } = useAuth()
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)

    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(current => !current)
    }

    const handleLogout = async () => {
        await logout()
    }

    return (
        <nav className="sticky top-0 z-50 w-full h-[70px] flex items-center justify-between pl-2 pr-4 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-start">
                <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span className="sr-only">Open sidebar</span>
                    <HiOutlineMenuAlt1 className='text-2xl'/>
                </button>
                <Link href="/dashboard">
                    <Image src="/logos/nuba-ui-logo-mixed.svg" alt="Nuba Logo" width={90} height={50} className='mx-4 hidden dark:block'/>
                    <Image src="/logos/nuba-ui-logo.svg" alt="Nuba Logo" width={90} height={50} className='mx-4 dark:hidden'/>
                </Link>
            </div>
            <div className="flex items-center">
                <div className='flex items-center mr-4 gap-x-6 text-lg text-slate-400'>
                    <IoMail/>
                    <IoNotifications/>
                </div>
                <div className="flex items-center ml-3">
                    <div>
                        <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            onClick={toggleUserDropdown}
                        >
                            <span className="sr-only">Open user menu</span>
                            <ProfileImage name={user?.displayName} classes=''/>
                        </button>
                        <div className={`${isUserDropdownOpen? 'block' : 'hidden'} absolute right-2 z-50 my-6 list-none overflow-clip bg-white divide-y divide-gray-200 rounded-lg shadow-xl dark:shadow-2xl dark:bg-gray-700 dark:divide-gray-600`}>
                            <div className="px-4 py-4" role="none">
                                <p className="text-sm font-semibold md:text-base" role="none">
                                    {user?.displayName}
                                </p>
                                <p className="text-sm truncate opacity-70" role="none">
                                    {user?.email}
                                </p>
                            </div>
                            <ul className="py-2" role="none">
                                <li>
                                    <Link href="/dashboard" className="block px-4 py-2  md:text-base hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</Link>
                                </li>
                                <li>
                                    <Link href="/users" className="block px-4 py-2  md:text-base hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Users</Link>
                                </li>
                                <li>
                                    <Link href="/dashboard" className="block px-4 py-2  md:text-base hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</Link>
                                </li>
                                <li>
                                    <span onClick={handleLogout} className="cursor-pointer block px-4 py-2  md:text-base text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</span>
                                </li>
                            </ul>
                            <div className='px-4 py-2 pt-4'>
                                <SwitcherOne label='Dark Mode' onChange={() => setTheme(!theme || theme === '' ? 'dark' : '')} checked={theme === 'dark' ? true : false}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavbarOne