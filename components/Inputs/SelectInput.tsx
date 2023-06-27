import React, { SelectHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
    sz?: 'sm' | 'md' | 'lg' | 'xl' | null
    error?: FieldError
    cls?: string
    disabled?: boolean
    register: any
    placeholder?: string
    options: Array<any>
    children?: React.ReactNode
}

const SelectInput: React.FC<SelectInputProps> = ({children, sz, options, error, cls, disabled, register, placeholder, ...inputProps}) => {
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

    return (
        <>
            <select
                ref={register.ref}
                name={register.name}
                id={register.name}
                disabled={disabled}
                className={`${inputSize} ${cls} ${error ? 'text-destructive-400 border-destructive-400' : 'text-slate-800 dark:text-slate-200 border-slate-500'} ${disabled ? 'opacity-40 cursor-not-allowed' : 'opacity-100'} w-full px-3 border bg-white dark:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500/30 focus-within:border-primary-500`}
                {...inputProps}
                {...register}
            >
                {children}
                {options?.map((option, idx) => {
                    return (
                        <option key={idx} value={idx}>{option}</option>
                    )
                })}
            </select>
            {error && <span className='text-sm py-1 text-destructive-400'>{error?.message}</span>}
        </>
    )
}

export default SelectInput