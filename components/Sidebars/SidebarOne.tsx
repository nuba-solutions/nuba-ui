import { IoAccessibility, IoAlarm, IoApps, IoCalendar, IoConstruct, IoMail, IoNotifications, IoPerson, IoStatsChart } from 'react-icons/io5'
import SidebarListItem from '../ListItems/SidebarListItem'
import DropdownListItem from '../ListItems/DropdownListItem'
import { HiLightningBolt, HiUsers } from 'react-icons/hi'

const SidebarOne = ({isSidebarOpen, isSidebarCompact, setIsSidebarOpen} : any) => {

    return (
        <aside className={`transition-all fixed top-[70px] z-40 ${isSidebarOpen ? 'left-0' : '-left-full -translate-x-full'} lg:sticky lg:translate-x-0 lg:left-0 ${isSidebarCompact? 'w-[70px]' : 'w-[250px]'} h-[calc(100vh-70px)] pt-3 transition-[width] bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-gray-700`} aria-label="Sidebar">
            <div className={`h-full ${isSidebarCompact? 'w-[70px]' : 'w-[250px]'} px-3 pb-4 overflow-y-auto overflow-x-hidden scrollbar-hide bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-gray-700 transition-[width]`}>
                <ul className="space-y-2 font-medium">
                    <SidebarListItem name='Dashboard' iconLeft={<IoApps/>} link='dashboard' compact={isSidebarCompact} setIsSidebarOpen={setIsSidebarOpen} pageHeader={{title: "Dashboard", sub: "Welcome to Nuba UI"}}/>
                    <SidebarListItem name='Reports' iconLeft={<IoStatsChart/>} link='reports' rightText='New' iconRight={<IoAccessibility/>} compact={isSidebarCompact} setIsSidebarOpen={setIsSidebarOpen} pageHeader={{title: "Reports", sub: "Statistics & Metrics"}}/>
                    <SidebarListItem name='Inbox' iconLeft={<IoMail/>} count={3} compact={isSidebarCompact} setIsSidebarOpen={setIsSidebarOpen}/>

                    <SidebarListItem name='Account' iconLeft={<IoPerson/>} compact={isSidebarCompact} dropdown>
                        <hr className={`${isSidebarCompact ? 'hidden' : 'visible'} h-px bg-white border-0 dark:bg-slate-600`}></hr>
                        <ul className={`bg-gray-100 dark:bg-slate-700 rounded-lg shadow-lg ${isSidebarCompact ? 'rounded-tl-none absolute z-10 min-w-[200px] shadow-xl' : 'rounded-t-none'} overflow-clip`}>
                            <DropdownListItem name='Username' setIsSidebarOpen={setIsSidebarOpen}/>
                            <DropdownListItem name='Password' setIsSidebarOpen={setIsSidebarOpen}/>
                            <DropdownListItem name='Profile' setIsSidebarOpen={setIsSidebarOpen} link='profile' pageHeader={{title: "Profile", sub: "User Profile Details"}}/>
                        </ul>
                    </SidebarListItem>

                    <SidebarListItem name='Settings' iconLeft={<IoConstruct/>} compact={isSidebarCompact}/>
                    <SidebarListItem name='Users' iconLeft={<HiUsers/>} compact={isSidebarCompact} link='users' setIsSidebarOpen={setIsSidebarOpen} pageHeader={{title: "Users", sub: "System Users Details"}}/>
                </ul>

                <hr className="h-px my-4 bg-gray-100 border-0 dark:bg-slate-700"></hr>
                <ul className="space-y-2 font-medium">
                    <SidebarListItem name='Energy' iconLeft={<HiLightningBolt/>} compact={isSidebarCompact} dropdown>
                        <hr className={`${isSidebarCompact ? 'hidden' : 'visible'} h-px bg-white border-0 dark:bg-slate-600`}></hr>
                        <ul className={`bg-gray-100 dark:bg-slate-700 rounded-lg shadow-lg ${isSidebarCompact ? 'rounded-tl-none absolute z-10 min-w-[200px] shadow-xl' : 'rounded-t-none'} overflow-clip`}>
                            <DropdownListItem name='Coffee' setIsSidebarOpen={setIsSidebarOpen}/>
                            <DropdownListItem name='Red Bull' setIsSidebarOpen={setIsSidebarOpen}/>
                            <DropdownListItem name='Vitamin' setIsSidebarOpen={setIsSidebarOpen}/>
                        </ul>
                    </SidebarListItem>
                    <SidebarListItem name='Notifications' iconLeft={<IoNotifications/>} compact={isSidebarCompact} />
                </ul>

                <hr className="h-px my-4 bg-gray-100 border-0 dark:bg-slate-700"></hr>
                <ul className="space-y-2 font-medium">
                    <SidebarListItem name='Schedule' iconLeft={<IoAlarm/>} compact={isSidebarCompact} />
                    <SidebarListItem name='Calendar' iconLeft={<IoCalendar/>} compact={isSidebarCompact} />
                </ul>
            </div>
        </aside>
    )
}

export default SidebarOne
