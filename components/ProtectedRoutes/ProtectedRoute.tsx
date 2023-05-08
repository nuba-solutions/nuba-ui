"use client"

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation';
import React, {useEffect, useState} from 'react'
import NavbarOne from '../Navbars/NavbarOne';
import SidebarOne from '../Sidebars/SidebarOne';

const ProtectedRoute = ({children} : {children : React.ReactNode}) => {

    const { user } = useAuth();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState<any>(false)

    useEffect(() => {
        !user ? router.push('/login') : ''
    },[router, user])

    return (
        <>
            <NavbarOne isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
            <div className='flex'>
                <SidebarOne isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
                <main className='w-full p-3'>
                    {children}
                </main>
            </div>
        </>
    )
}

export default ProtectedRoute