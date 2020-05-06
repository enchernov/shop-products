import React, {FormEvent, useState} from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useRouter } from "next/router";
import { getErrorMessage } from "../../../utils/form";
import { RegisterProps } from "../../../types";
import { InputField } from "../InputField/InputField";
import { useFieldChange } from "../../../utils/hooks";
import { IUser } from "../../../interfaces";
import Link from "next/link";


const SignUpMutation = gql`
    mutation SignUpMutation($username: String!, $email: String!, $password: String!) {
        signUp(input: { username: $username, email: $email, password: $password }) {
            user {
                id
                username
                email
            }
        }
    }
`;

const Register: React.FunctionComponent<RegisterProps> = ({ data }) => {
    const [registerData, setRegisterData] = useState(data);
    const [signUp] = useMutation(SignUpMutation);
    const router = useRouter();
    const [errorMsg, setErrorMsg] = React.useState();
    const handleChange = useFieldChange(setRegisterData);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await useFormRegisterSubmit(registerData);
        await router.push('/signin');
    };

    const useFormRegisterSubmit = async (registerData: IUser) => {
        try {
            await signUp({
                variables: registerData
            });
        } catch (error) {
            setErrorMsg(getErrorMessage(error))
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {errorMsg && <p>{errorMsg}</p>}
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
            <button type="submit">Зарегистрироваться</button>
            <Link href="signin">
                <a>Войти</a>
            </Link>
        </form>
    );
};

export default Register;
