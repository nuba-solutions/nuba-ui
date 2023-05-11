import { usePageHeader } from '@/contexts/PageHeaderContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SetStateAction } from 'react'

interface DropdownListItemProps {
    onClick?: () => void | React.Dispatch<SetStateAction<boolean>>
    link?: string
    name: string
    pageHeader?: {title: string, sub: string}
}

const DropdownListItem: React.FC<DropdownListItemProps> = ({onClick, link, name, pageHeader}) => {
    const path = usePathname()
    const { setPageHeader } = usePageHeader()

    return (
        <li>
            {link ? (
                <Link
                    onClick={() => {
                        onClick;
                        pageHeader ? setPageHeader({title: pageHeader.title, sub: pageHeader.sub}) : ''
                    }}
                    href={link}
                    className={`select-none cursor-pointer flex items-center py-3 pl-8 hover:bg-gray-200 dark:hover:bg-gray-600  ${path === `/${link}` ? 'bg-primary-500/20 text-primary-500' : 'text-slate-500 dark:text-slate-300'}`}
                >
                    {name}
                </Link>
            ) : (
                <span
                    onClick={onClick}
                    className={`select-none cursor-pointer flex items-center py-3 pl-8 hover:bg-gray-200 dark:hover:bg-gray-600 text-slate-500 dark:text-slate-300`}
                >
                    {name}
                </span>
            )}
        </li>
    )
}

export default DropdownListItem