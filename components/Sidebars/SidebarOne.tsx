import { IoAccessibility, IoApps, IoConstruct, IoMail, IoNotifications, IoPerson, IoStatsChart } from 'react-icons/io5'
import SidebarListItem from '../ListItems/SidebarListItem'
import DropdownListItem from '../ListItems/DropdownListItem'
import { HiLightningBolt, HiUsers } from 'react-icons/hi'

const SidebarOne = ({isSidebarOpen, isSidebarCompact, setIsSidebarOpen} : any) => {

    return (
        <aside className={`fixed top-[70px] z-40 ${isSidebarOpen ? 'left-0' : '-left-full -translate-x-full'} lg:sticky lg:translate-x-0 lg:left-0 ${isSidebarCompact? 'w-[70px]' : 'w-[250px]'} h-[calc(100vh-70px)] pt-3 transition-[width] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`} aria-label="Sidebar">
            <div className={`h-full ${isSidebarCompact? 'w-[70px]' : 'w-[250px]'} px-3 pb-4 overflow-y-auto overflow-x-hidden scrollbar-hide bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-[width]`}>
                <ul className="space-y-2 font-medium">
                    <SidebarListItem name='Dashboard' iconLeft={<IoApps/>} link='dashboard' compact={isSidebarCompact} onClick={() => setIsSidebarOpen(false)} pageHeader={{title: "Dashboard", sub: "Welcome to Nuba UI"}}/>
                    <SidebarListItem name='Reports' iconLeft={<IoStatsChart/>} link='reports' rightText='New' iconRight={<IoAccessibility/>} compact={isSidebarCompact} onClick={() => setIsSidebarOpen(false)} pageHeader={{title: "Reports", sub: "Statistics & Metrics"}}/>
                    <SidebarListItem name='Inbox' iconLeft={<IoMail/>} count={3} compact={isSidebarCompact} onClick={() => setIsSidebarOpen(false)}/>

                    <SidebarListItem name='Account' iconLeft={<IoPerson/>} compact={isSidebarCompact} dropdown>
                        <hr className="h-px bg-white border-0 dark:bg-gray-600"></hr>
                        <ul className={`bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg ${isSidebarCompact ? 'rounded-tl-none absolute z-10 min-w-[200px] shadow-xl' : 'rounded-t-none'} overflow-clip`}>
                            <DropdownListItem name='Username' onClick={() => setIsSidebarOpen(false)}/>
                            <DropdownListItem name='Password' onClick={() => setIsSidebarOpen(false)}/>
                            <DropdownListItem name='Profile' onClick={() => setIsSidebarOpen(false)} link='profile' pageHeader={{title: "Profile", sub: "User Profile Details"}}/>
                        </ul>
                    </SidebarListItem>

                    <SidebarListItem name='Settings' iconLeft={<IoConstruct/>} compact={isSidebarCompact}/>
                    <SidebarListItem name='Users' iconLeft={<HiUsers/>} compact={isSidebarCompact} link='users' onClick={() => setIsSidebarOpen(false)} pageHeader={{title: "Users", sub: "System Users Details"}}/>
                </ul>

                <hr className="h-px my-4 bg-white border-0 dark:bg-gray-700"></hr>

                <ul className="space-y-2 font-medium">
                    <SidebarListItem name='Energy' iconLeft={<HiLightningBolt/>} compact={isSidebarCompact} dropdown>
                        <hr className="h-px bg-white border-0 dark:bg-gray-600"></hr>
                        <ul className={`bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg ${isSidebarCompact ? 'rounded-tl-none absolute z-10 min-w-[200px] shadow-xl' : 'rounded-t-none'} overflow-clip`}>
                            <DropdownListItem name='Coffee' onClick={() => setIsSidebarOpen(false)}/>
                            <DropdownListItem name='Red Bull' onClick={() => setIsSidebarOpen(false)}/>
                            <DropdownListItem name='Vitamin' onClick={() => setIsSidebarOpen(false)} link='/'/>
                        </ul>
                    </SidebarListItem>
                    <SidebarListItem name='Notifications' iconLeft={<IoNotifications/>} compact={isSidebarCompact} link='/'/>
                </ul>
            </div>
        </aside>
    )
}

export default SidebarOne
