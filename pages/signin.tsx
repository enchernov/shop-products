import React from "react";
import Layout from '../components/Layout'
import Login from "../components/Auth/Login/Login";
import { initialData } from "../utils/sample-data";
import { withApollo } from '../apollo/client';

const SignIn = () => {
    return (
        <Layout title="Вход">
            <Login data={initialData} />
        </Layout>
    );
};

export default withApollo(SignIn)
