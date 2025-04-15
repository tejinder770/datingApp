"use client"
import Form from '@/app/(protected_routes)/components/form'
import { formInputs } from '@/app/utils/inputs'
import React, { ChangeEvent, FormEvent, useState } from 'react'

export interface FormInputTypes {
    email: string
    password: string
}

const SignIn = () => {
    const [formData, setFormData] = useState<FormInputTypes>({
        email: '',
        password: ''
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
                formName={'signin'}
                inputs={formInputs}
                onFormChange={hanldeChange}
                onFormSubmit={handleSubmit}
            />
        </div>
    )
}

export default SignIn
