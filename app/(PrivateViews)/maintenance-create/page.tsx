"use client"

import RectButton from '@/components/Buttons/RectButton'
import React, { useState, useRef, useContext, useEffect } from 'react'
import { IoCamera, IoCloseCircle, IoPaperPlane } from 'react-icons/io5'
import { auth, storage } from '@/config/firebase'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
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
    created: string
    imageUrl: string
    authorName: string
    authorEmail: string
    id: string
}

const MaintenanceCreate = () => {

    const {user, login} = useAuth()
    const [authenticatedUser, setAuthenticatedUser] = useState({displayName: '', email: '', uid: ''})

    const [isLoading, setIsLoading] = useState(false)

    const [isSubmitButtonVisible, setIsSubmitButtonVisible] = useState(false)
    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false)
    const [isRemovePhotoButtonVisible, setIsRemovePhotoButtonVisible] = useState(false)
    const [isTakePhotoButtonDisabled, setIsTakePhotoButtonDisabled] = useState(false)
    const [isTakePhotoButtonVisible, setIsTakePhotoButtonVisible] = useState(true)

    const [isOverlayVisible, setIsOverlayVisible] = useState(false)

    const [maintenanceImage, setMaintenanceImage] = useState<any>({})
    const [maintenanceImageURL, setMaintenanceImageURL] = useState<any>('')

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
                setIsSubmitButtonVisible(true)
                setIsTakePhotoButtonVisible(false)
                setIsRemovePhotoButtonVisible(true)
                setIsTakePhotoButtonDisabled(true)
            })
        }
    }

    const handleRemovePhoto = () => {
        resetMaintenanceCreateStates()
    }

    const handleSubmitPhoto = () => {
        setIsSubmitButtonDisabled(true)
        setIsOverlayVisible(true)
        setIsLoading(true)
        const toastId = notifyLoading('Creating New Maintenance Request')
        const maintenanceImageRef = ref(storage, `maintenance/images/${maintenanceImage.name + v4()}`)

        uploadBytes(maintenanceImageRef, maintenanceImage).then((snapShot) => {
            // console.log(getDownloadURL(snapShot.ref))
            setMaintenanceImageURL(getDownloadURL(snapShot.ref))
            notify('success', 'Maintenance Created Successfully', null, null, toastId)
            console.log(maintenanceImageURL)
            resetMaintenanceCreateStates()

            // let newMaintenanceRequest : MaintenanceRequest = {
            //     description: "test description",
            //     created: snapShot.metadata.timeCreated,
            //     imageUrl: getDownloadURL(snapShot.ref),
            //     authorName: handleGetAuthenticatedUser().name,
            //     authorEmail: handleGetAuthenticatedUser().email
            // }

            // handleCreateMaintenanceRequest(newMaintenanceRequest)
        }).catch((err) => {
            notify('error', 'Something Went Wrong!', null, null, toastId)
        })
    }

    const resetMaintenanceCreateStates = () => {
        setIsSubmitButtonVisible(false)
        setIsSubmitButtonDisabled(false)
        setIsTakePhotoButtonVisible(true)
        setIsTakePhotoButtonDisabled(false)
        setIsRemovePhotoButtonVisible(false)
        setMaintenanceImage({})
        imageRef.current.src = ''
        setIsOverlayVisible(false)
        setIsLoading(false)
    }

    const handleCreateMaintenanceRequest = async ({data} : any) => {
        // let 
        // await axios.post('/api/maintenance', data).then((response) => {
        //     return response.data
        // })
    }

    return (
        <div>
            {/* <form>
                <InputGroup full classes='my-5'>
                    <Label text='Maintenance Description' name='description'/>
                    <InputText
                        name='description'
                        classes='rounded-md'
                        type='text'
                        placeholder='Enter a maintenance description'
                    />
                </InputGroup>
            </form> */}
            <div className='relative flex mx-auto w-12/12 lg:w-[300px] lg:mx-0 mb-2 min-h-[500px] bg-slate-700 '>
                {
                    isRemovePhotoButtonVisible && (
                    <span className='absolute right-3 top-3 cursor-pointer' onClick={() => handleRemovePhoto()}>
                        <IoCloseCircle className='text-4xl drop-shadow-lg text-slate-500'/>
                    </span>)}
                <img src="" alt="" ref={imageRef} className='flex mx-auto object-cover'/>
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
            {
                isSubmitButtonVisible && (
                    <RectButton visual='fill' variant='success' classes='w-full lg:w-[300px] rounded mb-5 font-semibold' disabled={isSubmitButtonDisabled} onCLick={() => handleSubmitPhoto()}>
                        <IoPaperPlane className='text-lg'/>
                        Submit Photo
                    </RectButton>
                )
            }
            <input ref={imageInputRef} type="file" accept="image/*" capture className='hidden'/>
        </div>
    )
}

export default MaintenanceCreate