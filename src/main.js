import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import { setContext } from 'apollo-link-context'
import "@/assets/styles/main.css";
import vClickOutside from "click-outside-vue3";
import PrimeVue from 'primevue/config';
import Slider from 'primevue/slider';
import Carousel from 'primevue/carousel';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.css';
import 'primeicons/primeicons.css';


const httpLink = createHttpLink({
    uri: 'https://ardco-api-gateway.herokuapp.com/',
});

const authLink = setContext((root, { headers }) => {
    return {
        headers: {
            ...headers,
            "Authorization": localStorage.getItem("token_access") || ""
        }
    }
});

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

const apolloProvider = new createApolloProvider({
    defaultClient: apolloClient
});

createApp(App)
.use(vClickOutside)
.use(PrimeVue)
.use(router)
.use(apolloProvider)
.component('Slider', Slider)
.component('Carousel', Carousel)
.mount('#app')