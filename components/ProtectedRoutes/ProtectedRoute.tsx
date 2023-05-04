"use client"

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation';
import React, {useEffect} from 'react'
import NavbarOne from '../Navbars/NavbarOne';
import SidebarOne from '../Sidebars/SidebarOne';

const ProtectedRoute = ({children} : {children : React.ReactNode}) => {

    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        !user ? router.push('/login') : ''
    },[router, user])

    return (
        <div className='bg-slate-100 dark:bg-gray-900 text-slate-600 dark:text-slate-200 min-h-full'>
            <NavbarOne/>
            {/* <SidebarOne/> */}
            <div className='p-3'>
                {children}
            </div>
        </div>
    )
}

export default ProtectedRoute