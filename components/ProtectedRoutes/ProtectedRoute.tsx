"use client"

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation';
import React, {useEffect} from 'react'
import SidebarOne from '../Sidebars/SidebarOne';

const ProtectedRoute = ({children} : {children : React.ReactNode}) => {

    const {user} = useAuth();
    const router = useRouter();

    useEffect(() => {
        !user ? router.push('/login') : ''
    },[router, user])

    return (
        <div className='flex flex-row'>
            {user ? (
                <>
                    <SidebarOne/>
                    <div className='flex flex-col flex-1'>
                        <nav className='flex justify-end items-center p-5 w-full h-[80px] bg-slate-200'>
                            <ul className='pr-10'>
                                <li>Account</li>
                            </ul>
                            <span>
                                Welcome <strong>{user?.displayName}</strong>
                            </span>
                        </nav>
                        {children}
                    </div>
                </>
            ) : null}
        </div>
    )
}

export default ProtectedRoute