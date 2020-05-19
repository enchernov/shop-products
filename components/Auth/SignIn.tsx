import React, { FormEvent, useState } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import gql from "graphql-tag";
import Link from "next/link";

import { useFieldChange } from "../../utils/hooks";
import { getErrorMessage } from "../../utils/form";
import { InputField } from "./InputField";
import { IUser } from "../../interfaces";

const SignInMutation = gql`
    mutation SignInMutation($email: String!, $password: String!) {
        signIn(input: { email: $email, password: $password }) {
            user {
                email
                username
            }
        }
    }
`;

const SignIn = () => {
    const client = useApolloClient();
    const router = useRouter();
    const [signIn] = useMutation(SignInMutation);
    const [loginData, setLoginData] = useState<IUser>({
        email: '',
        password: ''
    });
    const [errorMsg, setErrorMsg] = useState();
    const handleChange = useFieldChange(setLoginData);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await client.resetStore();
            const { data } = await signIn({
                variables: loginData
            });
            if (data.signIn.user) {
                await router.push('/')
            }
        } catch (error) {
            setErrorMsg(getErrorMessage(error));
        }
    };

    return (
        <form onSubmit={ handleSubmit }>
            { errorMsg && <p>{ errorMsg }</p> }
            <InputField
                type="email"
                label="Введите email"
                name="email"
                autoComplete="email"
                required
                value={ loginData.email }
                onChange={ handleChange('email') }
            />
            <InputField
                type="password"
                label="Введите пароль"
                name="password"
                autoComplete="password"
                required
                value={ loginData.password }
                onChange={ handleChange('password') }
            />
            <button type="submit">Войти</button>
            <Link href="signup">
                <a>Зарегистрироваться</a>
            </Link>
        </form>
    );
};

export default SignIn;
