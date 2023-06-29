"use client"

import RectButton from '@/components/Buttons/RectButton'
import React, { useState, useRef } from 'react'
import { IoCamera, IoCloseCircle, IoPaperPlane } from 'react-icons/io5'
import { storage } from '@/config/firebase'
import { ref, uploadBytes } from 'firebase/storage'
import { notify, notifyLoading } from '@/lib/utils/notify'

const MaintenanceCreate = () => {

    const [isSubmitButtonVisible, setIsSubmitButtonVisible] = useState(false)
    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false)
    const [isRemovePhotoButtonVisible, setIsRemovePhotoButtonVisible] = useState(false)
    const [isTakePhotoButtonDisabled, setIsTakePhotoButtonDisabled] = useState(false)
    const [isTakePhotoButtonVisible, setIsTakePhotoButtonVisible] = useState(true)

    const [maintenanceImage, setMaintenanceImage] = useState<any>({})

    const imageRef = useRef<any>()
    const imageInputRef = useRef<any>()

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
        const toastId = notifyLoading('Creating New Maintenance Request')
        const maintenanceImageRef = ref(storage, `maintenance/images/${maintenanceImage.name}`)

        uploadBytes(maintenanceImageRef, maintenanceImage).then(() => {
            notify('success', 'Maintenance Created Successfully', null, null, toastId)
            resetMaintenanceCreateStates()
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
    }

    return (
        <div>
            <div className='relative flex mx-auto w-12/12 lg:w-[300px] lg:mx-0 mb-2 min-h-[500px] bg-slate-700 '>
                {
                    isRemovePhotoButtonVisible && (
                    <span className='absolute right-3 top-3 cursor-pointer' onClick={() => handleRemovePhoto()}>
                        <IoCloseCircle className='text-4xl drop-shadow-lg text-slate-500'/>
                    </span>)}
                <img src="" alt="" ref={imageRef} className='flex mx-auto object-cover'/>
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