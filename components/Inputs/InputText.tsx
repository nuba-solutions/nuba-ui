import React, { InputHTMLAttributes, ReactEventHandler, Ref, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    placeholder?: string,
    iconLeft?: React.ReactNode,
    iconRight?: React.ReactNode,
    classes?: string,
    sz?: string,
    hasError?: boolean,
    errorMessage?: string
    type: string,
    onChange?: ReactEventHandler,
    onBlur?: ReactEventHandler,
    disabled?: boolean
}

const InputText: React.FC<InputProps> = ({name, placeholder, classes, sz, iconLeft, iconRight, hasError, errorMessage, type, onChange, onBlur, disabled}) => {
    switch (sz) {
        case 'sm':
            sz = 'h-8 text-sm'
            break
        case 'md':
            sz = 'h-12'
            break
        case 'lg':
            sz = 'h-14'
            break
        case 'xl':
            sz = 'h-16'
            break
        default:
            sz = 'h-12'
            break
    }

    if (iconLeft || iconRight) {
        return (
            <>
                <div className='relative w-full flex flex-row items-center'>
                    {iconLeft ?
                        <span className={`absolute mx-3 left-0 ${hasError ? 'text-destructive-400' : 'text-slate-500'} ${disabled ? 'opacity-40 cursor-not-allowed' : 'opacity-100'}`}>
                            {iconLeft}
                        </span> : ''
                    }
                    {iconRight ?
                        <span className={`absolute mx-3 right-0 ${hasError ? 'text-destructive-400' : 'text-slate-500'} ${disabled ? 'opacity-40 cursor-not-allowed' : 'opacity-100'}`}>
                            {iconRight}
                        </span> : ''
                    }
                    <input
                        disabled={disabled}
                        onChange={onChange}
                        onBlur={onBlur}
                        type={type}
                        id={name}
                        className={`${sz} ${classes} ${hasError ? 'text-destructive-400 border-destructive-400' : 'text-slate-800 dark:text-slate-200 border-slate-500'} ${disabled ? 'opacity-40 cursor-not-allowed' : 'opacity-100'} w-full pl-9 border bg-slate-50 dark:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500/30 focus-within:border-primary-500`}
                        placeholder={placeholder}
                    />
                </div>
                {hasError && <span className='text-xs py-1 text-destructive-400'>{errorMessage}</span>}
            </>
        )
    }

    return (
        <>
            <input
                disabled={disabled}
                onChange={onChange}
                onBlur={onBlur}
                type={type}
                id={name}
                className={`${sz} ${classes} ${hasError ? 'text-destructive-400 border-destructive-400' : 'text-slate-800 dark:text-slate-200 border-slate-500'} ${disabled ? 'opacity-40 cursor-not-allowed' : 'opacity-100'} w-full px-3 border bg-white dark:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500/30 focus-within:border-primary-500`}
                placeholder={placeholder}
            />
            {hasError && <span className='text-xs py-1 text-destructive-400'>{errorMessage}</span>}
        </>
    )
}

export default InputText