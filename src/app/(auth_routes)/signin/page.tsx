"use client"
import Form from '@/app/(protected_routes)/components/form'
import { formInputs } from '@/app/utils/inputs'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { HOME_ROUTE } from '@/app/constants/routes'

export interface FormInputTypes {
    email: string
    password: string
}

const SignIn = () => {
    const [formData, setFormData] = useState<FormInputTypes>({
        email: '',
        password: ''
    })
    const [formErrors, setFormErrors] = useState<Record<string, string>>({
        email: '',
        password: '',
    });
    const router = useRouter()

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, files } = e.target as HTMLInputElement;;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,16}$/;

        if (name === 'userImage' && files) {
            setFormData(prev => ({
                ...prev,
                userImage: files[0].name
            }));
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }

        if (name === 'email') {
            const isValidEmail = emailRegex.test(value);
            setFormErrors(prev => ({
                ...prev,
                email: isValidEmail ? '' : 'Invalid email format'
            }));
        } else if (name === 'password') {
            if (value.length < 8) {
                setFormErrors(prev => ({
                    ...prev,
                    password: 'Password must be at least 8 characters'
                }));
            } else if (!passwordRegex.test(value)) {
                setFormErrors(prev => ({
                    ...prev,
                    password: 'Must include uppercase, lowercase, number, and special character'
                }));
            } else {
                setFormErrors(prev => ({ ...prev, password: '' }));
            }
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};
        let hasError = false;
        Object.entries(formData).forEach(([key, value]) => {
            if (!value) {
                newErrors[key] = `${key} is required`;
                hasError = true;
            }
        });
        setFormErrors(prev => ({ ...prev, ...newErrors }));
        if (!hasError && Object.values(formErrors).every(error => !error)) {
            console.log('Form submitted:', formData);
            router.push(HOME_ROUTE)
        }
    };

    return (
        <div className='w-full bg-[url(/form-bg.jpg)] bg-fixed opacity-80 bg-cover bg-center'>
            <Form
                formName={'signin'}
                inputs={formInputs}
                errors={formErrors}
                onFormChange={handleChange}
                onFormSubmit={handleSubmit}
                formData={formData}
                countries={[]}
                states={[]}
                cities={[]}
            />
        </div>
    )
}

export default SignIn;
