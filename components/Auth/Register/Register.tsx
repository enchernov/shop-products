import React, {FormEvent, useState} from 'react';
import {InputField} from "../InputField/InputField";
import {useFieldChange} from "../../../utils/hooks";
import {RegisterProps} from "../../../types";
import {IUser} from "../../../interfaces";

const Register: React.FunctionComponent<RegisterProps> = ({ data }) => {
    const [registerData, setRegisterData] = useState(data);
    const handleChange = useFieldChange(setRegisterData);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        useFormRegisterSubmit(registerData);
    };

    const useFormRegisterSubmit = (registerData: IUser) => {
        console.log(registerData);
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
