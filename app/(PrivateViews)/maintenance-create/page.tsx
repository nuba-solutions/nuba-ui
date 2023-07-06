"use client"

import RectButton from '@/components/Buttons/RectButton'
import React, { useState, useRef, useEffect } from 'react'
import { IoCamera, IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5'
import { auth, storage } from '@/config/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { notify, notifyLoading } from '@/lib/utils/notify'
import { v4 } from 'uuid'
import LoaderOne from '@/components/Loaders/LoaderOne'
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext'
import InputGroup from '@/components/Inputs/InputGroup'
import Label from '@/components/Inputs/Label'
import InputText from '@/components/Inputs/InputText'

interface MaintenanceRequest {
    description: string
    created: Date
    imageUrl: Promise<string>
    authorName: string
    authorEmail: string
    authorId: string
}

const MaintenanceCreate = () => {

    const {user} = useAuth()
    const [authenticatedUser, setAuthenticatedUser] = useState({displayName: '', email: '', uid: ''})
    const [isLoading, setIsLoading] = useState(false)

    const [isRemovePhotoButtonVisible, setIsRemovePhotoButtonVisible] = useState(false)
    const [isTakePhotoButtonDisabled, setIsTakePhotoButtonDisabled] = useState(false)
    const [isTakePhotoButtonVisible, setIsTakePhotoButtonVisible] = useState(true)
    const [isCreateMaintenanceButtonVisible, setIsCreateMaintenanceButtonVisible] = useState(false)
    const [isCreateMaintenanceButtonDisabled, setIsCreateMaintenanceButtonDisabled] = useState(true)

    const [isOverlayVisible, setIsOverlayVisible] = useState(false)

    const [maintenanceImage, setMaintenanceImage] = useState<any>(null)
    const [maintenanceDescription, setMaintenanceDescription] = useState<any>('')

    const imageRef = useRef<any>()
    const imageInputRef = useRef<any>()

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
                setIsTakePhotoButtonDisabled(true)
                if (maintenanceDescription !== '') setIsCreateMaintenanceButtonDisabled(false)
                setIsCreateMaintenanceButtonVisible(true)
            })
        }
    }

    const handleRemovePhoto = () => {
        resetMaintenanceCreateStates()
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
        setIsCreateMaintenanceButtonVisible(false)
        setIsCreateMaintenanceButtonDisabled(true)
        setIsTakePhotoButtonVisible(true)
        setIsTakePhotoButtonDisabled(false)
        setIsRemovePhotoButtonVisible(false)
        setMaintenanceImage(null)
        imageRef.current.src = ''
        imageInputRef.current.value = ''
        setIsOverlayVisible(false)
        setIsLoading(false)
        setMaintenanceDescription('')
    }

    const handleCreateMaintenanceRequest = async () => {
        const toastId = notifyLoading('Creating New Maintenance Request')
        let isPhotoUploadedSuccess = await handleSubmitPhoto()

        if (!isPhotoUploadedSuccess && isPhotoUploadedSuccess === null) return

        let data : MaintenanceRequest = {
            description: maintenanceDescription,
            created: new Date(),
            imageUrl: isPhotoUploadedSuccess,
            authorName: authenticatedUser.displayName,
            authorEmail: authenticatedUser.email,
            authorId: authenticatedUser.uid
        }

        await axios.post('/api/maintenance', data).then((response) => {
            if (response.status === 200) notify('success', 'Maintenance Created Successfully', null, null, toastId)
        }).catch((err) => {
            console.log(err)
            notify('error', 'Something Went Wrong!', null, null, toastId)
        })

        resetMaintenanceCreateStates()
    }

    return (
        <div className='lg:p-5'>
            <div className="lg:hidden">
                <h1 className='text-xl font-semibold mt-4 lg:mt-0'>Start new Maintenance Request</h1>
                <p className='text-slate-500 mb-4'>Enter a description and attach a picture.</p>
                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-slate-700"></hr>
            </div>

            <div className='xl:max-w-sm'>
                <InputGroup full classes='mb-5'>
                    <Label text='Maintenance Description' name='description'/>
                    <InputText
                        name='description'
                        classes='rounded-md'
                        type='text'
                        placeholder='Enter an explanatory description ...'
                        onChange={(e: any) => {
                            setMaintenanceDescription(e.target.value);
                            e.target.value ? setIsCreateMaintenanceButtonDisabled(false) : setIsCreateMaintenanceButtonDisabled(true)
                        }}
                        value={maintenanceDescription}
                    />
                </InputGroup>

                <div>
                    <div className='relative flex mx-auto w-12/12 lg:w-[300px] lg:mx-0 mb-2 h-[300px] bg-slate-200 dark:bg-slate-800'>
                        {
                            isRemovePhotoButtonVisible && (
                            <span className='absolute right-3 top-3 cursor-pointer' onClick={() => handleRemovePhoto()}>
                                <IoCloseCircle className='text-4xl drop-shadow-lg text-slate-500'/>
                            </span>)}
                        <img src="" alt="" ref={imageRef} className='flex mx-auto object-cover w-full outline-none ring-0'/>
                        <div className={`${isOverlayVisible ? 'h-full w-full absolute z-50 top-0 left-0 bg-black opacity-60' : 'none'}`}>
                            {isLoading ? <LoaderOne/> : null}
                        </div>
                    </div>
                    {
                        isTakePhotoButtonVisible && (
                            <RectButton visual='fill' variant='primary' classes='w-full lg:w-[300px] rounded mb-5 font-semibold' disabled={isTakePhotoButtonDisabled} onCLick={() => handleTakePhoto()}>
                                <IoCamera className='text-lg'/>
                                Take Photo
                            </RectButton>
                        )
                    }
                    <input ref={imageInputRef} type="file" accept="image/*" capture className='hidden'/>

                    {
                        isCreateMaintenanceButtonVisible && (
                            <RectButton visual='fill' variant='primary' classes='w-full lg:w-[300px] rounded mb-5 font-semibold' disabled={isCreateMaintenanceButtonDisabled} onCLick={() => handleCreateMaintenanceRequest()}>
                                <IoCheckmarkCircle className='text-lg'/>
                                Create Request
                            </RectButton>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default MaintenanceCreate