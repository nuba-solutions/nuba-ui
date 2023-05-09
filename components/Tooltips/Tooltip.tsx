import React, { useState } from 'react'

interface TooltipProps {
    children: React.ReactNode
    content: string
    top?: boolean
    bottom?: boolean
    left?: boolean
    right?: boolean
}

const Tooltip: React.FC<TooltipProps> = ({children, content}) => {

    const [isTooltipVisible, setIsTooltipVisible] = useState(true)

    return (
        <div className='relative overflow-visible'>
            <div role="tooltip"
                className={`absolute z-10 -top-11 flex items-center justify-center mx-auto whitespace-nowrap ${isTooltipVisible ? 'opacity-1' : 'invisible opacity-0'} px-3 py-2 text-sm text-slate-100 bg-gray-900 rounded-lg shadow-3xl tooltip dark:bg-gray-900 transition-opacity delay-200 ease-in-out`}>
                {content}
                <div className="overflow-hidden inline-block absolute -bottom-[12px]">
                    <div className=" h-3 w-4 dark:bg-gray-900 -rotate-45 transform origin-top-left"></div>
                </div>
            </div>
            <div onMouseEnter={() => setIsTooltipVisible(true)} onMouseLeave={() => setIsTooltipVisible(false)}>
                {children}
            </div>
        </div>
    )
}

export default Tooltip


