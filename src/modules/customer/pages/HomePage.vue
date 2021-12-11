<template>
    <div>
        <Galleria
            :showThumbnails="false"
            :showItemNavigators="true"
            :value="banners"
            :circular="true"
            :autoPlay="true"
            :transitionInterval="1000"
        >
            <template #item="banner">
                    <banner
                        :banner="banner.item"
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
                :autoplayInterval="2000"
            >
                <template #item="product">
                        <card :product="product.data"/>
                </template>
            </Carousel>
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
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    emits: ['completedLogOut'],
    props: {
        logOut: {
            type: Boolean,
            default: false
        },
    },
    components:{
        Banner: defineAsyncComponent(() => import( /* webpackChunkName: "banner" */ '../components/Banner')),
        Card: defineAsyncComponent(() => import( /* webpackChunkName: "card" */ '../components/products/Card')),
        Loading
    },
    data() {
        return {
            banners: [ 
                {
                   img:"https://rtvc-assets-radionacional-v2.s3.amazonaws.com/s3fs-public/senalradio/articulo-noticia/galeriaimagen/colombia-2434911_1280.jpg",
                   title: "ARTE DE COLOMBIA",
                   body: "Los mejores productos tipicos en un solo lugar!"
                }
            ],
            products:[],
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
                    breakpoint: '640px',
                    numVisible: 2,
                    numScroll: 1
                },   
                {
                    breakpoint: '320px',
                    numVisible: 1,
                    numScroll: 1
                },
		    ],
            isLoading: true,
            fullPage: true,
        }
    },

    methods: {
        getProducts: async function(){
            await this.$apollo.query({
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
                this.products = response.data.listProducts.slice(-6,);
            })
            .catch(e => {
                console.log(JSON.stringify(e, null, 2));
            });
        }
    },
    created: function(){
        this.getProducts();
        this.isLoading = false;
    },
    watch: {
        logOut: function(){
            this.$emit('completedLogOut');
        }
    }
}
</script>

<style lang="css">
    .carousel__title{
        @apply text-color-secondary-2-0 text-3xl mb-6 pl-11;
    }
</style>