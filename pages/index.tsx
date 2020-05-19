import React, { FunctionComponent } from 'react'
import Layout from '../components/Layout/Layout'
import Index from "../components/Index/Index";
import { withApollo } from '../apollo/apolloClient';

const IndexPage: FunctionComponent = () => {
    return (
        <Layout title="Главная">
            <Index />
        </Layout>
    )
};

export default withApollo(IndexPage)
