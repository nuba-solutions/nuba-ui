import React from 'react';
import Link from 'next/link'

interface Props {
    type?: string;
    variant?: string;
    children?: React.ReactNode;
    link?: string;
    onClick?: () => void;
    classes?: string
    full?: boolean;
    center?: boolean,
    right?: boolean,
    left?: boolean,
    size?: string,
    disabled?: boolean
}

const RectButton: React.FC<Props> = ({type, variant, link, children, classes, full, center, right, left, size, disabled }) => {
    let tp: string, sz: string;

    switch(type) {
        case 'primary':
            switch(variant) {
                case 'fill':
                    tp = 'bg-primary-500 hover:bg-primary-600 text-white'
                    break
                case 'outline':
                    tp = 'bg-transparent border-solid border-[1px] border-primary-500 hover:border-primary-600 text-primary-500'
                    break
                default:
                    tp = 'text-primary-500 hover:text-primary-600'
                    break
            }
        break

        case 'secondary':
            switch(variant) {
                case 'fill':
                    tp = 'bg-secondary-500 hover:bg-secondary-600 text-white'
                    break
                case 'outline':
                    tp = 'bg-transparent border-solid border-[1px] border-secondary-500 hover:border-secondary-600 text-secondary-500'
                    break
                default:
                    tp = 'text-secondary-500 hover:text-secondary-600'
                    break
            }
        break

        case 'destructive':
            switch(variant) {
                case 'fill':
                    tp = 'bg-destructive-500 hover:bg-destructive-600 text-white'
                    break
                case 'outline':
                    tp = 'bg-transparent border-solid border-[1px] border-destructive-500 hover:border-destructive-600 text-destructive-500'
                    break
                default:
                    tp = 'text-destructive-500 hover:text-destructive-600'
                    break
            }
        break

        case 'warning':
            switch(variant) {
                case 'fill':
                    tp = 'bg-warning-500 hover:bg-warning-600 text-black'
                    break
                case 'outline':
                    tp = 'bg-transparent border-solid border-[1px] border-warning-500 hover:border-warning-600 text-warning-500'
                    break
                default:
                    tp = 'text-warning-500 hover:text-warning-600'
                    break
            }
        break

        case 'success':
            switch(variant) {
                case 'fill':
                    tp = 'bg-success-500 hover:bg-success-600 text-white'
                    break
                case 'outline':
                    tp = 'bg-transparent border-solid border-[1px] border-success-500 hover:border-success-600 text-success-500'
                    break
                default:
                    tp = 'text-success-500 hover:text-success-600'
                    break
            }
        break

        case 'info':
            switch(variant) {
                case 'fill':
                    tp = 'bg-blue-500 hover:bg-blue-600 text-white'
                    break
                case 'outline':
                    tp = 'bg-transparent border-solid border-[1px] border-blue-500 hover:border-blue-600 text-blue-500 hover:text-blue-600'
                    break
                default:
                    tp = 'text-blue-500 hover:text-blue-600'
                    break
            }
        break

        default:
            switch(variant) {
                case 'fill':
                    tp = 'bg-gray-800 hover:bg-gray-900 text-gray-100 dark:bg-gray-200 dark:hover:bg-gray-300 dark:text-gray-800'
                    break
                case 'outline':
                    tp = 'bg-transparent border-solid border-[1px] border-gray-800 hover:border-gray-900 text-gray-800 hover:text-gray-900 dark:border-gray-200 dark:hover:border-gray-300 dark:text-gray-200 dark:hover:text-gray-300'
                    break
                default:
                    tp = 'text-gray-800 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-300'
                    break
            }
        break
    }

    switch(size) {
        case 'sm':
            sz = 'py-1 px-3 text-sm'
            break
        case 'lg':
            sz = 'py-3 px-8'
            break
        default:
            sz = 'py-2 px-5'
            break
    }


    if (link) {
        return (
            <Link
                href={link}
                className={`
                    flex items-center gap-2 justify-center
                    ${classes}
                    ${sz}
                    ${tp}
                    ${full ? 'w-full' : 'w-fit'}
                    ${center ? 'mx-auto' : ''}
                    ${right ? 'ml-auto' : ''}
                    ${left ? 'mr-auto' : ''}
                    ${disabled ? 'opacity-50 pointer-events-none select-none' : 'opacity-100'}
                `}>
                {children}
            </Link>
        )
    } else {
        return (
            <button
                disabled={disabled}
                className={`
                    flex items-center gap-2 justify-center
                    ${classes}
                    ${sz}
                    ${tp}
                    ${full ? 'w-full' : 'w-fit'}
                    ${center ? 'mx-auto' : ''}
                    ${right ? 'ml-auto' : ''}
                    ${left ? 'mr-auto' : ''}
                    ${disabled ? 'opacity-50 pointer-events-none select-none' : 'opacity-100'}
                `}>
                {children}
            </button>
        )
    }
}

export default RectButton