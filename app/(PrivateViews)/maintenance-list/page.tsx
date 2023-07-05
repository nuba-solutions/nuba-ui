"use client"

import { useQuery } from '@tanstack/react-query'
import axios from 'axios';

interface Maintenance {
    uid: string
    description: string
    created: Date
    imageUrl: string
    authorName: string
    authorEmail: string
    authorId: string
}

const MaintenanceList = () => {

    const maintenanceListQuery = useQuery({
        queryKey: ['maintenance'],
        queryFn: async () => await axios.get('/api/maintenance').then((res) => res.data)
    })

    return (
        <div className='lg:p-5'>
            <div className='lg:hidden'>
                <h1 className='text-xl font-semibold mt-4 lg:mt-0'>Maintenance Requests</h1>
                <p className='text-slate-500 mb-4'>List of current ongoing maintenance.</p>
                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-slate-700"></hr>
            </div>

            {
                maintenanceListQuery.isLoading ? <p>Loading users</p> : null
            }
            {
                maintenanceListQuery.isError ? <strong>Could not get users</strong> : null
            }
            <ul className='flex flex-wrap gap-3'>
            {
                Array.isArray(maintenanceListQuery.data) ? maintenanceListQuery.data.map((maintenance: Maintenance, idx: number) => (
                    <li key={idx} className='bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-100 p-2 rounded-xl w-full lg:w-[400px] flex flex-col shadow-xl'>
                        <img src={maintenance.imageUrl} alt="Maintenance image" className='rounded-lg'/>
                        <div className='mt-5 px-2'>
                            <div className='mb-2 w-full'>
                                <strong className='text-sm'>Tenant Name: </strong>
                                <p>{maintenance.authorName}</p>
                            </div>
                            <div className='mb-2 w-full'>
                                <strong className='text-sm'>Tenant Email: </strong>
                                <p>{maintenance.authorEmail}</p>
                            </div>
                            <div className='mb-2 w-full'>
                                <strong className='text-sm'>Description: </strong>
                                <p>{maintenance.description}</p>
                            </div>
                            <div className='mb-2 w-full'>
                                <strong className='text-sm'>Created at: </strong>
                                <p>{maintenance.created.toString()}</p>
                            </div>
                        </div>
                    </li>
                )) : ''
            }
            </ul>
        </div>
    )
}

export default MaintenanceList