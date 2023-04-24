import React from 'react'

interface InputGroupProps {
    inline?: boolean,
    classes?: string
    full?: boolean;
    center?: boolean,
    right?: boolean,
    left?: boolean,
    children: React.ReactNode
}

const InputGroup: React.FC<InputGroupProps> = ({inline, classes, full, center, right, left, children}) => {
    return (
        <div
            className={`flex ${classes} ${inline ? 'flex-row items-center gap-x-2' : 'flex-col items-start gap-y-1'} ${full ? 'w-full' : 'w-fit'} ${center ? 'mx-auto' : ''} ${right ? 'ml-auto' : ''} ${left ? 'mr-auto' : ''}`}
        >
            {children}
        </div>
    )
}

export default InputGroup