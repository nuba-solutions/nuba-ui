import { IoAccessibility, IoApps, IoChevronDown, IoConstruct, IoMail, IoPerson, IoStatsChart } from 'react-icons/io5'
import SidebarListItem from '../ListItems/SidebarListItem'
import DropdownListItem from '../ListItems/DropdownListItem'

const SidebarOne = ({isSidebarOpen, isSidebarCompact} : any) => {

    return (
        <aside className={`fixed top-[70px] z-40 ${isSidebarOpen ? 'left-0' : '-left-full -translate-x-full'} lg:sticky lg:translate-x-0 lg:left-0 ${isSidebarCompact? 'w-[70px]' : 'w-[250px]'} h-[calc(100vh-70px)] pt-3 transition-[width] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`} aria-label="Sidebar">
            <div className={`h-full ${isSidebarCompact? 'w-[70px]' : 'w-[250px]'} px-3 pb-4 overflow-y-auto overflow-x-hidden scrollbar-hide bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-[width]`}>
                <ul className="space-y-2 font-medium">
                    <SidebarListItem name='Dashboard' iconLeft={<IoApps/>} link='dashboard' compact={isSidebarCompact}/>
                    <SidebarListItem name='Reports' iconLeft={<IoStatsChart/>} rightText='New' iconRight={<IoAccessibility/>} compact={isSidebarCompact}/>
                    <SidebarListItem name='Inbox' iconLeft={<IoMail/>} count={3} compact={isSidebarCompact}/>

                    <SidebarListItem name='Account' iconLeft={<IoPerson/>} compact={isSidebarCompact} dropdown>
                        <DropdownListItem name='Username'/>
                        <DropdownListItem name='Password'/>
                        <DropdownListItem name='Profile Picture'/>
                    </SidebarListItem>
                    <SidebarListItem name='Settings' iconLeft={<IoConstruct/>} compact={isSidebarCompact}/>
                </ul>
            </div>
        </aside>
    )
}

export default SidebarOne
