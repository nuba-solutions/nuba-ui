"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import { IoEyeOffOutline, IoEyeOutline, IoLockClosedOutline, IoLogIn, IoMailOutline, IoPersonAdd, IoPersonOutline } from 'react-icons/io5'
import RectButton from '../Buttons/RectButton'
import InputText from '../Inputs/InputText'
import InputGroup from '../Inputs/InputGroup'
import Label from '../Inputs/Label'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import LoaderOne from '../Loaders/LoaderOne'

const SignUpTwo: React.FC = () => {
    const {user, signUp} = useAuth()
    const router = useRouter()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [nameHasError, setNameHasError] = useState<boolean>(false)
    const [emailHasError, setEmailHasError] = useState<boolean>(false)
    const [passwordHasError, setPasswordHasError] = useState<boolean>(false)
    const [confirmPasswordHasError, setConfirmPasswordHasError] = useState<boolean>(false)

    const [nameErrorMessage, setNameErrorMessage] = useState<string>('')
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>('')
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('')
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState<string>('')

    const [showPassword, setShowPassword] = useState<boolean>(true)
    const [passwordFieldType, setPasswordFieldType] = useState<string>('password')

    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(true)
    const [confirmPasswordFieldType, setConfirmPasswordFieldType] = useState<string>('password')

    const [signUpData, setSignUpData] = useState<{
        name: string,
        email: string | number,
        password: string | number,
        confirmPassword: string | number
    }>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSignUpSubmit = async (e: any) => {
        e.preventDefault()

        if (!signUpData.name || nameHasError ||
            !signUpData.email || emailHasError ||
            !signUpData.password || passwordHasError ||
            !signUpData.confirmPassword || confirmPasswordHasError) {
            return
        }

        setIsLoading(true)

        try {
            await signUp(signUpData.email, signUpData.password, signUpData.name)
                .then(() => {
                    setIsLoading(false)
                    router.push('/dashboard')
                })
        } catch (err) {
            console.log(err)
        }
    }

    const handleNameChange = (e: any) => {
        setSignUpData({...signUpData, name: e.target.value})
    }

    const handleEmailChange = (e: any) => {
        setSignUpData({...signUpData, email: e.target.value.toLowerCase()})
        e.target.value = e.target.value.toLowerCase()
    }

    const handlePasswordChange = (e: any) => {
        setSignUpData({...signUpData, password: e.target.value})
    }

    const handleConfirmPasswordChange = (e: any) => {
        setSignUpData({...signUpData, confirmPassword: e.target.value})
    }

    const validateName = () => {
        setNameHasError(false)

        if(!signUpData.name) {
            setNameErrorMessage('Enter your name')
            setNameHasError(true)
            return
        }

        if(signUpData.name.length <= 5) {
            setNameErrorMessage('Enter your full name')
            setNameHasError(true)
            return
        }
    }

    const validateEmail = () => {
        setEmailHasError(false)
        if (!signUpData.email) {
            setEmailErrorMessage('Enter a valid email')
            setEmailHasError(true)
            return;
        }

        let regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(nubasolutions.in|nubasolutions.com)$/;
        if (!signUpData.email.toString().toLowerCase().trim().match(regEx)) {
            setEmailErrorMessage('It must be @nubasolutions')
            setEmailHasError(true)
            return;
        }
    }

    const validatePassword = () => {
        setPasswordHasError(false)

        if (!signUpData.password) {
            setPasswordErrorMessage('Enter a password')
            setPasswordHasError(true)
            return;
        }

        let regEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!regEx.test(signUpData.password.toString())) {
            setPasswordErrorMessage('It must contain one upper case, one special character, and be at least 8 digits')
            setPasswordHasError(true)
            return;
        }

        validatePasswordMatch()
    }

    const validatePasswordMatch = () => {
        setConfirmPasswordHasError(false)

        if (!signUpData.confirmPassword) {
            setConfirmPasswordErrorMessage('Confirm your password')
            setConfirmPasswordHasError(true)
            return;
        }

        if (signUpData.password !== signUpData.confirmPassword) {
            setConfirmPasswordErrorMessage('Passwords do not match')
            setConfirmPasswordHasError(true)
            return;
        }
    }

    const handleShowPassword = () => {
        setShowPassword(current => !current)
        showPassword ? setPasswordFieldType('text') : setPasswordFieldType('password')
    }

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(current => !current)
        showConfirmPassword ? setConfirmPasswordFieldType('text') : setConfirmPasswordFieldType('password')
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
                            <p className='text-slate-500'>Already have an account?</p>
                            <RectButton visual="outline" link='/login' variant='primary' classes='rounded-md'>
                                Sign in
                                <IoPersonAdd/>
                            </RectButton>
                        </div>
                    </div>

                    <div className='order-1 lg:order-2'>
                        <h1 className='text-primary-500 text-left text-xl mt-3 font-semibold md:text-2xl lg:text-3xl lg:mt-10'>Sign up</h1>
                        <h2 className='text-slate-500 dark:text-slate-300 mt-2 mb-2'>Create an account to access the dashboard</h2>
                        <hr className='flex md:hidden lg:flex h-px mt-4 lg:mt-5 mb-4 bg-slate-300 border-0 dark:bg-gray-800'/>

                        <form>
                            <InputGroup full classes='my-4'>
                                <Label text='Full Name' name='name'/>
                                <InputText
                                    onChange={handleNameChange}
                                    onBlur={validateName}
                                    name='name'
                                        classes='rounded-md'
                                        type='text'
                                    hasError={nameHasError}
                                    errorMessage={nameErrorMessage}
                                    placeholder='Enter Name'
                                    iconLeft={<IoPersonOutline/>}
                                />
                            </InputGroup>

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

                            <div className='flex flex-col items-start md:flex-row md:gap-x-4 md:mb-2'>
                                <InputGroup full classes='my-2'>
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

                                <InputGroup full classes='my-2'>
                                    <Label text='Confirm Password' name='confirm-password'/>
                                    <InputText
                                        onChange={handleConfirmPasswordChange}
                                        onBlur={validatePasswordMatch}
                                        name='confirm-password'
                                        classes='rounded-md'
                                        type={confirmPasswordFieldType}
                                        hasError={confirmPasswordHasError}
                                        errorMessage={confirmPasswordErrorMessage}
                                        placeholder='Reenter password'
                                        iconLeft={<IoLockClosedOutline/>}
                                        iconRight={
                                            confirmPasswordFieldType === 'password' ?
                                            <IoEyeOutline onClick={handleShowConfirmPassword} className='cursor-pointer'/> :
                                            <IoEyeOffOutline onClick={handleShowConfirmPassword} className='cursor-pointer'/>
                                        }
                                    />
                                </InputGroup>
                            </div>

                            <RectButton full variant='primary' visual='fill' classes="mt-2 mb-2 rounded-md md:mb-8" onCLick={handleSignUpSubmit}>
                                Create Account
                                <IoPersonAdd/>
                            </RectButton>

                            <div className='flex flex-col items-center mt-5 md:hidden'>
                                <p className='text-slate-500 md:ml-4'>Already have an account?</p>
                                <RectButton link='/login' variant='primary'>
                                    Sign in
                                    <IoLogIn className='text-lg'/>
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

export default SignUpTwo