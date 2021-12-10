import jwt_decode from "jwt-decode";
import gql from "graphql-tag";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';

const apolloClient = new ApolloClient({
    link: createHttpLink({ uri: 'https://ardco-api-gateway.herokuapp.com/' }),
    cache: new InMemoryCache()
})

const isOwnsPublication = async( route ) => {

    const token = localStorage.getItem("token_access");

    if ( token ){
        const userId = jwt_decode(token).user_id;
        await apolloClient.query({
            query: gql`
                query ($productId: String!) {
                    productById(productId: $productId) {
                      userId
                    }
                }
            `,
            variables: {
                productId: route.params.productId,
            }
        })
        .then( response => {
            const ownerId = response.data.productById.userId;
            if( ownerId == userId ){
                return true;
            }
            else 
                return false;
        })
        .catch(e => {
            console.log(JSON.stringify(e, null, 2));
        });
    }
    else{
        return false;
    }
};

export default isOwnsPublication;