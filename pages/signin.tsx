import React, { FunctionComponent } from "react";
import Layout from '../components/Layout/Layout'
import SignIn from "../components/Auth/SignIn";
import { withApollo } from '../apollo/apolloClient';

const SignInPage: FunctionComponent = () => {
    return (
        <Layout title="Вход">
            <SignIn />
        </Layout>
    );
};

export default withApollo(SignInPage)
