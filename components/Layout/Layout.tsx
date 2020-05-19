import React, { FunctionComponent } from 'react'
import Head from 'next/head'
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import Header from "./Header";
import Footer from "./Footer";
import { LayoutProps } from "../../types";

const ViewerQuery = gql`
    query {
        viewer {
            _id
            username
            email
        }
    }
`;

const Layout: FunctionComponent<LayoutProps> = ({ children, title = '' }) => {
    const { data, loading, refetch } = useQuery(ViewerQuery);

    if (loading) {
        return <p>Загрузка</p>;
    }
    else {
        refetch();
    }

    return (
        <>
            <Head>
                <title>{ title }</title>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <Header isAuth={ data.viewer } />
            { children }
            <Footer />
        </>
    )
}

export default Layout
