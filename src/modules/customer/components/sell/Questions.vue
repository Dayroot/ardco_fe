<template>
    <div>
        <h1>Mis publicaciones</h1>
        <div>

        </div>
    </div>
    <loading v-model:active="isLoading"
                :can-cancel="true"
                :on-cancel="onCancel"
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
    },
    data() {
        return {
            isLoading: true,
            fullPage: true,
        }
    },
    created: function(){
        this.moment = moment;
    }
}
</script>

<style lang="css">
    
</style>