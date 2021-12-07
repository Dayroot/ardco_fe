<template>
    <div class="flex">
        <!-- filter bar -->
        <div class="filter">
            <product-filter
                :products="products"
                :openModalWindow="openModalFilter"
                @closeModalFilter="openModalFilter=false"
                @activeFilters="filterProducts"
            >
            </product-filter>
        </div>
        <!-- filter bar end-->
        <div>
            <!-- sort bar -->
            <div class="sort-bar">
                <button 
                    class="sort-button sort-button--modal"
                    @click="openModalFilter=true"
                >
                    <span class="mr-2">Filtrar por</span>
                    <i class="fas fa-filter"></i>
                </button>
                <select class="sort-button" v-model="sortBy">
                    <option class="hidden" value="default">Ordenar por</option>
                    <option class=" text-xs" value="sales">Más vendidos</option>
                    <option class="text-xs" value="low">Menor precio</option>
                    <option class="text-xs" value="high">Mayor precio</option>
                </select>
            </div>
            <!-- sort bar end -->
            <!-- products -->
            <div class="products">
                <div class="message" v-if="noProducts">
                    <span>No hay productos disponibles para tu busqueda</span>
                </div>
                <div
                    v-for="(product, index) in filteredProducts"
                    :key="index"
                >
                    <card :product="product"/>
                </div>
            </div>
            <!-- products end-->
        </div>
    
    </div>

</template>

<script>

import { defineAsyncComponent } from 'vue';

export default{
    props: {
        products: {
            type: Array,
            required: true
        }
    },
    components:{
        Card: defineAsyncComponent(() => import( /* webpackChunkName: "card" */ './Card')),
        ProductFilter: defineAsyncComponent(() => import( /* webpackChunkName: "productFilter" */ './ProductFilter')),
    },
    data: function(){
        return {
            sortBy:"default",
            openModalFilter: false,
            filteredProducts: [],
            noProducts: false,
        }   
    },
    methods: {

        filterProducts: function(filters){
            
            if(!filters || !Object.keys(filters).length)
                this.filteredProducts = this.products;
            else {     
                this.filteredProducts = this.products.filter( product => {
                    for( let filterField of Object.keys(filters) ){

                        if( filterField == 'price'){
                            if(product.price < filters[filterField][0] || product.price > filters[filterField][1] )
                                return false;
                        }
                        else if( !filters[filterField].includes( product.category.features[filterField] ) )
                            return false;
                                                
                    }
                    return true    
                });
            } 
            
            if(!this.filteredProducts.length)
                this.noProducts = true;
            else
                this.noProducts = false;
        },
    },
    watch:{
        sortBy: function(){
            if( this.sortBy == "low"){
                this.filteredProducts.sort( function(a, b){
                    if(a.price > b.price)
                        return 1;
                    else if(a.price < b.price)
                        return -1;
                    return 0
                });
            }

            else if( this.sortBy == "high"){
                this.filteredProducts.sort( function(a, b){
                    if(a.price < b.price)
                        return 1;
                    else if(a.price > b.price)
                        return -1;
                    return 0
                });
            }

            else if( this.sortBy == "sales"){
                this.filteredProducts.sort( function(a, b){
                    if(a.sold < b.sold)
                        return 1;
                    else if(a.sold > b.sold)
                        return -1;
                    return 0
                });
            }
        }
    },
    mounted() {
        this.filterProducts();
    },
}
</script>

<style lang="css" scoped>

    .sort-bar {
        @apply mb-4 flex justify-start;
    }

    .sort-button {
        @apply focus:outline-none;
        @apply w-32 text-sm text-gray-600 px-4 py-3;
        @apply border-gray-300 shadow-sm rounded;
        @apply focus:ring-color-primary-0 focus:border-color-primary-0 focus:ring-2;
        @apply flex justify-start items-center bg-color-secondary-1-1 mr-4;
    }

    .sort-button--modal {
        @apply lg:hidden;
    }

    .filter {
        @apply lg:mr-6 xl:mr-8;
    }
    .products {
        @apply flex flex-col items-center;
        @apply mxs:grid 2xl:grid-cols-4 sm:grid-cols-3 mxs:grid-cols-2;
        @apply 2xl:gap-14 xl:gap-20 lg:gap-14 xs:gap-10 mxs:gap-8 gap-4;
    }
    .message {
        @apply text-gray-600 absolute;
    }


</style>

