<template>
    <div class="flex gap-4 p-1">
        <div class="h-24 w-32 overflow-hidden">
            <img class="w-full h-full object-cover rounded" :src="publication.product.imgUrls[0]" alt="">
        </div>
        <div class="flex justify-between w-full">
            <div class="flex flex-col gap-2">
                <p class=" text-lg ">{{publication.product.name}}</p>
                <div class="flex gap-8">
                    <div class="flex flex-col justify-between">
                        <router-link to="" class="review">
                            <div class="review__stars">
                                <span v-for="(star,index) in integerStars" :key="index">
                                    <i class="fas fa-star"></i>
                                </span>
                                <span v-if="decimalStar > 0">
                                    <i class="fas fa-star-half"></i>
                                </span>
                            </div>
                            <!-- <div class="review__quantity">({{publication.product.total_reviews}} reseñas)</div> -->
                        </router-link>
                        <p class=" text-gray-400">Promedio reseñas</p>
                        <!-- <p class=" text-gray-400">Ultima actualización</p> -->
                        <div class="flex gap-2">
                            <p class=" ">Stock:</p>
                            <span class=" text-green-600 font-semibold">{{publication.product.stock}}</span>
                        </div>
                    </div>
                    <div class="flex flex-col justify-between">
                        <div class="flex gap-2 text-color-primary-0 font-semibold"><span>{{publication.product.sold}}</span><p class=" font-normal">productos vendidos</p></div>
                        <p class=" text-gray-400">Ultima actualización</p>
                        <p class=" text-gray-400">{{moment(publication.publication_date, "YYYYMMDD").fromNow()}}</p>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <router-link :to="{name:'productDetailPage', params:{ productId: publication.product._id }}" class="button-2 "><i class="fas fa-edit"></i></router-link>
                <button class="button-2"><i class="far fa-trash-alt"></i></button>
            </div>
        </div>
    </div>
    <Loading 
        v-model:active="isLoading"
        :can-cancel="true"
        :is-full-page="fullPage"
    />
</template>

<script>

import { defineAsyncComponent } from 'vue';
import moment from 'moment';
import gql from "graphql-tag";
import Swal from 'sweetalert2';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    props:{
        publication:{
            type: Object,
            required: true
        }
    },
    data() {
        return {
            integerStars:0,
            decimalStar:0,
            isLoading: false,
            fullPage: true,
        }
    },
    methods:{
        setStars: function() {
            const stars = this.publication.product.average_reviews;
            if(stars%1 > 0){
                this.decimalStar = 1;
                this.integerStars = Math.floor(stars);
            }
            else
                this.integerStars = Math.round(stars);
        },
        deletePublication: async function(){
            this.isLoading = true;
            await this.$apollo.mutate({
                mutation: gql`
                    mutation($publicationId: String!) {
                        deletePublication(publicationId: $publicationId) {
                            deletedCount
                        }
                    }
                `,
                variables: {
                    publicationId: this.publication._id
                }
            })
            .then(response => {
    
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    text: 'La publicación ha sido eliminada!',
                    showConfirmButton: false,
                    timer: 2500
                });
            
            }).catch(e => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ha ocurrido un error, por favor vuelve a intentarlo nuevamente!',
                    showConfirmButton: false,
                    timer: 2500
                });
                console.log(JSON.stringify(e, null, 2));
            });
            this.isLoading = false;
        },

    },
    created: function(){
        this.moment = moment;
        this.setStars();
    }
}
</script>