"use client"

import RectButton from '@/components/Buttons/RectButton';
import FormInput from '@/components/Inputs/FormInput';
import InputGroup from '@/components/Inputs/InputGroup';
import Label from '@/components/Inputs/Label';
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { IoPerson, IoPersonAdd, IoTrash } from 'react-icons/io5';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';

import { notifyLoading, notify } from '@/lib/utils/notify'
import DrawerOne from '@/components/Drawers/DrawerOne';

interface User {
    uid: string,
    firstName: string;
    lastName: string;
    age: number;
    country: string | number
}

const Users = () => {
    const [isAddUserDrawerOpen, setIsAddUserDrawerOpen] = useState(false)

    const createNewUser = async ({data}: any) => {
        await axios.post('/api/users', data).then((response) => {
            return response.data
        })
    }

    const deleteUser = async ({data}: any) => {
        await axios.delete('/api/users', { params: { uid: data.uid } }).then((response) => {
            return response
        })
    }

    const queryClient = useQueryClient()

    const usersQuery = useQuery({
        queryKey: ['users'],
        queryFn: async () => await axios.get('/api/users').then((res) => res.data)
    })

    const createUserMutation = useMutation({
        mutationFn: createNewUser,
        onSuccess: (_, {toastId}) => {
            queryClient.invalidateQueries(['users'])
            setIsAddUserDrawerOpen(false)
            notify('success', 'User created successfully!', null, null, toastId)
        },
        onError: (error, {toastId}) => {
            notify('error', 'Could not create user!', null, null, toastId)
        }
    })

    const deleteUserMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: (_, {toastId}) => {
            queryClient.invalidateQueries(['users'])
            notify('success', 'User deleted successfully!', null, null, toastId)
        },
        onError: (error, {toastId}) => {
            notify('error', 'Could not delete user!', null, null, toastId)
        }
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm<User>({
        defaultValues: {
            firstName: '',
            lastName: '',
            age: 18,
        }
    });

    const onSubmit: SubmitHandler<User> = async (data) => {
        const toastId = notifyLoading('Creating user')
        createUserMutation.mutate({data, toastId})
        reset()
    }

    return (
        <>
            <div className='flex flex-row justify-between items-center'>
                <h1 className='text-lg font-bold'>Users List</h1>
                <RectButton variant='primary' visual='fill' classes='rounded font-semibold'
                    onCLick={() => setIsAddUserDrawerOpen(true)}
                >
                    <IoPersonAdd/>
                    Add New User
                </RectButton>
            </div>

            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-slate-700"></hr>

            <div className='my-2'>
                {
                    usersQuery.isLoading ? <p>Loading users</p> : null
                }
                {
                    usersQuery.isError ? <strong>Could not get users</strong> : null
                }
                <ul className='flex flex-wrap gap-3 mt-4'>
                {
                    Array.isArray(usersQuery.data) ? usersQuery.data.map((user: User) => (
                        <li key={user.uid} className='bg-white dark:bg-slate-700 text-slate-100 p-2 rounded-md w-full lg:w-fit flex items-center'>
                            <div className='ml-2'>
                                <span><strong>Name: </strong>{user.firstName} {user.lastName}</span>
                                <p><strong>Age:</strong> {user.age}</p>
                            </div>
                            <span className='ml-5 p-2 bg-slate-800 rounded cursor-pointer'
                                onClick={() => {
                                    console.log(user)
                                    const toastId = notifyLoading('Creating user')
                                    deleteUserMutation.mutate({data: "6WF4lqYJsgVSz4OyJBnT", toastId})
                                    reset()
                                }}
                            ><IoTrash/></span>
                        </li>
                    )) : ''
                }
                </ul>
            </div>

            <DrawerOne isAddUserDrawerOpen={isAddUserDrawerOpen} setIsAddUserDrawerOpen={setIsAddUserDrawerOpen}>
                <form onSubmit={handleSubmit(onSubmit)} className='mt-5 w-full flex flex-col gap-3'>
                    <InputGroup full>
                        <Label name='firstName' text='First Name'/>
                        <FormInput iconLeft={<IoPerson/>} placeholder={'Type in first name'} error={errors.firstName} register={{...register("firstName", { required: "This field is required", minLength: {value: 3, message: "Cannot be shorter than 3 chars"}, maxLength: 20 })}} cls='rounded-md bg-white'/>
                    </InputGroup>

                    <InputGroup full>
                        <Label name='lastName' text='Last Name'/>
                        <FormInput iconLeft={<IoPerson/>} placeholder='Type in last name' error={errors.lastName} register={{...register("lastName", { required: "This field is required", minLength: {value: 3, message: "Cannot be shorter than 3 characters"}, pattern: /^[A-Za-z]+$/i })}} cls='rounded-md bg-white'/>
                    </InputGroup>

                    <InputGroup full>
                        <Label name='age' text='Age'/>
                        <FormInput type='number' placeholder='Enter your age' error={errors.age} register={{...register("age", { min: {value: 18, message: "Cannot be less than 18"}, max: {value: 99, message: "Cannot be more than 99"} })}} cls='rounded-md bg-white'/>
                    </InputGroup>

                    <RectButton disabled={createUserMutation.isLoading} full type='submit' variant='primary' visual='fill' classes='rounded font-semibold mt-2'>
                        Confirm create new user
                    </RectButton>
                </form>
            </DrawerOne>
        </>
    )
}

export default Users