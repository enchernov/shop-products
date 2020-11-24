import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import withApollo from 'next-with-apollo'
import fetch from 'isomorphic-unfetch'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default withApollo((initialState: NormalizedCacheObject = {}) => {
  return new ApolloClient<NormalizedCacheObject>({
    link: createHttpLink({
      uri: `${process.env.STRAPI_API_URL}/graphql`,
      credentials: 'same-origin',
      fetch,
      fetchOptions: () => {
        const token = null
        return {
          headers: {
            Authorization: token ? `Bearer ${token}` : null,
          },
        }
      },
    }),
    ssrMode: typeof window === 'undefined',
    cache: new InMemoryCache().restore(initialState),
  })
})
