"use client"

import RectButton from '@/components/Buttons/RectButton';
import DrawerOne from '@/components/Drawers/DrawerOne';
import InputGroup from '@/components/Inputs/InputGroup';
import InputText from '@/components/Inputs/InputText';
import Label from '@/components/Inputs/Label';
import LoaderOne from '@/components/Loaders/LoaderOne';
import { storage } from '@/config/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { notify, notifyLoading } from '@/lib/utils/notify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosRequestConfig } from 'axios';
import { format, parseISO } from 'date-fns'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';
import { IoCamera, IoCheckmarkCircle, IoCloseCircle, IoCreate, IoTrashBin } from 'react-icons/io5';
import { v4 } from 'uuid';

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
    const [isUpdateMaintenanceDrawerOpen, setIsUpdateMaintenanceDrawerOpen] = useState(false)
    const [maintenanceData, setMaintenanceData] = useState<Maintenance>()

    const {user} = useAuth()
    const [authenticatedUser, setAuthenticatedUser] = useState({displayName: '', email: '', uid: ''})
    const [isLoading, setIsLoading] = useState(false)

    const [isRemovePhotoButtonVisible, setIsRemovePhotoButtonVisible] = useState(true)
    const [isTakePhotoButtonVisible, setIsTakePhotoButtonVisible] = useState(false)
    const [isUpdateMaintenanceButtonVisible, setIsUpdateMaintenanceButtonVisible] = useState(true)
    const [isUpdateMaintenanceButtonDisabled, setIsUpdateMaintenanceButtonDisabled] = useState(false)

    const [isOverlayVisible, setIsOverlayVisible] = useState(false)

    const [maintenanceImage, setMaintenanceImage] = useState<any>(null)

    const imageRef = useRef<any>()
    const imageInputRef = useRef<any>()

    const handleRemovePhoto = () => {
        setIsUpdateMaintenanceButtonVisible(false)
        setIsUpdateMaintenanceButtonDisabled(true)
        setIsTakePhotoButtonVisible(true)
        setIsRemovePhotoButtonVisible(false)
        setMaintenanceImage(null)
        imageRef.current.src = ''
        imageInputRef.current.value = ''
    }

    useEffect(() => {
        let isUserAuth = false;
        if (!isUserAuth) {
            setAuthenticatedUser(user)
        }
        return () => {
            isUserAuth = true
        }
    }, [user])

    const handleTakePhoto = () => {
        if (imageInputRef.current) {
            imageInputRef.current.click()

            imageInputRef.current.addEventListener('change', () => {
                if (!imageInputRef.current.files) return

                setMaintenanceImage(imageInputRef.current.files[0])
                imageRef.current.src = window.URL.createObjectURL(imageInputRef.current.files[0])
                setIsTakePhotoButtonVisible(false)
                setIsRemovePhotoButtonVisible(true)
                if (maintenanceData?.description !== '') setIsUpdateMaintenanceButtonDisabled(false)
                setIsUpdateMaintenanceButtonVisible(true)
            })
        }
    }

    const handleSubmitPhoto: any = async () => {
        setIsOverlayVisible(true)
        setIsLoading(true)

        const maintenanceImageRef = ref(storage, `maintenance/images/${maintenanceImage.name + v4()}`)
        let res = await uploadBytes(maintenanceImageRef, maintenanceImage)
        let snapShot = await getDownloadURL(res.ref)

        return snapShot;
    }

    const resetMaintenanceCreateStates = () => {
        setIsUpdateMaintenanceButtonVisible(true)
        setIsUpdateMaintenanceButtonDisabled(false)
        setIsTakePhotoButtonVisible(false)
        setIsRemovePhotoButtonVisible(true)
        setIsOverlayVisible(false)
        setIsLoading(false)
        setMaintenanceImage(null)
    }

    const handleDeleteMaintenance = async ({data}: any) => {
        await axios.delete('/api/maintenance', { params: { uid: data } }).then((response) => {
            return response
        })
    }

    const handleUpdateMaintenanceRequest = async ({data, toastId} : any) => {
        let imageURL = !maintenanceImage ? data.imageUrl : await handleSubmitPhoto()

        let updatedData : Maintenance = {
            uid: data.uid,
            description: data.description,
            created: new Date(),
            imageUrl: imageURL,
            authorName: authenticatedUser.displayName,
            authorEmail: authenticatedUser.email,
            authorId: authenticatedUser.uid
        }

        await axios.put('/api/maintenance', updatedData).then((response) => {
            if (response.status === 200) notify('success', 'Maintenance Updated Successfully', null, null, toastId)
        }).catch((err) => {
            console.error(err)
            notify('error', 'Something Went Wrong!', null, null, toastId)
        })

        resetMaintenanceCreateStates()
        setIsUpdateMaintenanceDrawerOpen(false)
    }

    const queryClient = useQueryClient()

    const maintenanceListQuery = useQuery({
        queryKey: ['maintenance'],
        queryFn: async () => await axios.get('/api/maintenance', { params: { userId: user.uid } }).then((res) => res.data)
    })

    const deleteMaintenanceMutation = useMutation({
        mutationFn: handleDeleteMaintenance,
        onSuccess: (_, {toastId}) => {
            queryClient.invalidateQueries(['maintenance'])
            notify('success', 'Maintenance deleted successfully!', null, null, toastId)
        },
        onError: (err, {toastId}) => {
            console.error(err)
            notify('error', 'Could not delete maintenance!', null, null, toastId)
        }
    })

    const updateMaintenanceMutation = useMutation({
        mutationFn: handleUpdateMaintenanceRequest,
        onSuccess: (_, {toastId}) => {
            queryClient.invalidateQueries(['maintenance'])
            notify('success', 'Maintenance updated successfully!', null, null, toastId)
        },
        onError: (err, {toastId}) => {
            console.error(err)
            notify('error', 'Could not update maintenance!', null, null, toastId)
        }
    })

    return (
        <>
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
                                    <p>{format(parseISO(maintenance.created.toLocaleString()), `MMMM dd, yyyy - hh:mm a`)}</p>
                                </div>
                                <div className='mb-2 w-full'>
                                    <strong className='text-slate-400'>Description: </strong>
                                    <p>{maintenance.description}</p>
                                </div>
                            </div>
                            <span
                                className='flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-blue-500 py-3 px-4 rounded-md font-semibold w-full mt-auto cursor-pointer'
                                onClick={() => {
                                    setIsUpdateMaintenanceDrawerOpen(true)
                                    setMaintenanceData(maintenance)
                                }}>
                                <IoCreate className='mr-2'/>
                                Edit maintenance
                            </span>
                            {
                                authenticatedUser?.uid === maintenance?.authorId ? (
                                    <span
                                        className='flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-destructive-400 py-3 px-4 rounded-md font-semibold w-full mt-2 cursor-pointer'
                                        onClick={() => {
                                            const toastId = notifyLoading('Deleting Maintenance')
                                            deleteMaintenanceMutation.mutate({data: maintenance.uid, toastId})
                                        }}>
                                        <IoTrashBin className='mr-2'/>
                                        Delete maintenance
                                    </span>
                                ) : ''
                            }
                        </li>
                    )) : ''
                }
                </ul>
            </div>

            <DrawerOne openState={isUpdateMaintenanceDrawerOpen} setState={setIsUpdateMaintenanceDrawerOpen} title="Edit Maintenance">
                <div>
                    <InputGroup full classes='mb-5'>
                        <Label text='Maintenance Description' name='description'/>
                        <InputText
                            name='description'
                            classes='rounded-md'
                            type='text'
                            placeholder='Enter an explanatory description ...'
                            onChange={(e: any) => {
                                setMaintenanceData((prev: any) => ({...prev, description: e.target.value }))
                                e.target.value ? setIsUpdateMaintenanceButtonDisabled(false) : setIsUpdateMaintenanceButtonDisabled(true)
                            }}
                            value={maintenanceData? maintenanceData.description : ''}
                        />
                    </InputGroup>

                    <div className='relative flex mx-auto w-12/12 lg:mx-0 mb-2 h-[300px] bg-slate-200 dark:bg-slate-900'>
                        {
                            isRemovePhotoButtonVisible && (
                            <span className='absolute right-3 top-3 cursor-pointer' onClick={() => handleRemovePhoto()}>
                                <IoCloseCircle className='text-4xl drop-shadow-lg text-slate-500'/>
                            </span>)}
                        <img src={maintenanceData?.imageUrl} alt="" ref={imageRef} className='flex mx-auto object-cover w-full outline-none ring-0'/>
                        <div className={`${isOverlayVisible ? 'h-full w-full absolute z-50 top-0 left-0 bg-black opacity-60' : 'none'}`}>
                            {isLoading ? <LoaderOne/> : null}
                        </div>
                    </div>

                    {
                        isTakePhotoButtonVisible && (
                            <RectButton visual='fill' variant='primary' full classes='w-full rounded mb-5 font-semibold' onCLick={() => handleTakePhoto()}>
                                <IoCamera className='text-lg'/>
                                Take Photo
                            </RectButton>
                        )
                    }
                    <input ref={imageInputRef} type="file" accept="image/*" capture className='hidden'/>

                    {
                        isUpdateMaintenanceButtonVisible && (
                            <RectButton disabled={isUpdateMaintenanceButtonDisabled}
                                onCLick={() => {
                                    const toastId = notifyLoading('Updating Maintenance')
                                    updateMaintenanceMutation.mutate({data: maintenanceData, toastId})
                                }}
                                full
                                type='submit'
                                variant='primary'
                                visual='fill'
                                classes='rounded font-semibold mt-2'
                            >
                                    <IoCheckmarkCircle className='text-lg'/>
                                    Confirm update maintenance
                            </RectButton>
                        )
                    }
                </div>
            </DrawerOne>
        </>
    )
}

export default MaintenanceList