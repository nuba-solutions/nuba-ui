import React from 'react'

interface SwitcherOneProps {
    onChange?: () => void,
    checked?: boolean,
    label: string,
    sz?: string
}

const SwitcherOne: React.FC<SwitcherOneProps> = ({onChange, checked, label, sz}) => {
    let sizeClass: string;

    switch (sz) {
        case 'sm':
            sizeClass = 'w-9 h-5 after:absolute after:top-[4px] after:left-[2px] after:h-4 after:w-4'
            break;
        case 'lg':
            sizeClass = 'w-14 h-7 after:absolute after:top-0.5 after:left-[5px] after:h-6 after:w-6'
            break;
        default:
            sizeClass = 'w-11 h-6 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5'
            break;
    }

    return (
        <label className="relative inline-flex items-center cursor-pointer" onChange={onChange}>
            <input type="checkbox" checked={checked} className="sr-only peer"/>
            <div className={`${sizeClass} bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all dark:border-gray-800 peer-checked:bg-primary-500`}></div>
            <span className="ml-3 md:text-base">{label}</span>
        </label>
    )
}

export default SwitcherOne