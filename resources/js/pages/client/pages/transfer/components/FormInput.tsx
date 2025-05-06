import { AlertCircle } from 'lucide-react';
import { ChangeEvent, ReactNode } from 'react';

interface FormInputProps {
    label: string;
    type?: string;
    placeholder?: string;
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    icon?: ReactNode;
    required?: boolean;
    error?: string | null;
}

export const FormInput = ({ label, type = 'text', placeholder, value, onChange, icon, required = false, error = null }: FormInputProps) => {
    return (
        <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                {icon && <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{icon}</div>}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    className={`block w-full rounded-md shadow-sm pl-${icon ? '10' : '3'} border py-2 pr-3 ${error ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                    placeholder={placeholder}
                    required={required}
                />
            </div>
            {error && (
                <p className="mt-1 flex items-center text-sm text-red-500">
                    <AlertCircle className="mr-1 h-3 w-3" /> {error}
                </p>
            )}
        </div>
    );
};
