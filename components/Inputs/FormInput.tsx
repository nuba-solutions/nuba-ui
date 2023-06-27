import React, { InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    sz?: 'sm' | 'md' | 'lg' | 'xl' | null
    iconLeft?: React.ReactNode
    iconRight?: React.ReactNode
    error?: FieldError
    cls?: string
    disabled?: boolean
    register: any
    placeholder?: string
}

const FormInput: React.FC<FormInputProps> = ({sz, iconLeft, iconRight, error, cls, disabled, register, placeholder, ...inputProps}) => {
    let inputSize = '';
    switch (sz) {
        case 'sm':
            inputSize = 'h-8 text-sm'
            break
        case 'md':
            inputSize = 'h-12'
            break
        case 'lg':
            inputSize = 'h-14'
            break
        case 'xl':
            inputSize = 'h-16'
            break
        default:
            inputSize = 'h-12'
            break
    }

    if (iconLeft || iconRight) {
        return (
            <>
                <div className='relative w-full flex flex-row items-center'>
                    {iconLeft ?
                        <span className={`absolute mx-3 left-0 ${error ? 'text-destructive-400' : 'text-slate-500'} ${disabled ? 'opacity-40 cursor-not-allowed' : 'opacity-100'}`}>
                            {iconLeft}
                        </span> : ''
                    }
                    {iconRight ?
                        <span className={`absolute mx-3 right-0 ${error ? 'text-destructive-400' : 'text-slate-500'} ${disabled ? 'opacity-40 cursor-not-allowed' : 'opacity-100'}`}>
                            {iconRight}
                        </span> : ''
                    }
                    <input
                        ref={register.ref}
                        name={register.name}
                        id={register.name}
                        disabled={disabled}
                        placeholder={placeholder}
                        className={`${inputSize} ${cls} ${error ? 'text-destructive-400 border-destructive-400' : 'text-slate-800 dark:text-slate-200 border-slate-500'} ${disabled ? 'opacity-40 cursor-not-allowed' : 'opacity-100'} ${iconLeft ? 'pl-9' : ''} ${iconRight ? 'pr-9' : ''} w-full p-3 border bg-slate-50 dark:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500/30 focus-within:border-primary-500`}
                        {...inputProps}
                        {...register}
                    />
                </div>
                {error && <span className='text-sm py-1 text-destructive-400'>{error?.message}</span>}
            </>
        )
    }

    return (
        <>
            <input
                ref={register.ref}
                name={register.name}
                id={register.name}
                disabled={disabled}
                placeholder={placeholder}
                className={`${inputSize} ${cls} ${error ? 'text-destructive-400 border-destructive-400' : 'text-slate-800 dark:text-slate-200 border-slate-500'} ${disabled ? 'opacity-40 cursor-not-allowed' : 'opacity-100'} w-full px-3 border bg-white dark:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500/30 focus-within:border-primary-500`}
                {...inputProps}
                {...register}
            />
            {error && <span className='text-sm py-1 text-destructive-400'>{error?.message}</span>}
        </>
    )
}

export default FormInput