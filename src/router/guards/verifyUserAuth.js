import jwt_decode from "jwt-decode";
import gql from "graphql-tag";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import Swal from 'sweetalert2';

const apolloClient = new ApolloClient({
    link: createHttpLink({ uri: 'https://ardco-api-gateway.herokuapp.com/' }),
    cache: new InMemoryCache()
})

const isAuthenticatedUser = async( to, from, next ) => {

    const access_token = localStorage.getItem('token_access');
    const refresh_token = localStorage.getItem('token_refresh');

    if( !access_token || !refresh_token)
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
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Oops...',
            text: 'Su sesión expiró, por favor vuelva a iniciar sesión',
            showConfirmButton: false,
            timer: 3000
        });
        next({name: 'login', params:{ logOut: true }})
    }
};

export default isAuthenticatedUser;