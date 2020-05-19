import React, { FunctionComponent } from 'react'
import Layout from "../components/Layout/Layout";
import About from "../components/About/About";
import { withApollo } from '../apollo/apolloClient';

const AboutPage: FunctionComponent = () => (
    <Layout title="О нас">
        <About />
    </Layout>
);

export default withApollo(AboutPage);
