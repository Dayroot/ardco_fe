<template>

    <div class="marginsX-1 pt-5">
        <product-section
            :products="products"
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
            products:[], 
        } 
    }, 
    created: async function() {
        this.$apollo.query({
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
    },
    
}
</script>

