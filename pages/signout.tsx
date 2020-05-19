import React, { FunctionComponent } from 'react'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { withApollo } from '../apollo/apolloClient';

const SignOutMutation = gql`
    mutation SignOutMutation {
        signOut
    }
`

const SignOutPage: FunctionComponent = () => {
    const client = useApolloClient()
    const router = useRouter()
    const [signOut] = useMutation(SignOutMutation)

    React.useEffect(() => {
        signOut().then(() => {
            client.resetStore().then(() => {
                router.push('/signin')
            })
        })
    }, [signOut, router, client])

    return <p>Выход...</p>
}

export default withApollo(SignOutPage)

