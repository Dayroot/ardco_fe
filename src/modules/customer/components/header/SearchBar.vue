<template>
    <div class="w-40% relative max-w-md xs:w-1/2">
        <div :class="{'search-bar':true, 'open-search-bar':openSearchBar}">
                <button class="back-button" @click="$emit('closeSearchBar')">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <input class="search-bar__input" v-model="searchInput" @keyup="setSearch" type="text" name="" id="" placeholder="¿Qu&eacute; Est&aacute;s Buscando?">
                <button class="search-bar__button" v-on:click="setSearch">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
        </div>
        <div class="extendable" v-if="openExtendable"  v-click-outside="closeExtendable">
            <div v-for="(product,index) in productsfilter" :key="index" >
                <!-- single cart -->
                <div class="flex items-center md:justify-between gap-4 md:gap-6 p-4 border border-gray-200 rounded flex-wrap md:flex-nowrap text-color-secondary-2-0">
                    <!-- cart image -->
                    <div class="w-28 h-20 flex-shrink-0 ">
                        <img :src=" product.imgUrls[0]" class="w-full h-full object-cover rounded">
                    </div>
                    <!-- cart image end -->
                    <!-- cart content -->
                    <div class="w-70% overflow-hidden truncate">
                        <router-link
                            :to="{name: 'productDetailPage', params: {productId:  product._id}}"
                            class=" mb-3 xl:text-xl textl-lg font-normal uppercase hover:text-color-primary-0 transition"
                        >
                            {{ product.name}}
                        </router-link>
                        <p class="text-primary font-semibold">${{ product.price}}</p>
                    </div>
                    <!-- cart content end -->
        
                </div>
                <!-- single cart end -->
            </div>
        </div>
    </div>
</template>

<script>
import gql from "graphql-tag";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import vClickOutside from 'click-outside-vue3'

export default {
    emits: ['closeSearchBar'],
    props: ['openSearchBar'],

    data() {
        return {
            searchInput: "",
            products:[],  
            productsfilter:"",
            openExtendable: false,
        }
         
    },

    directives: {
      clickOutside: vClickOutside.directive
    },

    methods:{
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
                this.products = response.data.listProducts;
                this.productsfilter = this.products;
            })
            .catch(e => {
                console.log(JSON.stringify(e, null, 2));
            });
        },
        setSearch: function(){
            this.productsfilter = this.products.filter(product => {
                const result = product.name.search(new RegExp(this.searchInput),'i')
                if(result != -1)
                    return true 
            }); 
            
            if(this.productsfilter.length){
                this.openExtendable = true;
            }else{
                this.openExtendable = false;
            }

        },
    
        closeExtendable: function (){
            this.openExtendable = false;
        },

    },

     
    created: function(){
        this.getProducts();
        this.isLoading = false;
    },

    watch: {
        openSearchBar: function(){
        }
    }


}
</script>
<style lang="css" scoped>
    .back-button {
        @apply flex absolute md:hidden;
        @apply  text-color-primary-0 ml-1;
    }
    .search-bar {
        @apply hidden md:flex items-center;
        @apply w-full;
    }
    .open-search-bar{
        @apply flex  absolute w-full pr-6 h-16 max-w-full;
        @apply bg-color-secondary-2-1 z-30;
    }
    .search-bar__input {
        @apply  w-full h-10;
        @apply p-2 rounded-sm md:pl-2 pl-7;
        @apply ring-1 ring-color-primary-0 md:ring-color-primary-2;
    }
    .search-bar__input:focus {
        @apply border-none outline-none;
    }
    .search-bar__input::placeholder {
        @apply text-color-secondary-3-1; 
    }
    .search-bar__input:placeholder-shown {
        @apply overflow-ellipsis; 
    }
    .search-bar__button{
        @apply bg-color-primary-0 md:bg-color-primary-2 px-3 rounded-r-sm;
        @apply ring-1  ring-color-primary-0 md:ring-color-primary-2;
        @apply text-color-secondary-1-1 h-7 xs:h-10;
        @apply transition-all duration-150 ease-in-out;
    }
    .search-bar__button:hover {
        @apply bg-transparent text-color-primary-0 md:text-color-primary-2;
    }
    .extendable{
        @apply flex flex-col absolute bg-color-secondary-1-1 h-84 overflow-x-hidden overflow-y-scroll;
        @apply w-full; 
    }
</style>