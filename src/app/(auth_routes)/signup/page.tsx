"use client"
import Form from '@/app/(protected_routes)/components/form'
import { LOGIN_ROUTE } from '@/app/constants/routes'
import { formInputs } from '@/app/utils/inputs'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

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
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({
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
    });
    const [countriesData, setCountriesData] = useState<[]>([])
    const [statesData, setStatesData] = useState<[]>([])
    const [citiesData, setCitiesData] = useState<[]>([])
    const router = useRouter()

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const countriesResponse = await axios.get('https://countriesnow.space/api/v0.1/countries');
                if (countriesResponse.data?.data) {
                    // console.log('countriesResponse', countriesResponse?.data)
                    setCountriesData(countriesResponse?.data?.data);
                }
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        }
        fetchCountries()
    }, [])

    useEffect(() => {
        if (formData.country) {
            const fetchStates = async () => {
                try {
                    const statesResponse = await axios.post('https://countriesnow.space/api/v0.1/countries/states', {
                        country: formData?.country
                    });
                    if (statesResponse) {
                        // console.log('statesResponse', statesResponse?.data)
                        setStatesData(statesResponse?.data?.data?.states)
                    }
                } catch (error) {
                    console.error('Error fetching states:', error)
                }
            }
            fetchStates()
        }
    }, [formData.country, countriesData])

    useEffect(() => {
        if (formData.country && formData.state) {
            const fetchCities = async () => {
                try {
                    const citiesResponse = await axios.post('https://countriesnow.space/api/v0.1/countries/state/cities', {
                        country: formData.country,
                        state: formData?.state
                    })
                    if (citiesResponse.data?.data) {
                        // console.log('citiesResponse', citiesResponse?.data)
                        setCitiesData(citiesResponse?.data?.data)
                    }
                } catch (error) {
                    console.error('Error fetching cities:', error)
                }
            }
            fetchCities()
        }
    }, [formData.country, formData.state])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, files } = e.target as HTMLInputElement;
        const nameRegex = /^([a-zA-Z]+(?:\s+[a-zA-Z]+)*)$/;
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

        if (name === 'username') {
            const nameValue = value;
            const cleanedValue = nameValue.replace(/[^a-zA-Z\s]/g, '');
            if (nameValue !== cleanedValue) {
                setFormErrors(prev => ({
                    ...prev,
                    username: 'Username should only contain alphabets'
                }));
            } else if (!nameValue.trim() || !nameRegex.test(nameValue)) {
                setFormErrors(prev => ({
                    ...prev,
                    username: 'Full name cannot have any space'
                }));
            } else if (nameValue.length < 3) {
                setFormErrors(prev => ({
                    ...prev,
                    username: 'Minimum three characters are required'
                }));
            } else {
                setFormErrors(prev => ({ ...prev, username: '' }));
            }
        } else if (name === 'email') {
            const isValidEmail = emailRegex.test(value);
            setFormErrors(prev => ({
                ...prev,
                email: isValidEmail ? '' : 'Invalid email format'
            }));
        } else if (name === 'gender') {
            if (!value) {
                setFormErrors(prev => ({
                    ...prev,
                    gender: 'plase select gender'
                }))
            } else {
                setFormErrors(prev => ({
                    ...prev,
                    gender: ''
                }))
            }
        } else if (name === 'age') {
            if (!value) {
                setFormErrors(prev => ({
                    ...prev,
                    age: 'please select age'
                }))
            } else {
                setFormErrors(prev => ({
                    ...prev,
                    age: ''
                }))
            }
        } else if (name === 'country') {
            // if (!value) {
            //     setFormErrors(prev => ({
            //         ...prev,
            //         country: 'plase select country'
            //     }))
            // } else {
            //     setFormErrors(prev => ({
            //         ...prev,
            //         country: ''
            //     }))
            // }
        } else if (name === 'state') {
            // if (!value) {
            //     setFormErrors(prev => ({
            //         ...prev,
            //         state: 'plase select state'
            //     }))
            // } else {
            //     setFormErrors(prev => ({
            //         ...prev,
            //         state: ''
            //     }))
            // }
        } else if (name === 'city') {
            // if (!value) {
            //     setFormErrors(prev => ({
            //         ...prev,
            //         city: 'plase select city'
            //     }))
            // } else {
            //     setFormErrors(prev => ({
            //         ...prev,
            //         city: ''
            //     }))
            // }
        } else if (name === 'userImage') {
            // if (!files || files.length === 0) {
            //     setFormErrors(prev => ({
            //         ...prev,
            //         userImage: 'Please choose an image'
            //     }));
            //     setFormData(prev => ({
            //         ...prev,
            //         userImage: ''
            //     }));
            // } else {
            //     const file = files[0];
            //     const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            //     if (!validTypes.includes(file.type)) {
            //         setFormErrors(prev => ({
            //             ...prev,
            //             userImage: 'Please upload a valid image (JPEG, PNG, GIF)'
            //         }));
            //         setFormData(prev => ({
            //             ...prev,
            //             userImage: ''
            //         }));
            //     } else {
            //         setFormErrors(prev => ({
            //             ...prev,
            //             userImage: ''
            //         }));
            //         setFormData(prev => ({
            //             ...prev,
            //             userImage: file.name
            //         }));
            //     }
            // }
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
        } else if (name === 'confirmpassword') {
            const confirmPassVal = value;
            if (confirmPassVal.includes(' ')) {
                setFormData(prev => ({ ...prev, confirmpassword: '' }));
                setFormErrors(prev => ({
                    ...prev,
                    confirmpassword: 'Confirmation password cannot contain spaces'
                }));
            } else if (confirmPassVal !== formData.password) {
                setFormErrors(prev => ({
                    ...prev,
                    confirmpassword: 'Passwords do not match'
                }));
            } else {
                setFormErrors(prev => ({ ...prev, confirmpassword: '' }));
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
            router.push(LOGIN_ROUTE)
        }
    };

    return (
        <div className='w-full bg-[url(/form-bg.jpg)] bg-fixed opacity-80 bg-cover bg-center'>
            <Form
                formName={'signup'}
                inputs={formInputs}
                countries={countriesData}
                states={statesData}
                cities={citiesData}
                errors={formErrors}
                onFormChange={handleChange}
                onFormSubmit={handleSubmit}
                formData={formData}
            />
        </div>
    );
};

export default SignUp;
