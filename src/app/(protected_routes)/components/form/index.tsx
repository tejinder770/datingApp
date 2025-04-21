import React from 'react';
import { FormInput, TextInput, RadioInput, SelectInput, FileInput } from '../../../utils/types';
import Link from 'next/link';
import { SIGNIN_ROUTE, SIGNUP_ROUTE } from '@/app/utils/routes';

export interface FormProps {
    formName: string;
    inputs?: FormInput[];
    countries: { country: string }[];
    states: { name: string }[];
    cities: string[];
    errors?: Record<string, string>;
    onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onFormSubmit: (e: React.FormEvent) => void;
    formData?: Record<string, any>;
}

const Form: React.FC<FormProps> = ({
    formName,
    inputs = [],
    countries = [],
    states = [],
    cities = [],
    errors = {},
    onFormChange,
    onFormSubmit,
    formData = {}
}) => {
    const getFieldValue = (fieldName: string) => {
        return formData[fieldName] || '';
    };

    const filteredInputs = formName === 'signin'
        ? inputs.filter(input => ['email', 'password'].includes(input.inputName))
        : inputs;

    const firstColumnInputs = formName === 'signup'
        ? filteredInputs.slice(0, Math.ceil(filteredInputs.length / 2))
        : [];
    const secondColumnInputs = formName === 'signup'
        ? filteredInputs.slice(Math.ceil(filteredInputs.length / 2))
        : filteredInputs;

    const renderInput = (input: FormInput, error: string) => {
        switch (input.inputType) {
            case 'radio':
                return (
                    <div className="flex gap-4">
                        {(input as RadioInput).options.map((option) => (
                            <div key={option.value} className="flex items-center">
                                <input
                                    type="radio"
                                    id={`${input.inputName}-${option.value}`}
                                    name={input.inputName}
                                    value={option.value}
                                    checked={getFieldValue(input.inputName) === option.value}
                                    onChange={onFormChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor={`${input.inputName}-${option.value}`}
                                    className="ml-2 block text-sm text-white"
                                >
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                );
            case 'select':
                let options: { value: string; label: string }[] = [];
                if (input.inputName === 'country') {
                    options = countries.map(country => ({
                        value: country.country,
                        label: country.country
                    }));
                } else if (input.inputName === 'state') {
                    options = states.map(state => ({
                        value: state.name,
                        label: state.name
                    }));
                } else if (input.inputName === 'city') {
                    options = cities.map(city => ({
                        value: city,
                        label: city
                    }));
                } else {
                    options = (input as SelectInput).options || [];
                }

                return (
                    <select
                        id={input.inputName}
                        name={input.inputName}
                        value={getFieldValue(input.inputName)}
                        onChange={onFormChange}
                        className={`w-full px-4 py-2 rounded-md placeholder:text-white text-white bg-transparent border ${error ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                        disabled={input.inputName === 'state' && !formData.country ||
                            input.inputName === 'city' && !formData.state}
                    >
                        <option value="">Select {input.labelName}</option>
                        {options.map((option, index) => (
                            <option key={index} value={option.value} className="text-black">
                                {option.label}
                            </option>
                        ))}
                    </select>
                );
            case 'file':
                return (
                    <>
                        <input
                            type="file"
                            id={input.inputName}
                            name={input.inputName}
                            onChange={onFormChange}
                            className={`w-full px-4 py-2 rounded-md text-white border ${error ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                            accept={(input as FileInput).accept}
                        />
                        {formData.userImage && (
                            <p className="text-sm text-gray-300 mt-1">
                                Selected: {formData.userImage}
                            </p>
                        )}
                    </>
                );
            default:
                return (
                    <input
                        type={(input as TextInput).inputType}
                        id={input.inputName}
                        name={input.inputName}
                        value={getFieldValue(input.inputName)}
                        placeholder={(input as TextInput).placeholder}
                        onChange={onFormChange}
                        className={`w-full px-4 py-2 rounded-md placeholder:text-slate-300 text-white border ${error ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
                    />
                );
        }
    };

    return (
        <div className='min-h-screen flex flex-col justify-center items-center p-4'>
            <h1 className='text-4xl text-white font-bold mb-8'>
                {formName === 'signin' ? 'Sign In' : 'Sign Up'}
            </h1>
            <div className={`w-full ${formName === 'signup' ? 'max-w-4xl' : 'max-w-xl'} p-8 rounded-lg bg-black/60 border border-gray-200`}>
                <form
                    onSubmit={onFormSubmit}
                    className="h-full flex flex-col"
                >
                    {formName === 'signup' ? (
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* First Column for Signup */}
                            <div className="flex-1">
                                {firstColumnInputs.map((input, index) => {
                                    const error = errors[input.inputName];
                                    return (
                                        <div key={index} className='mb-4 min-h-[80px]'>
                                            <label
                                                htmlFor={input.inputName}
                                                className='block text-sm font-medium text-white mb-1'
                                            >
                                                {input.labelName}
                                                {input.required && <span className="text-red-500"> *</span>}
                                            </label>
                                            {renderInput(input, error)}
                                            <div className={`min-h-[20px]`}>
                                                {error && (
                                                    <span className='block text-red-500 text-[13px] sm:text-sm'>
                                                        {error}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Second Column for Signup */}
                            <div className="flex-1">
                                {secondColumnInputs.map((input, index) => {
                                    const error = errors[input.inputName];
                                    return (
                                        <div key={index} className='mb-4 min-h-[80px]'>
                                            <label
                                                htmlFor={input.inputName}
                                                className='block text-sm font-medium text-white mb-1'
                                            >
                                                {input.labelName}
                                                {input.required && <span className="text-red-500"> *</span>}
                                            </label>
                                            {renderInput(input, error)}
                                            <div className={`min-h-[20px]`}>
                                                {error && (
                                                    <span className='block text-red-500 text-[13px] sm:text-sm'>
                                                        {error}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        /* Single column for Signin */
                        <div className="flex-1">
                            {secondColumnInputs.map((input, index) => {
                                const error = errors[input.inputName];
                                return (
                                    <div key={index} className='mb-4 min-h-[80px]'>
                                        <label
                                            htmlFor={input.inputName}
                                            className='block text-sm font-medium text-white mb-1'
                                        >
                                            {input.labelName}
                                            {input.required && <span className="text-red-500"> *</span>}
                                        </label>
                                        {renderInput(input, error)}
                                        <div className={`min-h-[20px]`}>
                                            {error && (
                                                <span className='block text-red-500 text-[13px] sm:text-sm'>
                                                    {error}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <div className='text-white mt-4'>
                        {formName === 'signup' ? (
                            <p>Already have an account? <Link href={SIGNIN_ROUTE} className='hover:underline'>SignIn</Link></p>
                        ) : (
                            <p>Dont have an account? <Link href={SIGNUP_ROUTE} className='hover:underline'>SignUp</Link></p>
                        )}
                    </div>
                    <button
                        type='submit'
                        className='w-full mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-medium rounded-md transition-colors'
                    >
                        {formName === 'signin' ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Form;