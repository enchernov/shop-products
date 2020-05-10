import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { withApollo } from '../apollo/client'

const SignOutMutation = gql`
    mutation SignOutMutation {
        signOut
    }
`

const SignOut = () => {
    const client = useApolloClient()
    const router = useRouter()
    const [signOut] = useMutation(SignOutMutation)

    React.useEffect(() => {
        signOut().then(() => {
            client.resetStore().then(() => {
                router.push('/')
            })
        })
    }, [signOut, router, client])
}

export default withApollo(SignOut)
