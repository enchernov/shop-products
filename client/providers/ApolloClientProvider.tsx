import React, { FunctionComponent, ReactNode } from "react"
import { ApolloProvider } from "@apollo/client"

interface IApolloProviderProps {
    children: ReactNode
}

const ApolloClientProvider: FunctionComponent<IApolloProviderProps> = (client, children) => {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}

export default ApolloClientProvider
