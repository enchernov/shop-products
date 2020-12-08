import {
  createHttpLink,
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  from,
  NormalizedCacheObject,
} from '@apollo/client'
import withApollo from 'next-with-apollo'
import fetch from 'isomorphic-unfetch'
import Cookies from 'js-cookie'

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = Cookies.get('token')
  if (token) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : null,
      },
    }))
  }
  return forward(operation)
})

const apolloClient = (initialState: NormalizedCacheObject = {}) => {
  return new ApolloClient<NormalizedCacheObject>({
    link: from([
      authMiddleware,
      createHttpLink({
        uri: `${process.env.STRAPI_API_URL}/graphql`,
        credentials: 'same-origin',
        fetch,
      }),
    ]),
    ssrMode: typeof window === 'undefined',
    cache: new InMemoryCache().restore(initialState),
  })
}

export default withApollo(() => apolloClient)
