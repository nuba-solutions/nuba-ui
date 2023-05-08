import { IoAccessibility, IoAmericanFootball, IoChevronDown, IoMail, IoPieChart } from 'react-icons/io5'
import SidebarListItem from '../ListItems/SidebarListItem'

const SidebarOne = ({isSidebarOpen} : any) => {

    return (
        <aside className={`fixed top-[70px] z-40 ${isSidebarOpen ? 'left-0' : '-left-full -translate-x-full'} lg:sticky lg:translate-x-0 lg:left-0 w-[250px] h-[calc(100vh-70px)] pt-3 transition-transform bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`} aria-label="Sidebar">
            <div className="h-full w-[250px] px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                <ul className="space-y-2 font-medium">
                    <SidebarListItem name='Dashboard' iconLeft={<IoPieChart/>} link='dashboard' iconRight={<IoChevronDown/>}/>
                    <SidebarListItem name='Reports' iconLeft={<IoAmericanFootball/>} rightText='New' iconRight={<IoAccessibility/>}/>
                    <SidebarListItem name='Inbox' iconLeft={<IoMail/>} count={3}/>
                </ul>
            </div>
        </aside>
    )
}

export default SidebarOne