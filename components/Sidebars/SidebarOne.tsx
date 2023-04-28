"use client"

import Link from 'next/link'
import React from 'react'
import RectButton from '../Buttons/RectButton'
import { useAuth } from '@/contexts/AuthContext'

const SidebarOne = () => {
    const { logout } = useAuth()

    const handleLogout = async () => {
        await logout()
    }

    return (
        <aside className='h-full min-h-[100vh] w-[200px] bg-gray-900 text-slate-200'>
            <nav className='w-full p-5'>
                <ul className='list-none divide-y-1'>
                    <li>
                        <Link href='/dashboard'>Dashboard</Link>
                    </li>
                    <li>
                        <Link href='/users'>Users</Link>
                    </li>
                </ul>
                <RectButton variant='primary' onCLick={handleLogout}>
                    Sign out
                </RectButton>
            </nav>
        </aside>
    )
}

export default SidebarOne