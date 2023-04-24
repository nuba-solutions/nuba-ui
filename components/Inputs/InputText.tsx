import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    placeholder?: string,
    iconLeft?: React.ReactNode,
    iconRight?: React.ReactNode,
    classes?: string
    sz?: string
}

const InputText: React.FC<InputProps> = ({name, placeholder, classes, sz, iconLeft, iconRight}) => {
    switch (sz) {
        case 'sm':
            sz = 'h-8 text-sm'
            break
        case 'md':
            sz = 'h-10'
            break
        case 'lg':
            sz = 'h-12'
            break
        case 'xl':
            sz = 'h-16'
            break
        default:
            sz = 'h-10'
            break
    }


    if (iconLeft) {
        return (
            <div className='relative w-full flex flex-row items-center'>
                <span className='absolute mx-3 left-0'>
                    {iconLeft}
                </span>
                <input
                    id={name}
                    className={`w-full pl-9 ${sz} ${classes}`}
                    placeholder={placeholder}
                />
            </div>
        )
    }

    if (iconRight) {
        return (
            <div className='relative w-full flex flex-row items-center'>
                <span className='absolute mx-3 right-0'>
                    {iconRight}
                </span>
                <input
                    id={name}
                    className={`w-full pl-3 pr-9 ${sz} ${classes}`}
                    placeholder={placeholder}
                />
            </div>
        )
    }

    return (
        <input
            id={name}
            className={`w-full px-3 ${sz} ${classes}`}
            placeholder={placeholder}
        />
    )
}

export default InputText