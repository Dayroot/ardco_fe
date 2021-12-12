<template>
    <div class="wrapper marginsX-2 p-6">
        <div class="nav">
            <button :class="{'button-nav':true, 'button-nav-active':selectPublications}" @click="setSelection('publications')">
                Mis publicaciones
            </button>
            <!-- <button :class="{'button-nav':true, 'button-nav-active':selectQuestions}" @click="setSelection('questions')">
                Preguntas
            </button> -->
        </div>
        <div class="content">
            <my-publications></my-publications>
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
            selectPublications: true,
            selectQuestions: false,
        }
    },
    methods:{
        setSelection: function(selection){
            if(selection == 'questions' && this.selectPublications){
                this.selectPublications = false;
                this.selectQuestions = true;
            }
            else if(selection == 'publications' && this.selectQuestions){
                this.selectPublications = true;
                this.selectQuestions = false;
            }

        },
    },
    created: function(){
        this.isLoading = false;
        this.moment = moment;
    }
}
</script>

<style lang="css" scoped>

.wrapper {
    @apply flex flex-col mt-10  text-color-secondary-2-0 gap-6;
    @apply bg-color-secondary-1-1 shadow;
}
.button-nav{
    @apply h-full w-full  py-3 text-base uppercase font-medium;
    @apply flex justify-center;
    @apply hover:text-color-primary-0 transition;
}
.nav{
    @apply w-full flex  items-center justify-around;
}
.button-nav-active{
    @apply border-color-primary-2 border-b-2 text-color-primary-0;
}
    
</style>