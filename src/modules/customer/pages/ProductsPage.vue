<template>
    <div class="marginsX-1 pt-5" v-if="products">
        <product-section
            :products="products"
        >
        </product-section>
    </div>
    <loading v-model:active="isLoading"
                :can-cancel="true"
                :is-full-page="fullPage"
    />
</template>

<script>
import gql from "graphql-tag";
import { defineAsyncComponent } from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default{
    props : {
        categoryId:{
            type: String,
            required: true,
        },
        categoryName:{
            type: String,
            required: true,
        }
    },
    components:{
        ProductSection: defineAsyncComponent(() => import( /* webpackChunkName: "productSection" */ '../components/products/ProductSection')),
        Loading,
    },
    data: function(){
        return {
            products:null,
            isLoading: false,
            fullPage: true,
        } 
    },
    methods:{
        getProducts: async function(){
            this.isLoading = true;
            await this.$apollo.query({
                query: gql`
                    query ($categoryId: String!) {
                        productsByCategory(categoryId: $categoryId) {
                            _id
                            name
                            price
                            stock
                            sold
                            features {
                                color
                                material
                                department
                            }
                            category {
                                _id
                                name
                            }
                            imgUrls
                            average_reviews
                            total_reviews
                            userId
                        }
                    }
                `,
                variables: {
                    categoryId: this.categoryId,            
                }
            })
            .then( response => {
                this.products = response.data.productsByCategory;
            })
            .catch(e => {
                console.log(JSON.stringify(e, null, 2));
            });
            this.isLoading = false;
        },
    },
    watch: {
        categoryId: function(){
            this.getProducts();
        }
    },
    created: function() {
        this.isLoading = false;
        this.getProducts();
    },
    
}
</script>

