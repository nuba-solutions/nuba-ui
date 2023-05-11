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

interface LoginOneProps {
    left?: boolean,
    center?: boolean
}

const LoginOne: React.FC<LoginOneProps> = ({left, center}) => {
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

    if (center) {
        return (
            <main className='flex justify-center items-center w-full w-12/12 min-h-[100vh] p-2 bg-slate-100 dark:bg-gray-900 md:flex-row md:p-0'>
                <Image
                    src="/images/blue-pattern.jpg"
                    width={800}
                    height={600}
                    alt="Generic Background Image"
                    className='w-full h-[100vh] object-cover object-top relative hidden md:block'
                    priority
                />

                <div className='bg-slate-100 dark:bg-gray-900 overflow-clip md:border md:border-slate-300 md:dark:border-gray-700 md:shadow-3xl absolute flex flex-col justify-center mx-auto p-5 md:rounded-2xl md:px-10 md:w-6/12 lg:w-5/12 xl:3/12 2xl:w-3/12 3xl:px-10 4xl:px-20'>
                    <Image src={'/logos/nuba-ui-logo.svg'} width={150} height={80} className='dark:hidden mx-auto h-auto md:py-2' alt='Nuba UI Logo' priority/>
                    <Image src={'/logos/nuba-ui-logo-mixed.svg'} width={150} height={80} className='hidden mx-auto dark:block md:py-2' alt='Nuba UI Logo' priority/>

                    <hr className='h-px mt-5 mb-4 bg-slate-300 border-0 dark:bg-gray-800'/>

                    <h1 className='text-primary-500 text-left text-xl font-semibold'>Sign in</h1>
                    <h2 className='text-slate-500 dark:text-slate-300 mt-2 mb-2'>Login to your account to access the dashboard</h2>

                    <form>
                        <InputGroup full classes='my-5'>
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

                        <InputGroup full classes='my-5'>
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

                        <RectButton full variant='primary' visual='fill' sz='' classes="mb-5 rounded-md" onCLick={handleLoginSubmit}>
                            Sign in
                            <IoLogIn className='text-lg'/>
                        </RectButton>

                        <div className='flex flex-col items-center xl:flex-row xl:justify-between'>
                            <p className='text-slate-500'>Don't have an account?</p>
                            <RectButton link='/signup' variant='primary'>
                                Sign up
                                <IoPersonAdd/>
                            </RectButton>
                        </div>
                    </form>

                    {isLoading ? <LoaderOne/> : null}
                </div>
            </main>
        )
    }

    return (
        <main className='flex flex-col justify-between w-full w-12/12 min-h-[100vh] p-2 bg-slate-100 dark:bg-gray-900 md:flex-row md:p-0'>
            <div className={`${left ? 'order-2' : 'order-1'} hidden md:flex flex-col items-center justify-center md:w-6/12 lg:w-8/12 2xl:w-9/12`}>
                <Image
                    src="/images/blue-pattern.jpg"
                    width={800}
                    height={600}
                    alt="Generic Background Image"
                    className='w-full h-[100vh] object-cover object-top relative'
                    priority
                />
                <div className='absolute text-center'>
                    <h2 className='text-5xl font-semibold text-slate-100 pb-1 md:text-6xl lg:text-7xl 2xl:text-8xl'>Nuba UI</h2>
                    <p className='text-slate-300'>Login Style One</p>
                </div>
            </div>
            <div className={`${left ? 'order-1' : 'order-2'} relative flex flex-col justify-center flex-1 mx-auto p-5 md:p-0 md:justify-center md:px-10 md:w-6/12 lg:w-4/12 2xl:w-3/12 3xl:px-20 4xl:px-32`}>
                <Image src={'/logos/nuba-ui-logo.svg'} width={180} height={80} className='dark:hidden mx-auto h-auto' alt='Nuba UI Logo' priority/>
                <Image src={'/logos/nuba-ui-logo-mixed.svg'} width={180} height={80} className='hidden mx-auto dark:block' alt='Nuba UI Logo' priority/>

                <hr className='h-px mt-10 mb-4 bg-slate-300 border-0 dark:bg-gray-800'/>

                <h1 className='text-primary-500 text-left text-xl font-semibold'>Sign in</h1>
                <h2 className='text-slate-500 dark:text-slate-300 mt-2 mb-6'>Login to your account to access the dashboard</h2>

                <form>
                    <InputGroup full classes='my-5'>
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

                    <InputGroup full classes='my-5 mb-10'>
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

                    <RectButton full variant='primary' visual='fill' sz='' classes="mb-5 rounded-md" onCLick={handleLoginSubmit}>
                        Sign in
                        <IoLogIn className='text-lg'/>
                    </RectButton>

                    <div className='flex flex-col items-center xl:flex-row xl:justify-between'>
                        <p className='text-slate-500'>Don't have an account?</p>
                        <RectButton link='/signup' variant='primary'>
                            Sign up
                            <IoPersonAdd/>
                        </RectButton>
                    </div>
                </form>

                {isLoading ? <LoaderOne/> : null}
            </div>
        </main>
    )
}

export default LoginOne