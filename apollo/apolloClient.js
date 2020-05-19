import React from 'react'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

let globalApolloClient = null;

require('dotenv').config();

export function withApollo(PageComponent, { ssr = true } = {}) {
    const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
        const client = apolloClient || initApolloClient(undefined, apolloState);
        return (
            <ApolloProvider client={client}>
                <PageComponent {...pageProps} />
            </ApolloProvider>
        )
    };

    if (process.env.NODE_ENV !== 'production') {
        const displayName =
            PageComponent.displayName || PageComponent.name || 'Component';

        if (displayName === 'App') {
            console.warn('This withApollo HOC only works with PageComponents.')
        }

        WithApollo.displayName = `withApollo(${displayName})`
    }

    if (ssr || PageComponent.getInitialProps) {
        WithApollo.getInitialProps = async ctx => {
            const { AppTree } = ctx;

            const apolloClient = (ctx.apolloClient = initApolloClient({
                res: ctx.res,
                req: ctx.req,
            }));

            let pageProps = {};
            if (PageComponent.getInitialProps) {
                pageProps = await PageComponent.getInitialProps(ctx)
            }

            if (typeof window === 'undefined') {
                if (ctx.res && ctx.res.finished) {
                    return pageProps
                }

                if (ssr) {
                    try {
                        const { getDataFromTree } = await import('@apollo/react-ssr');
                        await getDataFromTree(
                            <AppTree pageProps={{...pageProps, apolloClient}}/>
                        )
                    } catch (error) {
                        console.error('Error while running `getDataFromTree`', error)
                    }

                    Head.rewind()
                }
            }

            const apolloState = apolloClient.cache.extract();

            return {
                ...pageProps,
                apolloState,
            }
        }
    }

    return WithApollo
}

function initApolloClient(ctx, initialState) {
    if (typeof window === 'undefined') {
        return createApolloClient(ctx, initialState)
    }
    if (!globalApolloClient) {
        globalApolloClient = createApolloClient(ctx, initialState)
    }

    return globalApolloClient
}

function createApolloClient(ctx = {}, initialState = {}) {
    const ssrMode = typeof window === 'undefined';
    const cache = new InMemoryCache().restore(initialState);

    return new ApolloClient({
        ssrMode,
        link: createIsomorphLink(ctx),
        cache,
    })
}

function createIsomorphLink(ctx) {
    if (typeof window === 'undefined') {
        const { SchemaLink } = require('apollo-link-schema');
        const { schema } = require("../server/apollo/schema");
        return new SchemaLink({ schema, context: ctx })
    } else {
        const { HttpLink } = require('apollo-link-http');
        return new HttpLink({
            uri: '/graphql',
            credentials: 'same-origin'
        })
    }
}
