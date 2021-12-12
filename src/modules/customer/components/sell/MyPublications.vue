<template>
    <div class="flex flex-col gap-4">
        <router-link :to="{name: 'newPublication'}" class="button-4 w-32 rounded cursor-pointer text-sm"><i class="fas fa-plus mr-2"></i>Publicar</router-link>
        <div class="flex flex-col gap-6">
            <div v-for="(publication, index) in publications" :key="index">
                <CardTypeList
                    :publication="publication"
                 />
            </div>
        </div>
        <loading v-model:active="isLoading"
                    :can-cancel="true"
                    :on-cancel="onCancel"
                    :is-full-page="fullPage"
        />
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import jwt_decode from "jwt-decode";
import gql from "graphql-tag";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css'
import Swal from 'sweetalert2';
import moment from 'moment';

export default {
    components:{
        Loading,
        CardTypeList: defineAsyncComponent(() => import( /* webpackChunkName: "cardTypeList" */ './CardTypeList')),
    },
    data() {
        return {
            isLoading: false,
            fullPage: true,
            publications: null
        }
    },
    methods:{
        getPublications: async function(){
            this.isLoading = true;
            const token = await localStorage.getItem("token_access");
            if ( token ){
                const userId = jwt_decode(token).user_id;
                await this.$apollo.query({
                    query: gql`
                        query ($userId: Int!) {
                            publicationsbyUserId(userId: $userId) {
                                _id
                                userId
                                publication_date
                                description
                                product {
                                    _id
                                    name
                                    price
                                    stock
                                    sold
                                    category {
                                        name
                                    }
                                    imgUrls
                                    average_reviews
                                    total_reviews
                                    discount
                                    features {
                                        color
                                        material
                                        department
                                    }
                                }
                            }
                        }
                    `,
                    variables: {
                        userId: userId,
                    }
                })
                .then( response => {
                    this.publications = response.data.publicationsbyUserId;
                    
                })
                .catch(e => {
                    console.log(JSON.stringify(e, null, 2));
                });
                this.isLoading = false;
            }else {
                this.isLoading = false;
            }
        },
    },
    created: async function(){
        this.moment = moment;
        await this.getPublications();
    }
}
</script>

<style lang="css">
    
</style>