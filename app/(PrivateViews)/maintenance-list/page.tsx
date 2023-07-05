"use client"

import RectButton from '@/components/Buttons/RectButton';
import { notify, notifyLoading } from '@/lib/utils/notify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';
import { IoTrashBin } from 'react-icons/io5';

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
    const handleDeleteMaintenance = async ({data}: any) => {
        await axios.delete('/api/maintenance', { params: { uid: data } }).then((response) => {
            console.log(response)
            return response
        })
    }
    const queryClient = useQueryClient()

    const maintenanceListQuery = useQuery({
        queryKey: ['maintenance'],
        queryFn: async () => await axios.get('/api/maintenance').then((res) => res.data)
    })

    const deleteUserMutation = useMutation({
        mutationFn: handleDeleteMaintenance,
        onSuccess: (_, {toastId}) => {
            queryClient.invalidateQueries(['maintenance'])
            notify('success', 'Maintenance deleted successfully!', null, null, toastId)
        },
        onError: (error, {toastId}) => {
            notify('error', 'Could not delete maintenance!', null, null, toastId)
        }
    })


    return (
        <div className='lg:p-5'>
            <div className='lg:hidden'>
                <h1 className='text-xl font-semibold mt-4 lg:mt-0'>Maintenance Requests</h1>
                <p className='text-slate-500 mb-4'>List of current ongoing maintenance.</p>
                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-slate-700"></hr>
            </div>

            {
                maintenanceListQuery.isLoading ? <p>Loading maintenance</p> : null
            }
            {
                maintenanceListQuery.isError ? <strong>Could not get maintenance requests</strong> : null
            }
            <ul className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5 gap-3'>
            {
                Array.isArray(maintenanceListQuery.data) ? maintenanceListQuery.data.map((maintenance: Maintenance, idx: number) => (
                    <li key={idx} className='bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-100 p-2 rounded-xl w-full flex flex-col shadow-xl'>
                        <img src={maintenance.imageUrl} alt="Maintenance image" className='rounded-lg w-full object-cover h-[300px]'/>
                        <div className='my-5 px-2'>
                            <div className='mb-2 w-full'>
                                <strong className='text-slate-400'>Tenant Name: </strong>
                                <p>{maintenance.authorName}</p>
                            </div>
                            <div className='mb-2 w-full'>
                                <strong className='text-slate-400'>Tenant Email: </strong>
                                <p>{maintenance.authorEmail}</p>
                            </div>
                            <div className='mb-2 w-full'>
                                <strong className='text-slate-400'>Created at: </strong>
                                <p>{maintenance.created.toString()}</p>
                            </div>
                            <div className='mb-2 w-full'>
                                <strong className='text-slate-400'>Description: </strong>
                                <p>{maintenance.description}</p>
                            </div>
                        </div>
                        <span
                            className='flex items-center justify-center bg-slate-700 text-destructive-400 py-3 px-4 rounded-md font-semibold w-full mt-auto cursor-pointer'
                            onClick={() => {
                                const toastId = notifyLoading('Deleting Maintenance')
                                deleteUserMutation.mutate({data: maintenance.uid, toastId})
                            }}>
                            <IoTrashBin className='mr-2'/>
                            Delete maintenance
                        </span>
                    </li>
                )) : ''
            }
            </ul>
        </div>
    )
}

export default MaintenanceList