import React, { FormEvent, useState } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import gql from "graphql-tag";
import Link from "next/link";

import { InputField } from "../InputField/InputField";
import { useFieldChange } from "../../../utils/hooks";
import { getErrorMessage } from "../../../utils/form";

const SignInMutation = gql`
    mutation SignInMutation($email: String!, $password: String!) {
        signIn(input: { email: $email, password: $password }) {
            user {
                id
                email
                username
            }
        }
    }
`;

const Login: React.FunctionComponent = () => {
    const client = useApolloClient();
    const router = useRouter();
    const [signIn] = useMutation(SignInMutation);
    const [loginData, setLoginData] = useState({email: "", password:""});
    const [errorMsg, setErrorMsg] = useState();
    const handleChange = useFieldChange(setLoginData);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await useFormLoginSubmit(loginData);
    };

    const useFormLoginSubmit = async (loginData: {email: string, password: string}) => {
        try {
            await client.resetStore();
            const { data } = await signIn({
                variables: loginData
            });
            if (data.signIn.user) {
                await router.push('/')
            }
            console.log("Успешный вход: ", data.signIn.user.username)
        } catch (error) {
            setErrorMsg(getErrorMessage(error));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {errorMsg && <p>{errorMsg}</p>}
            <InputField
                type="email"
                label="Введите email"
                name="email"
                id="email"
                value={loginData.email}
                onChange={handleChange('email')}
            />
            <InputField
                type="password"
                label="Введите пароль"
                name="password"
                id="password"
                value={loginData.password}
                onChange={handleChange('password')}
            />
            <button type="submit">Войти</button>
            <Link href="signup">
                <a>Зарегистрироваться</a>
            </Link>
        </form>
    );
};

export default Login;
