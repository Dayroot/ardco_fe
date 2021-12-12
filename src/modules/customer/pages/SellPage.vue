<template>
    <div class="wrapper marginsX-2">
        <div class="nav">
            <button class="button-nav">
                Mis publicaciones
            </button>
            <button class="button-nav">
                Preguntas
            </button>
            <button class="button-nav">
                Ventas
            </button>
        </div>
        <div class="content">
            <div class="flex gap-4 p-1">
                <div class="h-24 w-32 bg-blue-400 overflow-hidden">
                    <img class="w-full h-full object-cover rounded-sm" src="" alt="">
                </div>
                 <div class="flex flex-col justify-between">
                     <p class=" text-lg">Nombre del producto</p>
                     <p class=" text-gray-400">Calificación promedio</p>
                     <p class=" text-gray-400">Ultima actualización</p>
                     <p class=" text-gray-400">Stock</p>
                 </div>
                 <div class="flex flex-col justify-between">
                     <p class=" text-gray-400">Cantidad de productos vendidos</p>
                     <p class=" text-gray-400">Ultima actualización</p>
                     <p class=" text-gray-400">Stock</p>
                 </div>
            </div>
        </div>
    </div>

    <loading v-model:active="isLoading"
                :can-cancel="true"
                :is-full-page="fullPage"
    />
</template>

<script>
import { defineAsyncComponent } from 'vue';
import gql from "graphql-tag";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css'
import Swal from 'sweetalert2';
import moment from 'moment';

export default {
    components:{
        Loading,
        MyPublications: defineAsyncComponent(() => import( /* webpackChunkName: "myPublications" */ '../components/sell/MyPublications')),
        Questions: defineAsyncComponent(() => import( /* webpackChunkName: "questions" */ '../components/sell/Questions')),
        Sales: defineAsyncComponent(() => import( /* webpackChunkName: "sales" */ '../components/sell/Sales')),
    },
    data() {
        return {
            isLoading: true,
            fullPage: false,
        }
    },
    created: function(){
        this.isLoading = false;
        this.moment = moment;
    }
}
</script>

<style lang="css" scoped>

.wrapper {
    @apply flex flex-col mt-10  text-color-secondary-2-0;
    @apply bg-color-secondary-1-1 shadow;
}
.button-nav{
    @apply h-full w-full  py-3 text-base uppercase font-medium;
    @apply flex justify-center border-b-2 hover:border-color-primary-2 transition;
    @apply hover:text-color-primary-0
}
.nav{
    @apply w-full flex  items-center justify-around;
}
.content {
    
}
    
</style>