import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import { setContext } from 'apollo-link-context'
import "@/assets/styles/main.css";
import vClickOutside from "click-outside-vue3";
// import PrimeVue from 'primevue/config';
// import Slider from 'primevue/slider';

app.component('Dialog', Dialog);

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

createApp(App).use(vClickOutside).use(router).use(apolloProvider).mount('#app')

// .component('Slider', Slider)
// .use(PrimeVue)