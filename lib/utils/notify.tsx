import toast, { ToastPosition } from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';

export const notify = (type: string | null, text: string, icon?: any, position?: ToastPosition | null) => {
    switch(type) {
        case 'success':
            return getSuccessToast(text, position)
        case 'error':
            return getErrorToast(text, position)
        default:
            return getDefaultToast(text, icon, position)
    }
}

const getDefaultToast = (text: string, icon?: any, position?: ToastPosition | null) => {
    return toast((text), {
        duration: 3000,
        position: position || "top-right",
        className: 'toaster',
        style: {padding: 15},
        icon: icon,
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    })
}

const getSuccessToast = (text: string, position?: ToastPosition | null) => {
    return toast.success((text), {
        duration: 3000,
        position: position || "top-right",
        className: 'toaster',
        style: {padding: 15},
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    })
}

const getErrorToast = (text: string, position?: ToastPosition | null) => {
    return toast.error((text), {
        duration: 3000,
        position: position || "top-right",
        className: 'toaster',
        style: {padding: 15},
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    })
}

export const notifySuper = (title: string, text: string, icon?: any, position?: ToastPosition | null, closeable?: boolean, iconColor?: string) => {
    return toast((t) => (
        <span className='flex items-center gap-5'>
            {icon && (
                <span className={`${iconColor ? iconColor : 'text-primary-500'} text-2xl`}>
                    {icon}
                </span>
            )}
            <div className='flex flex-col px-3'>
                <h2 className='mb-3 dark:text-slate-200 font-semibold'>{title}</h2>
                <p className='dark:text-slate-400 text-sm'>{text}</p>
            </div>
            {closeable && (
                <button onClick={() => toast.dismiss(t.id)}>
                    <span className='bg-slate-500'>
                        <IoClose className='text-xl ml-5 text-gray-500 dark:text-slate-100'/>
                    </span>
                </button>
            )}
        </span>
    ), {
        position: position || "top-right",
        className: 'toaster',
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    });
}