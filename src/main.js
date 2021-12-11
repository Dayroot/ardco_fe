//Vue
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//Apollo
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import { setContext } from 'apollo-link-context'

import "@/assets/styles/main.css";

//External functions
import vClickOutside from "click-outside-vue3";
import moment from 'moment';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

//sweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

//Primevue
import Galleria from 'primevue/galleria';
import PrimeVue from 'primevue/config';
import Slider from 'primevue/slider';
import Carousel from 'primevue/carousel';
import Textarea from 'primevue/textarea';
import Dialog from 'primevue/dialog';
import ProgressBar from 'primevue/progressbar';
import ColorPicker from 'primevue/colorpicker';
import Sidebar from 'primevue/sidebar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputMask from 'primevue/inputmask';


import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.css';
import 'primeicons/primeicons.css';


const httpLink = createHttpLink({
    //uri: 'https://ardco-api-gateway.herokuapp.com/',
    uri: 'http://localhost:4000/',
});

const authLink = setContext((_, { headers }) => {
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

require('moment/locale/es');
moment.locale('es');


createApp(App)
.use(vClickOutside)
.use(PrimeVue)
.use(VueSweetalert2)
.use(router)
.use(apolloProvider)
.use(Loading)
.component('Slider', Slider)
.component('Carousel', Carousel)
.component('Textarea', Textarea)
.component('Dialog', Dialog)
.component('ProgressBar', ProgressBar)
.component('ColorPicker', ColorPicker)
.component('Galleria', Galleria)
.component('Sidebar', Sidebar)
.component('DataTable', DataTable)
.component('Column', Column)
.component('InputMask', InputMask)
.mount('#app')
