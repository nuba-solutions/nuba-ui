import React, { SetStateAction } from 'react'
import { IoClose, IoPersonAdd } from 'react-icons/io5'

interface DrawerOneProps {
    isAddUserDrawerOpen: boolean
    setIsAddUserDrawerOpen: React.Dispatch<SetStateAction<boolean>>
    children: React.ReactNode
}

const DrawerOne: React.FC<DrawerOneProps> = ({isAddUserDrawerOpen, setIsAddUserDrawerOpen, children}) => {
    return (
        <>
        <div className={`${!isAddUserDrawerOpen? 'w-0 h-0 opacity-0' : 'w-full h-full opacity-100'} bg-gray-900/80 fixed top-0 left-0 z-50 transition-opacity ease-in delay-100`}></div>
        <div className={`fixed top-0 right-0 z-50 h-screen overflow-y-auto transition-[right] duration-200 ${!isAddUserDrawerOpen? 'right-[-100%]' : 'right-0'} min-w-[400px] bg-white w-80 dark:bg-slate-800 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]`}>
            <div className='flex justify-between items-center bg-slate-700 p-4 pt-[20px]'>
                <h5 className="inline-flex items-center text-base font-semibold text-slate-700 dark:text-slate-100">
                    <IoPersonAdd className='mr-3'/>
                    ADD NEW USER
                </h5>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-2 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setIsAddUserDrawerOpen(false)}
                    >
                    <IoClose className='text-lg'/>
                    <span className="sr-only">Close menu</span>
                </button>
            </div>
            <div className='p-4'>
                {children}
            </div>
        </div>
        </>
    )
}

export default DrawerOne