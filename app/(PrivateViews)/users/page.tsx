"use client"

import { useAuth } from '@/contexts/AuthContext'
import React from 'react'

const Users = () => {
    const {user} = useAuth()
    return (
        <div>Welcome {user?.displayName}</div>
    )
}

export default Users