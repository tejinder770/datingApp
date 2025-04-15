import { FormInput } from "./types";

export const formInputs: FormInput[] = [
    {
        labelName: 'Username',
        inputName: 'username',
        inputType: 'text',
        placeholder: 'Enter username',
    },
    {
        labelName: 'Email',
        inputName: 'email',
        inputType: 'email',
        placeholder: 'Enter email',
    },
    {
        labelName: 'Gender',
        inputName: 'gender',
        inputType: 'radio',
        options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' }
        ],
    },
    {
        labelName: 'Age',
        inputName: 'age',
        inputType: 'text',
        placeholder: 'Enter age',
    },
    {
        labelName: 'Country',
        inputName: 'country',
        inputType: 'select',
        options: [],
    },
    {
        labelName: 'State',
        inputName: 'state',
        inputType: 'select',
        options: [],
    },
    {
        labelName: 'City',
        inputName: 'city',
        inputType: 'select',
        options: [],
    },
    {
        labelName: 'Profile Image',
        inputName: 'userImage',
        inputType: 'file',
        accept: 'image/*'
    },
    {
        labelName: 'Password',
        inputName: 'password',
        inputType: 'password',
        placeholder: 'Enter password',
    },
    {
        labelName: 'Confirm Password',
        inputName: 'confirmPassword',
        inputType: 'password',
        placeholder: 'Confirm password',
    },
];