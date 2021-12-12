<template>
    <div class="flex flex-col gap-6" v-if="categories && products">
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

        <div class="marginsX-1 ">
            <h2 class="carousel__title">Comprar por categoria!</h2>
            <div class="grid lg:grid-cols-2 sm:grid-cols-2 gap-3">
                <div v-for="(category, index) in categories" :key="index">
                    <div>
                        <router-link
                            :to="{name:'products', params:{ categoryId: category._id, categoryName: category.name } }"
                            class="flex justify-center items-center overflow-hidden h-56 w-full relative rounded"
                        >
                            <img class="object-cover w-full h-full" :src="category.img" alt="">
                            <div class=" z-10 absolute bg-black bg-opacity-40 w-40% h-20% justify-center items-center flex rounded hover:scale-105 transform transition">
                                <p class="text-color-secondary-1-1 hover:text-color-primary-0 transition capitalize">{{category.name}}</p>
                            </div>
                            <div class="category__back-drop"></div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>    


        <div class="marginsX-1">
            <h2 class="carousel__title">Nuevos Productos!</h2>
            <Carousel
                :value="products"
                :numVisible="4"
                :numScroll="1"
                :responsiveOptions="responsiveOptions"
                :circular="true"
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
            products:null,
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
            categories: null,
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
        },
        getCategories: async function(){
            await this.$apollo.query({
                query: gql`
                    query {
                        listCategories {
                            _id
                            name
                            img
                        }
                    }
                `,
                variables: {           
                }
            })
            .then( response => {
                this.categories = response.data.listCategories;
            })
            .catch(e => {
                console.log(JSON.stringify(e, null, 2));
            });
        }
    },
    created: function(){
        this.getProducts();
        this.getCategories();
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
        @apply text-color-secondary-2-0 text-3xl mb-6;
    }
    .category__back-drop {
        @apply bg-black bg-opacity-20 hover:bg-opacity-50 transition;
        @apply rounded-md absolute w-full h-full;
    }

</style>