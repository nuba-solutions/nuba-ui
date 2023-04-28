"use client"

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation';
import React, {useEffect} from 'react'
import RectButton from '../Buttons/RectButton';
import { IoLogOut } from 'react-icons/io5';

const ProtectedRoute = ({children} : {children : React.ReactNode}) => {

    const {user, logout} = useAuth();
    const router = useRouter();

    useEffect(() => {
        !user ? router.push('/login') : ''
    },[router, user])

    const handleLogout = async () => {
        await logout()
    }

    return (
        <div className='flex flex-col justify-between w-full m-0 p-0'>
            {user ? (
                <>
                    <div className='flex items-center justify-between bg-slate-300 p-2 shadow-xl text-slate-700'>
                        <span>
                            Welcome <strong>{user?.displayName}</strong>
                        </span>
                        <RectButton variant='secondary' onCLick={handleLogout}>Sign out <IoLogOut/></RectButton>
                    </div>
                    <div className='p-5'>
                        {children}
                    </div>
                </>
            ) : null}
        </div>
    )
}

export default ProtectedRoute