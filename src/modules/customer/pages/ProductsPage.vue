<template>

    <div class="marginsX-1 pt-5">
        <product-section
            :products="productsByCategory"
        >
        </product-section>
    </div>


</template>

<script>
import gql from "graphql-tag";
import { defineAsyncComponent } from 'vue';

export default{
    props : {
        categoryId:{
            type: String,
            default: "61aed7ed51bb46f11ffb3b13",
        }
    },
    components:{
        ProductSection: defineAsyncComponent(() => import( /* webpackChunkName: "productSection" */ '../components/products/ProductSection')),

    },
    data: function(){
        return {
            productsByCategory:[],
            products:[],
        } 
    },
    apollo: {
        productsByCategory: {
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
            variables(){
                return {
                    categoryId: this.categoryId,
                };
            }
        },
    },
    
    created: function() {
        this.$apollo.queries.productsByCategory.refetch();
    },

    
}
</script>

