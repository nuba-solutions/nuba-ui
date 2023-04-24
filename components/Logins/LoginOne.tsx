"use client"

import Image from 'next/image'
import React from 'react'
import { IoArrowBack, IoArrowForward, IoLockClosedOutline, IoMailOutline } from 'react-icons/io5'
import RectButton from '../Buttons/RectButton'
import InputText from '../Inputs/InputText'
import InputGroup from '../Inputs/InputGroup'
import Label from '../Inputs/Label'

const LoginOne = () => {
    return (
        <main className='flex flex-col justify-between w-full w-12/12 h-[100vh] p-5 bg-slate-100 dark:bg-slate-900 md:flex-row md:p-0'>
            <div className='hidden bg-login-pattern bg-cover rounded-[30px] min-h-[250px] md:flex flex-col items-center justify-center shadow-2xl
                            md:shadow-none md:h-full md:rounded-none md:w-6/12 lg:w-8/12 2xl:w-9/12'>
                <h1 className='text-5xl font-semibold text-slate-100 pb-1 md:text-6xl lg:text-7xl 2xl:text-8xl'>Nuba UI</h1>
                <p className='text-slate-300'>Login Style One</p>
            </div>
            <div className='flex flex-col justify-center flex-1 mx-auto text-center p-5 md:p-0 md:justify-center md:px-10 md:w-6/12 lg:w-4/12 xl:px-20 2xl:w-3/12 4xl:px-32'>
                <Image src={'/logos/nuba-ui-logo.svg'} width={180} height={100} className='dark:hidden mx-auto h-auto' alt='Nuba UI Logo'/>
                <Image src={'/logos/nuba-ui-logo-mixed.svg'} width={180} height={100} className='hidden mx-auto dark:block h-auto' alt='Nuba UI Logo'/>
                <h2 className='my-8 text-slate-500 dark:text-slate-300'>Login to your account to access the dashboard</h2>

                <form>
                    <InputGroup full classes='my-5'>
                        <Label text='Email' name='email'/>
                        <InputText name='email' classes='rounded-md' placeholder='Type in your email' iconLeft={<IoMailOutline/>}/>
                    </InputGroup>

                    <InputGroup full classes='my-5 mb-10'>
                        <Label text='Password' name='password'/>
                        <InputText name='password' classes='rounded-md' placeholder='Type in your password' iconLeft={<IoLockClosedOutline/>}/>
                    </InputGroup>

                    <RectButton full variant='fill' visual='primary' sz='' classes="mb-5 rounded-md" click={(e: Event) => e.preventDefault()}>
                        Log in
                        <IoArrowForward/>
                    </RectButton>

                    <RectButton link="/" center>
                        <IoArrowBack/>
                        Go back
                    </RectButton>
                </form>
            </div>
        </main>
    )
}

export default LoginOne