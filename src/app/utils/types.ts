export interface FormInputOption {
    value: string;
    label: string;
}

export interface FormInputBase {
    labelName: string;
    inputName: string;
    inputType: string;
    placeholder?: string;
    required?: boolean;
}

export interface TextInput extends FormInputBase {
    inputType: 'text' | 'email' | 'password';
    placeholder: string;
}

export interface RadioInput extends FormInputBase {
    inputType: 'radio';
    options: FormInputOption[];
}

export interface SelectInput extends FormInputBase {
    map: unknown;
    inputType: 'select';
    options?: FormInputOption[];
}

export interface FileInput extends FormInputBase {
    inputType: 'file';
    accept: string;
}

export type FormInput = TextInput | RadioInput | SelectInput | FileInput;