import React from "react";
import Layout from '../components/Layout'
import Login from "../components/Auth/Login/Login";
import { withApollo } from '../apollo/client';

const SignIn = () => {
    return (
        <Layout title="Вход">
            <Login/>
        </Layout>
    );
};

export default withApollo(SignIn)
