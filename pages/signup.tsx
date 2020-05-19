import React, { FunctionComponent } from "react";
import Layout from '../components/Layout/Layout'
import SignUp from "../components/Auth/SignUp";
import { withApollo } from '../apollo/apolloClient';

const SignUpPage: FunctionComponent = () => {
    return (
        <Layout title="Регистрация">
            <SignUp />
        </Layout>
    );
};

export default withApollo(SignUpPage)
