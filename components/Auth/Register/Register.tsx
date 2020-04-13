import React, {FormEvent, useState} from 'react';
import {InputField} from "../InputField/InputField";

interface IUser{
    username: string;
    email: string;
    password: string;
}

type Props = {
    initialData: IUser;
    onSubmit: (registerData: IUser) => FormEvent
}

const useFieldChange = (setState: any) => (fieldName: string) => (fieldValue: string) => {
    setState((state: object) => ({
        ...state,
        [fieldName]: fieldValue,
    }));
};

const Register: React.FunctionComponent<Props> = ({ initialData, onSubmit }) => {
    const [registerData, setRegisterData] = useState<IUser>(initialData);
    const handleChange = useFieldChange(setRegisterData);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(registerData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputField
                type="text"
                label="Введите логин"
                name="username"
                id="username"
                value={registerData.username}
                onChange={handleChange('username')}
            />
            <InputField
                type="email"
                label="Введите email"
                name="email"
                id="email"
                value={registerData.email}
                onChange={handleChange('email')}
            />
            <InputField
                type="password"
                label="Введите пароль"
                name="password"
                id="password"
                value={registerData.password}
                onChange={handleChange('password')}
            />
            <button>Зарегистрироваться</button>
        </form>
    );
};

export default Register;
