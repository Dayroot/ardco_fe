import jwt_decode from "jwt-decode";
import gql from "graphql-tag";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';

const apolloClient = new ApolloClient({
    link: createHttpLink({ uri: 'https://ardco-api-gateway.herokuapp.com/' }),
    cache: new InMemoryCache()
})

const isAuthenticatedUser = async() => {

    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');

    if( !access_token && !refresh_token)
        return false;
    
    try {
        var result = await apolloClient.mutate({
            mutation: gql `
                mutation($refresh: String!) {
                    refreshToken(refresh: $refresh) {
                    access
                    }
                }
            `,
            variables: {
                refresh: refresh_token,
            },
        });
        localStorage.setItem("token_access", result.data.refreshToken.access);
        return true;
    } catch (error) {
        localStorage.clear();
        alert("Su sesión expiró, por favor vuelva a iniciar sesión");
        return false;
    }
};

export default isAuthenticatedUser;