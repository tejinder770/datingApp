"use client"
import Form from '@/app/(protected_routes)/components/form'
import { formInputs } from '@/app/utils/inputs'
import React, { ChangeEvent, FormEvent, useState } from 'react'

export interface FormInputTypes {
    username: string
    email: string
    gender: string
    age: string
    country: string
    state: string
    city: string
    userImage: string
    password: string
    confirmpassword: string
}

const SignUp = () => {
    const [formData, setFormData] = useState<FormInputTypes>({
        username: '',
        email: '',
        gender: '',
        age: '',
        country: '',
        state: '',
        city: '',
        userImage: '',
        password: '',
        confirmpassword: ''
    })

    const hanldeChange = (e: ChangeEvent) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
    }

    return (
        <div className='h-auto w-full bg-[url(/form-bg.jpg)] opacity-80 bg-cover bg-center'>
            <Form
                formName={'signup'}
                inputs={formInputs}
                onFormChange={hanldeChange}
                onFormSubmit={handleSubmit}
            />
        </div>
    )
}

export default SignUp
