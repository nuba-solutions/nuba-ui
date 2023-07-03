"use client"

import React, { useEffect, useState } from 'react'
import { storage } from '@/config/firebase'
import { ref, listAll, getDownloadURL } from 'firebase/storage'

const MaintenanceList = () => {

    const [maintenanceList, setMaintenanceList] = useState<any>([])
    const maintenanceImagePathRef = ref(storage, `maintenance/images/`)

    useEffect(() => {
        let isEmpty = true
        if (isEmpty) {
            listAll(maintenanceImagePathRef).then((res) => {
                res.items.forEach((item) => {
                    console.log(item)
                    getDownloadURL(item).then((url) => {
                        setMaintenanceList((prev: any) => [...prev, url])
                    })
                })
            })
        }
        return () => {
            isEmpty = false
        }
    }, [])

    return (
        <div>
            <h1 className='text-xl mb-3 font-semibold'>List of current ongoing maintenance</h1>
            {
                maintenanceList && (
                    <div className='flex flex-wrap gap-2'>
                        {
                            maintenanceList.map((url: string, idx: number) => (
                                <img src={url} alt="" key={idx} className='w-fit max-h-[500px] aspect-square object-cover'/>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default MaintenanceList