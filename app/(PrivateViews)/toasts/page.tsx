"use client"

import RectButton from '@/components/Buttons/RectButton'
import { notify, notifySuper } from '@/lib/utils/notify';
import { IoAccessibility, IoAirplane, IoAlarm } from 'react-icons/io5';

const Toasts = () => {
    return (
        <div className='flex flex-col md:flex-row md:gap-2'>
            <RectButton variant='primary' sz='sm' visual='fill' classes='w-full lg:w-fit rounded mb-5 font-semibold' onCLick={() => notify(null, "This is a toast message", <IoAccessibility/>)}>
                Base Toast
            </RectButton>

            <RectButton variant='success' sz='sm' visual='fill' classes='w-full lg:w-fit rounded mb-5 font-semibold' onCLick={() => notify('success', "This is a success message")}>
                Success Toast
            </RectButton>

            <RectButton variant='destructive' sz='sm' visual='fill' classes='w-full lg:w-fit rounded mb-5 font-semibold' onCLick={() => notify("error", "Error", null, null)}>
                Error Toast
            </RectButton>

            <RectButton variant='warning' sz='sm' visual='fill' classes='w-full lg:w-fit rounded mb-5 font-semibold' onCLick={() => notifySuper("Welcome", "This is a welcoming message", <IoAlarm/>, null, true)}>
                Super Toast Closeable
            </RectButton>

            <RectButton visual='fill' sz='sm' classes='w-full lg:w-fit rounded mb-5 font-semibold' onCLick={() => notifySuper('Welcome', 'This is a body text', <IoAirplane/>, null, false, 'text-warning-500')}>
                Super Toast
            </RectButton>
        </div>
    )
}

export default Toasts