"use client"

import RectButton from '@/components/Buttons/RectButton'
import { notify, notifySuper, notifyLoading, notifyDismiss } from '@/lib/utils/notify';
import { IoAccessibility, IoAirplane, IoAlarm } from 'react-icons/io5';

const Toasts = () => {

    const getDummyData = async () => {
        const toastId = notifyLoading('Getting data from server')
        setTimeout(async () => {
            try {
                notify('success', 'Data acquired successfully!', null, null, toastId)
            } catch (error) {
                notify('error', 'Something went wrong!', null, null, toastId)
            }
        }, 3000);
    }

    return (
        <div className='flex flex-col md:flex-row md:gap-2'>
            <RectButton variant='primary' visual='fill' classes='w-full lg:w-fit rounded mb-5 font-semibold' onCLick={() => notify(null, "This is a toast message", <IoAccessibility/>)}>
                Base Toast
            </RectButton>

            <RectButton variant='success' visual='fill' classes='w-full lg:w-fit rounded mb-5 font-semibold' onCLick={() => notify('success', "This is a success message")}>
                Success Toast
            </RectButton>

            <RectButton variant='destructive' visual='fill' classes='w-full lg:w-fit rounded mb-5 font-semibold' onCLick={() => notify("error", "This is an error message", null, null)}>
                Error Toast
            </RectButton>

            <RectButton variant='warning' visual='fill' classes='w-full lg:w-fit rounded mb-5 font-semibold' onCLick={() => notifySuper("Welcome", "This is a welcoming message", <IoAlarm/>, null, true)}>
                Super Toast Closeable
            </RectButton>

            <RectButton visual='fill' classes='w-full lg:w-fit rounded mb-5 font-semibold' onCLick={() => notifySuper('Welcome', 'This is a body text', <IoAirplane/>, null, false, 'text-warning-500')}>
                Super Toast
            </RectButton>

            <RectButton variant='info' visual='fill' classes='w-full lg:w-fit rounded mb-5 font-semibold' onCLick={() => getDummyData()}>
                Promise Toast
            </RectButton>
        </div>
    )
}

export default Toasts