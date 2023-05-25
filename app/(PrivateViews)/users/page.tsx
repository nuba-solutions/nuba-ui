"use client"

import RectButton from '@/components/Buttons/RectButton';
import InputGroup from '@/components/Inputs/InputGroup';
import InputText from '@/components/Inputs/InputText';
import Label from '@/components/Inputs/Label';
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { IoPaperPlane } from 'react-icons/io5';

interface BaseFormInput {
    firstName: string;
    lastName: string;
    age: number;
}

const Users = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<BaseFormInput>({
        defaultValues: {
            firstName: '',
            lastName: '',
            age: undefined
        }
    });

    const onSubmit: SubmitHandler<BaseFormInput> = (data) => {
        console.log(data)
    }

    const classes: string = 'h-12 rounded-md text-slate-800 dark:text-slate-200 border-slate-500 w-full px-4 border bg-slate-50 dark:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500/30 focus-within:border-primary-500'

    return (
        <>
            <h1 className='mb-10'>Users</h1>

            <form onSubmit={handleSubmit(onSubmit)} className='flex gap-3'>
                <InputGroup full>
                    <Label name='firstName' text='First Name'/>
                    <input placeholder='Type in first name' {...register("firstName", { required: "This field is required", minLength: {value: 3, message: "Cannot be shorter than 3 chars"}, maxLength: 20 })} className={`${classes}`}/>
                    <p>{errors.firstName?.message}</p>
                </InputGroup>

                <InputGroup full>
                    <Label name='lastName' text='Last Name'/>
                    <input placeholder='Type in last name' {...register("lastName", { required: "This field is required", minLength: {value: 3, message: "Cannot be shorter than 3 characters"}, pattern: /^[A-Za-z]+$/i })} className={`${classes}`}/>
                    <p>{errors.lastName?.message}</p>
                </InputGroup>

                <InputGroup full>
                    <Label name='age' text='Age'/>
                    <input placeholder='Enter age' type="number" {...register("age", { min: {value: 18, message: "Cannot be less than 18"}, max: {value: 99, message: "Cannot be more than 99"} })} className={`${classes}`}/>
                    <p>{errors.age?.message}</p>
                </InputGroup>

                <RectButton type='submit' variant='primary' visual='fill' classes='rounded uppercase font-bold mt-6'>
                    <IoPaperPlane/>
                    Submit
                </RectButton>
            </form>
        </>
    )
}

export default Users