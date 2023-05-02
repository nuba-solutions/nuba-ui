"use client"

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { IoArrowBack, IoEyeOffOutline, IoEyeOutline, IoLockClosedOutline, IoLogIn, IoMailOutline, IoPersonAdd } from 'react-icons/io5'
import RectButton from '../Buttons/RectButton'
import InputText from '../Inputs/InputText'
import InputGroup from '../Inputs/InputGroup'
import Label from '../Inputs/Label'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import LoaderOne from '../Loaders/LoaderOne'

const LoginTwo: React.FC = () => {
    const {user, login} = useAuth()
    const router = useRouter()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [emailHasError, setEmailHasError] = useState<boolean>(false)
    const [passwordHasError, setPasswordHasError] = useState<boolean>(false)

    const [emailErrorMessage, setEmailErrorMessage] = useState<string>('')
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('')

    const [showPassword, setShowPassword] = useState<boolean>(true)
    const [passwordFieldType, setPasswordFieldType] = useState<string>('password')

    const [loginData, setLoginData] = useState<{
        email: string | number,
        password: string | number
    }>({
        email: '',
        password: ''
    });

    useEffect(() => {
        user ? router.push('/dashboard') : ''
    }, [user, router])

    const handleLoginSubmit = async (e: any) => {
        e.preventDefault()

        if (!loginData.email || emailHasError ||
            !loginData.password || passwordHasError) {
            return
        }

        setIsLoading(true)

        try {
            await login(loginData.email, loginData.password)
                .then((res: any) => {
                    console.log(res)
                    setIsLoading(false)
                    router.push('/dashboard')
                })
        } catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }

    const handleEmailChange = (e: any) => {
        setLoginData({...loginData, email: e.target.value.toLowerCase()})
        e.target.value = e.target.value.toLowerCase()
    }

    const handlePasswordChange = (e: any) => {
        setLoginData({...loginData, password: e.target.value})
    }

    const validateEmail = () => {
        setEmailHasError(false)
        if (!loginData.email) {
            setEmailErrorMessage('Enter a valid email')
            setEmailHasError(true)
            return;
        }

        let regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(nubasolutions.in|nubasolutions.com)$/;
        if (!loginData.email.toString().toLowerCase().trim().match(regEx)) {
            setEmailErrorMessage('It must be @nubasolutions')
            setEmailHasError(true)
            return;
        }
    }

    const validatePassword = () => {
        setPasswordHasError(false)

        if (!loginData.password) {
            setPasswordErrorMessage('Enter a password')
            setPasswordHasError(true)
            return;
        }
    }

    const handleShowPassword = () => {
        setShowPassword(current => !current)
        showPassword ? setPasswordFieldType('text') : setPasswordFieldType('password')
    }

    return (
        <main className='flex justify-center items-start md:items-center w-full w-12/12 min-h-[100vh] p-2 bg-slate-100 dark:bg-gray-900 md:flex-row md:p-0'>
            <Image
                src="/images/login-pattern.jpg"
                width={1920}
                height={1080}
                quality={100}
                alt="Generic Background Image"
                className='w-full h-[100vh] object-cover relative hidden md:block'
                priority
            />

            <div className='bg-slate-100 dark:bg-gray-900 overflow-clip md:border md:border-slate-300 md:dark:border-gray-700 md:shadow-3xl absolute flex flex-col lg:flex-row justify-center mx-auto p-2 md:rounded-3xl md:p-2 md:w-[520px] lg:w-[820px] lg:h-[600px] lg:px-none lg:p-2'>
                <div className='relative grid max-h-[160px] md:max-h-[180px] lg:max-h-full w-full lg:w-4/12 rounded-2xl overflow-clip place-items-center'>
                    <Image
                        src="/images/blue-pattern.jpg"
                        alt="Login Background Image"
                        width={600}
                        height={800}
                        className='h-full object-cover'
                    />
                    <div className='absolute text-center'>
                        <Image src={'/logos/nuba-ui-logo-white.svg'} width={180} height={80} className='max-h-[50px] md:max-h-none mx-auto' alt='Nuba UI Logo' priority/>
                    </div>
                </div>

                <div className='p-2 lg:w-8/12 lg:p-5 lg:px-10 flex flex-col'>
                    <div className='order-1 md:order-2 lg:order-1'>
                        <div className='hidden items-center flex-row justify-between md:flex'>
                            <p className='text-slate-500'>Don't have an account?</p>
                            <RectButton visual="outline" link='/signup' variant='primary' classes='rounded-md'>
                                Sign up
                                <IoPersonAdd/>
                            </RectButton>
                        </div>
                    </div>

                    <div className='order-1 lg:order-2'>
                        <h1 className='text-primary-500 text-left text-xl mt-3 font-semibold md:text-2xl lg:text-3xl lg:mt-10'>Sign in</h1>
                        <h2 className='text-slate-500 dark:text-slate-300 mt-2 mb-2'>Login to your account to access the dashboard</h2>
                        <hr className='flex md:hidden lg:flex h-px mt-4 lg:mt-5 mb-4 bg-slate-300 border-0 dark:bg-gray-800'/>

                        <form>
                            <InputGroup full classes='my-4'>
                                <Label text='Email' name='email'/>
                                <InputText
                                    onChange={handleEmailChange}
                                    onBlur={validateEmail}
                                    name='email'
                                    classes='rounded-md'
                                    type='email'
                                    hasError={emailHasError}
                                    errorMessage={emailErrorMessage}
                                    placeholder='Enter email'
                                    iconLeft={<IoMailOutline/>}
                                />
                            </InputGroup>

                            <InputGroup full classes='my-4'>
                                <Label text='Password' name='password'/>
                                <InputText
                                    onChange={handlePasswordChange}
                                    onBlur={validatePassword}
                                    name='password'
                                    classes='rounded-md'
                                    type={passwordFieldType}
                                    hasError={passwordHasError}
                                    errorMessage={passwordErrorMessage}
                                    placeholder='Enter password'
                                    iconLeft={<IoLockClosedOutline/>}
                                    iconRight={
                                        passwordFieldType === 'password' ?
                                        <IoEyeOutline onClick={handleShowPassword} className='cursor-pointer'/> :
                                        <IoEyeOffOutline onClick={handleShowPassword} className='cursor-pointer'/>
                                    }
                                />
                            </InputGroup>

                            <RectButton full variant='primary' visual='fill' sz='' classes="mb-2 rounded-md md:mb-8" onCLick={handleLoginSubmit}>
                                Sign in
                                <IoLogIn className='text-lg'/>
                            </RectButton>

                            <div className='flex flex-col items-center mt-5 md:hidden'>
                                <p className='text-slate-500'>Don't have an account?</p>
                                <RectButton link='/signup' variant='primary'>
                                    Sign up
                                    <IoPersonAdd/>
                                </RectButton>
                            </div>
                        </form>
                    </div>
                </div>

                {isLoading ? <LoaderOne/> : null}
            </div>
        </main>
    )
}

export default LoginTwo