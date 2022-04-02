import { ApolloClient, InMemoryCache } from "@apollo/client"

export const apiClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URI,
    cache: new InMemoryCache(),
});