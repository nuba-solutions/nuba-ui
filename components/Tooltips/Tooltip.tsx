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

    const [isTooltipVisible, setIsTooltipVisible] = useState(false)

    return (
        <span onMouseEnter={() => setIsTooltipVisible(true)} onMouseLeave={() => setIsTooltipVisible(false)}>
            <div className='relative'>
                <div className={`absolute z-50 -top-11 flex items-center justify-center mx-auto whitespace-nowrap ${isTooltipVisible ? 'opacity-1' : 'invisible opacity-0'} px-3 py-2 font-semibold text-sm text-slate-900 bg-primary-500 rounded-lg shadow-2xl dark:bg-primary-500 transition-opacity delay-200 ease-in-out`}>
                    {content}
                    <div className="overflow-hidden inline-block absolute -bottom-[12px]">
                        <div className=" h-3 w-4 dark:bg-primary-500 -rotate-45 transform origin-top-left shadow-2xl"></div>
                    </div>
                </div>
            </div>
            {children}
        </span>
    )
}

export default Tooltip


