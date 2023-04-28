import React from 'react'

interface LabelProps {
    name: string
    text: string,
}

const Label: React.FC<LabelProps> = ({name, text}) => {

    return (
        <label
            htmlFor={name}
            className={`text-slate-900 dark:text-slate-300 text-sm`}
        >
            {text}
        </label>
    )
}

export default Label