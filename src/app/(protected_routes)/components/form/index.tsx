import React from 'react';
import { FormInput } from '../../../utils/types';

interface FormProps {
    formName: string;
    inputs?: FormInput[];
    onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onFormSubmit: (e: React.FormEvent) => void;
    formData?: Record<string, any>;
}

const Form: React.FC<FormProps> = ({
    formName,
    inputs = [],
    onFormChange,
    onFormSubmit,
    formData = {}
}) => {
    const isSelectField = (inputName: string) => {
        return ['country', 'state', 'city'].includes(inputName);
    };

    const getFieldValue = (fieldName: string) => {
        return formData[fieldName] || '';
    };

    const filteredInputs = formName === 'signin'
        ? inputs.filter(input => ['email', 'password'].includes(input.inputName))
        : inputs;

    return (
        <div className='min-h-screen flex flex-col justify-center items-center p-4'>
            <h1 className='text-4xl text-white font-bold mb-8'>
                {formName === 'signin' ? 'Sign In' : formName}
            </h1>
            <form
                onSubmit={onFormSubmit}
                className='w-full max-w-4xl p-8 rounded-lg bg-black/60 shadow-lg border border-gray-200'
            >
                {filteredInputs.map((input, index) => (
                    <div key={index} className='mb-6'>
                        <label
                            htmlFor={input.inputName}
                            className='block text-sm font-medium text-white mb-1'
                        >
                            {input.labelName}
                        </label>

                        {input.inputType === 'radio' ? (
                            <div className="flex gap-4">
                                {input.options?.map((option) => (
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
                        ) : isSelectField(input.inputName) ? (
                            <select
                                id={input.inputName}
                                name={input.inputName}
                                value={getFieldValue(input.inputName)}
                                onChange={onFormChange}
                                className='w-full px-4 py-2 rounded-md placeholder:text-white text-white bg-transparent border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                            >
                                <option value=''>Select {input.labelName}</option>
                                {input.options?.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={input.inputType}
                                id={input.inputName}
                                name={input.inputName}
                                value={input.inputType !== 'file' ? getFieldValue(input.inputName) : undefined}
                                placeholder={input.placeholder}
                                onChange={onFormChange}
                                className='w-full px-4 py-2 rounded-md placeholder:text-slate-300 text-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                accept={input.inputType === 'file' ? input.accept : undefined}
                            />
                        )}
                    </div>
                ))}

                <button
                    type='submit'
                    className='w-full mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-medium rounded-md transition-colors'
                >
                    {formName === 'signin' ? 'Sign In' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default Form;