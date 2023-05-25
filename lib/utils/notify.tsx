import toast, { ToastPosition } from 'react-hot-toast';
import { IoClose, IoHourglass } from 'react-icons/io5';

export const notify = (type: string | null, text: string, icon?: any, position?: ToastPosition | null, id?: string | undefined) => {
    switch(type) {
        case 'success':
            return getSuccessToast(text, position, id)
        case 'error':
            return getErrorToast(text, position, id)
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

const getSuccessToast = (text: string, position?: ToastPosition | null, id?: string | undefined) => {
    return toast.success((text), {
        duration: 3000,
        position: position || "top-right",
        className: 'toaster',
        style: {padding: 15},
        id: id || undefined,
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    })
}

const getErrorToast = (text: string, position?: ToastPosition | null, id?: string | undefined) => {
    return toast.error((text), {
        duration: 3000,
        position: position || "top-right",
        className: 'toaster',
        style: {padding: 15},
        id: id || undefined,
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

export const notifyLoading = (text: string, position?: ToastPosition | null) => {
    return toast((
        <span className='flex items-center'>
            <div role="status">
                <svg aria-hidden="true" className="pl-0 ml-0 mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-slate-400 fill-primary-500 font-bold" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
            <p>{text}</p>
        </span>
    ), {
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

export const notifyDismiss = (id: string | undefined) => {
    return toast.dismiss(id)
}