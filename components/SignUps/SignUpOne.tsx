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

interface SignUpOneProps {
    left?: boolean
}

const SignUpOne: React.FC<SignUpOneProps> = ({left}) => {
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
                    <p className='text-slate-300'>Sign Up Style One</p>
                </div>
            </div>
            <div className={`${left ? 'order-1' : 'order-2'} relative flex flex-col justify-center flex-1 mx-auto p-5 md:p-0 md:justify-center md:px-10 md:w-6/12 lg:w-4/12 2xl:w-3/12 3xl:px-20 4xl:px-32`}>
                <Image src={'/logos/nuba-ui-logo.svg'} width={180} height={100} className='dark:hidden mx-auto h-auto' alt='Nuba UI Logo'/>
                <Image src={'/logos/nuba-ui-logo-mixed.svg'} width={180} height={100} className='hidden mx-auto dark:block h-auto' alt='Nuba UI Logo'/>

                <hr className='h-px mt-10 mb-4 bg-slate-300 border-0 dark:bg-gray-800'/>

                <h1 className='text-primary-500 text-left text-xl font-semibold'>Sign up</h1>
                <h2 className='text-slate-500 dark:text-slate-300 mt-2 mb-6'>Create an account using your <strong>@nubasolutions</strong> email</h2>

                <form>
                    <InputGroup full classes='my-5'>
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

                    <InputGroup full classes='my-5 mb-10'>
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

                    <RectButton full variant='primary' visual='fill' classes="mb-5 rounded-md" onCLick={handleSignUpSubmit}>
                        Create Account
                        <IoPersonAdd/>
                    </RectButton>

                    <div className='flex flex-col items-center xl:flex-row xl:justify-between'>
                        <p className='text-slate-500'>Already have an account?</p>
                        <RectButton link='/login' variant='primary'>
                            Sign in
                            <IoLogIn className='text-lg'/>
                        </RectButton>
                    </div>
                </form>

                {isLoading ? <LoaderOne/> : null}
            </div>
        </main>
    )
}

export default SignUpOne