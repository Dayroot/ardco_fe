import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "@/assets/styles/main.css";
import vClickOutside from "click-outside-vue3";


createApp(App).use(vClickOutside).use(router).mount('#app')