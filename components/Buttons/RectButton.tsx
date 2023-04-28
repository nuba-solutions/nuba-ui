import React, { ButtonHTMLAttributes } from 'react';
import Link from 'next/link'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    visual?: string;
    variant?: string;
    children?: React.ReactNode;
    link?: string;
    onCLick?: (e: any) => void;
    classes?: string
    full?: boolean;
    center?: boolean,
    right?: boolean,
    left?: boolean,
    sz?: string,
    disabled?: boolean
}

const RectButton: React.FC<ButtonProps> = ({visual, variant, link, children, classes, full, center, right, left, sz, disabled, onCLick }) => {
    let tp: string

    switch(variant) {
        case 'primary':
            switch(visual) {
                case 'fill':
                    tp = 'bg-primary-500 hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-900/50 dark:hover:shadow-slate-950 text-white focus:outline-primary-500/50'
                    break
                case 'outline':
                    tp = 'bg-transparent border-solid border-[1px] border-primary-500 hover:border-primary-600 hover:shadow-lg hover:shadow-primary-900/20 dark:hover:shadow-slate-950 text-primary-500 focus:outline-primary-500/50'
                    break
                default:
                    tp = 'text-primary-500 hover:text-primary-600 focus:outline-primary-500/50'
                    break
            }
        break

        case 'secondary':
            switch(visual) {
                case 'fill':
                    tp = 'bg-secondary-500 hover:bg-secondary-600 hover:shadow-lg hover:shadow-secondary-900/50 dark:hover:shadow-slate-950 text-white focus:outline-secondary-500/50'
                    break
                case 'outline':
                    tp = 'bg-transparent border-solid border-[1px] border-secondary-500 hover:border-secondary-600 hover:shadow-lg hover:shadow-secondary-900/20 dark:hover:shadow-slate-950 text-secondary-500 focus:outline-secondary-500/50'
                    break
                default:
                    tp = 'text-secondary-500 hover:text-secondary-600 focus:outline-secondary-500/50'
                    break
            }
        break

        case 'destructive':
            switch(visual) {
                case 'fill':
                    tp = 'bg-destructive-500 hover:bg-destructive-600 hover:shadow-lg hover:shadow-destructive-900/30 dark:hover:shadow-slate-950 text-white focus:outline-destructive-500/50'
                    break
                case 'outline':
                    tp = 'bg-transparent border-solid border-[1px] border-destructive-500 hover:border-destructive-600 hover:shadow-lg hover:shadow-destructive-900/20 dark:hover:shadow-slate-950 text-destructive-500 focus:outline-destructive-500/50'
                    break
                default:
                    tp = 'text-destructive-500 hover:text-destructive-600 focus:outline-destructive-500/50'
                    break
            }
        break

        case 'warning':
            switch(visual) {
                case 'fill':
                    tp = 'bg-warning-500 hover:bg-warning-400 hover:shadow-lg hover:shadow-warning-700/30 dark:hover:shadow-slate-950 text-black focus:outline-warning-500/50'
                    break
                case 'outline':
                    tp = 'bg-transparent border-solid border-[1px] border-warning-500 hover:border-warning-400 hover:shadow-lg hover:shadow-warning-900/20 dark:hover:shadow-slate-950 text-warning-500 focus:outline-warning-500/50'
                    break
                default:
                    tp = 'text-warning-500 hover:text-warning-600 focus:outline-warning-500/50'
                    break
            }
        break

        case 'success':
            switch(visual) {
                case 'fill':
                    tp = 'bg-success-500 hover:bg-success-600 hover:shadow-lg hover:shadow-success-900/30 dark:hover:shadow-slate-950 text-white focus:outline-success-500/50'
                    break
                case 'outline':
                    tp = 'bg-transparent border-solid border-[1px] border-success-500 hover:border-success-600 hover:shadow-lg hover:shadow-success-900/20 dark:hover:shadow-slate-950 text-success-500 focus:outline-success-500/50'
                    break
                default:
                    tp = 'text-success-500 hover:text-success-600 focus:outline-success-500/50'
                    break
            }
        break

        case 'info':
            switch(visual) {
                case 'fill':
                    tp = 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-900/30 dark:hover:shadow-slate-950 text-white focus:outline-blue-500/50'
                    break
                case 'outline':
                    tp = 'bg-transparent border-solid border-[1px] border-blue-500 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-900/20 dark:hover:shadow-slate-950 text-blue-500 hover:text-blue-600 focus:outline-blue-500/50'
                    break
                default:
                    tp = 'text-blue-500 hover:text-blue-600 focus:outline-blue-500/50'
                    break
            }
        break

        case 'light':
            switch(visual) {
                case 'fill':
                    tp = 'bg-slate-50 hover:bg-slate-100 hover:shadow-lg hover:shadow-slate-900/30 dark:hover:shadow-slate-950 text-slate-900 focus:outline-slate-100/50'
                    break
                case 'outline':
                    tp = 'bg-transparent border-solid border-[1px] border-slate-50 hover:border-slate-100 hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-slate-950 text-slate-50 hover:text-slate-100 focus:outline-slate-100/50'
                    break
                default:
                    tp = 'text-slate-50 hover:text-slate-100 focus:outline-slate-100/50'
                    break
            }
        break

        default:
            switch(visual) {
                case 'fill':
                    tp = 'bg-gray-800 hover:bg-gray-900 hover:shadow-lg hover:shadow-slate-900/30 dark:hover:shadow-slate-950 text-gray-100 focus:outline-gray-800/50 dark:bg-gray-200 dark:hover:bg-gray-300 dark:text-gray-800 focus:outline-gray-200/50'
                    break
                case 'outline':
                    tp = 'bg-transparent border-solid border-[1px] border-gray-800 hover:border-gray-900 hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-slate-950 text-gray-800 hover:text-gray-900 focus:outline-gray-800/50 dark:border-gray-200 dark:hover:border-gray-300 dark:text-gray-200 dark:hover:text-gray-300 focus:outline-gray-200/50'
                    break
                default:
                    tp = 'text-gray-800 hover:text-gray-900 focus:outline-gray-800/50 dark:text-gray-200 dark:hover:text-gray-300 focus:outline-gray-200/60'
                    break
            }
        break
    }

    switch(sz) {
        case 'sm':
            sz = 'h-8 px-3 text-sm'
            break
        case 'md':
            sz = 'h-12 px-8'
            break
        case 'lg':
            sz = 'h-14 px-8'
            break
        case 'xl':
            sz = 'h-16 px-8 text-xl'
            break
        default:
            sz = 'h-12 px-5'
            break
    }

    if (link) {
        return (
            <Link
                href={link}
                className={`flex items-center gap-2 justify-center focus-visible:outline focus-visible:outline-4 ${classes} ${sz} ${tp} ${full ? 'w-full' : 'w-fit'} ${center ? 'mx-auto' : ''} ${right ? 'ml-auto' : ''} ${left ? 'mr-auto' : ''} ${disabled ? 'opacity-50 pointer-events-none select-none' : ''}`}
            >
                {children}
            </Link>
        )
    } else {
        return (
            <button
                onClick={onCLick}
                disabled={disabled}
                className={`flex items-center gap-2 justify-center focus-visible:outline focus-visible:outline-4 ${classes} ${sz} ${tp} ${full ? 'w-full' : 'w-fit'} ${center ? 'mx-auto' : ''} ${right ? 'ml-auto' : ''} ${left ? 'mr-auto' : ''} ${disabled ? 'opacity-50 pointer-events-none select-none' : ''}`}
            >
                {children}
            </button>
        )
    }
}

export default RectButton