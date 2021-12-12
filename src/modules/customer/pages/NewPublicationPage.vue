<template>
    <div class="marginsX-2 publication-container">
       
        
    </div>
    <Loading 
        v-model:active="isLoading"
        :can-cancel="true"
        :is-full-page="fullPage"
    />

</template>

<script>
import jwt_decode from "jwt-decode";
import gql from "graphql-tag";
import { defineAsyncComponent } from 'vue';
import moment from 'moment';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Swal from 'sweetalert2';

export default {
    props: {
        productId:{
            type: String,
            default: false,
        },
    },
    components:{
        Loading,
    },
    data() {
        return {
            responsiveOptions: [
                {
                    breakpoint: '1280px',
                    numVisible: 4,
                    numScroll: 1
                },
                {
                    breakpoint: '1024px',
                    numVisible: 3,
                    numScroll: 1
                },
                {
                    breakpoint: '768px',
                    numVisible: 5,
                    numScroll: 1
                },
                {
                    breakpoint: '640px',
                    numVisible: 4,
                    numScroll: 1
                },
                {
                    breakpoint: '480px',
                    numVisible: 3,
                    numScroll: 1
                },
            
                {
                    breakpoint: '320px',
                    numVisible: 2,
                    numScroll: 1
                },
		    ],
    

        }
    },
    methods: {
       
        createPublication: async function(){
            this.isLoading = true;
            await this.$apollo.mutate({
                mutation: gql`
                    mutation($publicationInput: PublicationInput!) {
                        createPublication(publicationInput: $publicationInput) {
                            product {
                            _id
                            }
                        }
                    }
                `,
                variables: {
                    publicationInput: {
                        userId: Number(),
                        description: "",
                        product: {
                            name:"", 
                            price: Number(""),
                            stock: Number(),
                            category: "",
                            imgUrls: [],
                            userId: Number(),
                            features: {
                                color: "",
                                material: "",
                                department: "",
                            },
                        },
                    },                      
                },              
            })
            .then(response => {
 
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    text: 'Tu publicación ha sido creada!',
                    showConfirmButton: false,
                    timer: 2500
                });
                
            }).catch(e => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    text: 'Ha ocurrido un error, por favor vuelve a intentarlo.',
                    showConfirmButton: false,
                    timer: 2500
                });
                console.log(JSON.stringify(e, null, 2));
            });
            this.isLoading = false;
        },

    },
    created: async function(){
        this.moment = moment;
    },

}
</script>

<style lang="css" scoped>



</style>