"use client"

import RectButton from '@/components/Buttons/RectButton'
import React from 'react'
import { IoCamera } from 'react-icons/io5'

const Photo = () => {

    const handleTakePhoto = () => {
        document.getElementById('photo-button')?.click()
    }

    return (
        <div>
            <h1 className='text-lg mb-2'>Press the button to capture an image</h1>
            <RectButton visual='fill' variant='primary' classes='w-full lg:w-fit rounded mb-5 font-semibold' onCLick={() => handleTakePhoto()}>
                <IoCamera className='text-lg'/>
                Take Photo
            </RectButton>
            <input id="photo-button" type="file" accept="image/*" className='hidden'/>
        </div>
    )
}

export default Photo