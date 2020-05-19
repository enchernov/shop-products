export interface IUser {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export interface IInputProps {
    type: string;
    label: string;
    name: string;
    value: string | undefined;
    required: boolean;
    autoComplete: string;
    onChange: (fieldValue: string) => void;
}
