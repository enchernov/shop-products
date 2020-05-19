import React, { FormEvent, useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useRouter } from "next/router";
import { getErrorMessage } from "../../utils/form";
import { InputField } from "./InputField";
import { useFieldChange } from "../../utils/hooks";
import Link from "next/link";
import { IUser } from "../../interfaces";
import { ApolloError } from "apollo-server-errors";

const SignUpMutation = gql`
    mutation SignUpMutation(
        $username: String!, 
        $email: String!, 
        $password: String!,
        $confirmPassword: String!
    ) {
        signUp(input: { 
            username: $username, 
            email: $email, 
            password: $password,
            confirmPassword: $confirmPassword
        }) {
            user {
                username
                email
            }
        }
    }
`;

const SignUp = () => {
    const [registerData, setRegisterData] = useState<IUser>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [signUp] = useMutation(SignUpMutation);
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState<ApolloError>();
    const handleChange = useFieldChange(setRegisterData);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await signUp({
                variables: registerData
            });
            await router.push('/signin');
        } catch (error) {
            setErrorMsg(getErrorMessage(error))
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            { errorMsg && <p>{ errorMsg }</p>}
            <InputField
                name="username"
                type="text"
                label="Введите логин"
                autoComplete="username"
                required
                value={ registerData.username }
                onChange={ handleChange('username') }
            />
            <InputField
                name="email"
                type="email"
                label="Введите email"
                autoComplete="email"
                required
                value={ registerData.email }
                onChange={ handleChange('email') }
            />
            <InputField
                name="password"
                type="password"
                label="Введите пароль"
                autoComplete="password"
                required
                value={ registerData.password }
                onChange={ handleChange('password') }
            />
            <InputField
                name="confirmPassword"
                type="password"
                label="Повторите пароль"
                autoComplete="confirmPassword"
                required
                value={ registerData.confirmPassword }
                onChange={ handleChange('confirmPassword') }
            />
            <button type="submit">Зарегистрироваться</button>
            <Link href="signin">
                <a>Войти</a>
            </Link>
        </form>
    );
};

export default SignUp;
