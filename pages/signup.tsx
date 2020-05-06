import React from "react";
import Layout from '../components/Layout'
import Register from "../components/Auth/Register/Register";
import { initialData } from "../utils/sample-data";

import { withApollo } from '../apollo/client';

const SignUp = () => {
    return (
        <Layout title="Регистрация">
            <Register data={initialData} />
        </Layout>
    );
};

export default withApollo(SignUp)
