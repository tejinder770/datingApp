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
    inputType: 'select';
    options?: FormInputOption[];
}

export interface FileInput extends FormInputBase {
    inputType: 'file';
    accept: string;
}

export type FormInput = TextInput | RadioInput | SelectInput | FileInput;

export interface Product {
    _id: string;
    title: string;
    description: string;
    price: string | number;
    image: string | null;
    pdf: string | null;
    createdAt?: string;
}

export interface ProductFormData {
    title: string;
    description: string;
    price: string;
    image: File | string | null;
    pdf: File | string | null;
}

export interface FormProps {
    formName: 'add' | 'update';
    formData: ProductFormData;
    onProductChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isUploading: boolean;
    onSubmitClick: (e: React.FormEvent) => void;
    onCancelClick: () => void;
    imageInputRef: React.RefObject<HTMLInputElement>;
    pdfInputRef: React.RefObject<HTMLInputElement>;
}

export interface ApiResponse<T> {
    data?: {
        status?: number;
        data?: T;
        message?: string;
    };
    error?: string;
    status?: number;
}

export interface TableProps {
    productsData: Product[];
    onEditClick: (product: Product) => void;
    onDeleteClick: (productId: string) => void;
}