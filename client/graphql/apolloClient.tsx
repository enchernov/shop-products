import {
    createHttpLink,
    ApolloClient,
    NormalizedCacheObject,
    InMemoryCache
} from '@apollo/client'
import withApollo from 'next-with-apollo'
import fetch from 'isomorphic-unfetch'

export default withApollo(({ initialState }) => {
    new ApolloClient({
        link: createHttpLink({
            uri: `${ process.env.STRAPI_API_URL }/graphql`,
            credentials: 'same-origin',
            fetch,
            fetchOptions: () => {
                const token = null
                return {
                    headers: {
                        Authorization: token ? `Bearer ${ token }` : null
                    }
                }
            }
        }),
        ssrMode: typeof window === 'undefined',
        cache: new InMemoryCache(initialState || {}),
    })
})




