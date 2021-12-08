<template>
    <div>
        <Galleria
            :showIndicatorsOnItem="true"
            :showIndicators="true"
            :showThumbnails="false"
            :value="imgs"
            :circular="true"
            :autoPlay="true"
            :transitionInterval="1000"
        >
            <template #item="image">
                    <banner
                        :imgUrl="image.item"
                    ></banner>
            </template>
        </Galleria>
        <div class="mt-32 marginsX-1">
            <h2 class="carousel__title">Nuevos Productos!</h2>
            <Carousel
                :value="products"
                :numVisible="4"
                :numScroll="1"
                :responsiveOptions="responsiveOptions"
                :circular="true"
                :autoplayInterval="3000"
            >
                <template #item="product">
                        <card :product="product.data"/>
                </template>
            </Carousel>
        </div>
    </div>
</template>
<script>
import { defineAsyncComponent } from 'vue';
import gql from "graphql-tag";
import Loading from 'vue-loading-overlay';

export default {
    components:{
        Banner: defineAsyncComponent(() => import( /* webpackChunkName: "banner" */ '../components/Banner')),
        Card: defineAsyncComponent(() => import( /* webpackChunkName: "card" */ '../components/products/Card')),
    },
    data() {
        return {
            imgs: [ "https://media.fashionnetwork.com/m/0bcb/9013/b531/26bd/25e3/865f/f137/143e/35b6/1f76/1f76.jpg"],
            products:[],
        }
    },

    methods: {
        getProducts: async function(){
            this.$apollo.query({
                query: gql`
                    query {
                        listProducts {
                            _id
                            name
                            price
                            imgUrls
                            average_reviews
                            total_reviews
                            discount
                        }
                    }
                `,
                variables: {           
                }
            })
            .then( response => {
                this.products = response.data.listProducts;
            })
            .catch(e => {
                console.log(JSON.stringify(e, null, 2));
            });
            }
    },
    created: function(){
        this.getProducts();
    }
}
</script>

<style lang="css">
    .carousel__title{
        @apply text-color-secondary-2-0 text-3xl mb-6 pl-11;
    }
</style>