"use client"

import RectButton from '@/components/Buttons/RectButton'
import React, {useState} from 'react'
import { IoCamera, IoClose, IoCloseCircle, IoPaperPlane } from 'react-icons/io5'

const Photo = () => {

    const [isSubmitButtonVisible, setIsSubmitButtonVisible] = useState(false)
    const [isRemovePhotoButtonVisible, setIsRemovePhotoButtonVisible] = useState(false)
    const [isTakePhotoButtonVisible, setIsTakePhotoButtonVisible] = useState(true)

    const handleTakePhoto = (e: Event) => {
        e.preventDefault()
        let photoInput = document.getElementById('photo-input') as HTMLInputElement

        if (photoInput) {
            photoInput.click()

            photoInput.addEventListener('change', (e) => {
                if (photoInput.files) {
                    console.dir(photoInput.files[0])

                    if (photoInput.files[0].type.indexOf("image/") > -1) {
                        let img = document.getElementById('photo-placeholder') as HTMLImageElement
                        img.src = photoInput.files ? window.URL.createObjectURL(photoInput.files[0]) : ''
                        setIsSubmitButtonVisible(true)
                        setIsTakePhotoButtonVisible(false)
                        setIsRemovePhotoButtonVisible(true)
                    } else {
                        console.log("Only Accept Images")
                    }
                } else {
                    console.log("Empty Array of Files")
                }
            })
        }
    }

    const handleRemovePhoto = (e: any) => {
        e.preventDefault()

        let img = document.getElementById('photo-placeholder') as HTMLImageElement
        img.src = ''

        setIsSubmitButtonVisible(false)
        setIsTakePhotoButtonVisible(true)
        setIsRemovePhotoButtonVisible(false)
    }

    const handleSubmitPhoto = (e: Event) => {
        e.preventDefault()
        let photoForm = document.getElementById('photo-form') as HTMLFormElement

        photoForm.submit();
    }

    return (
        <form id="photo-form" encType='multipart/form-data'>
            <div className='relative flex mx-auto w-12/12 lg:w-[300px] lg:mx-0 mb-2 min-h-[500px] bg-slate-700 '>
                {
                    isRemovePhotoButtonVisible && (
                    <span className='absolute right-3 top-3 cursor-pointer' onClick={(e) => handleRemovePhoto(e)}>
                        <IoCloseCircle className='text-4xl drop-shadow-lg text-slate-500'/>
                    </span>)}
                <img id="photo-placeholder" src="" alt="" className='flex mx-auto object-cover'/>
            </div>
            {
                isTakePhotoButtonVisible && (
                    <RectButton visual='fill' variant='primary' classes='w-full lg:w-[300px] rounded mb-5 font-semibold' onCLick={(e) => handleTakePhoto(e)}>
                        <IoCamera className='text-lg'/>
                        Take Photo
                    </RectButton>
                )
            }
            {
                isSubmitButtonVisible && (
                    <RectButton visual='fill' variant='success' classes='w-full lg:w-[300px] rounded mb-5 font-semibold' onCLick={(e) => handleSubmitPhoto(e)}>
                        <IoPaperPlane className='text-lg'/>
                        Submit Photo
                    </RectButton>
                )
            }
            <input id="photo-input" type="file" accept="image/*" capture className='hidden'/>
        </form>
    )
}

export default Photo