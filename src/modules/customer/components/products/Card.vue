<template>    

    <div class="card">
        <!-- card image -->
        <figure class="group card__img"> 
            <img :src="product.imgUrls[0]" class="w-full h-42 object-cover">
            <!-- image back drop -->
            <div class="back-drop">
                <router-link 
                    :to="{name: 'productDetailPage', params: {productId: product._id}}" 
                    class="back-drop__icon"
                >
                    <i class="fas fa-search"></i>
                </router-link>
                <div 
                    class="back-drop__icon"
                    @click="setLike" 
                >
                    <i :class="{'far fa-heart': !like, 'fas fa-heart': like}"></i>
                </div>
            </div>
            <!-- image back drop end -->
        </figure>
        <!-- card image end -->

        <!-- card content -->
        <div class="card__content">

            <router-link :to="{name: 'productDetailPage', params: {productId: product._id}}">
                <h4 class="card__title">{{product.name}}</h4>
            </router-link>

            <div class="card__price">
                <p>${{product.price}}</p>
                <div 
                    class="icon-heart"
                    @click="setLike"
                >
                    <i :class="{'far fa-heart': !like, 'fas fa-heart': like}"></i>

                </div>
                
                <!-- <p class="text-sm text-gray-400 font-roboto line-through">$55789</p>  -->
            </div>

            <div class="review">
                <div class="review__stars">     
                    <span v-for="(star,index) in integerStars" :key="index">
                        <i class="fas fa-star"></i>
                    </span>
                    <span v-if="decimalStar > 0">
                        <i class="fas fa-star-half"></i>
                    </span>
                </div>

                <div class="review__quantity">({{product.total_reviews}})</div>
            </div>
        </div>
        <!-- card content end -->

        <!-- card button -->
        <button class="button-1 text-sm" @click="setConfirmAddToCart">
            <span class="mr-2">AGREGAR</span>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            </div>
        </button>
        <!-- card button end -->
    </div>
        
    <ConfirmAddToCartModal
        
        @closedConfirmAddToCard="confirmAddToCart = false"
        :openConfirmAddToCard="confirmAddToCart"
        :product="product"

    />

</template>

<script>
import { defineAsyncComponent } from 'vue';
export default{
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    components: {
        ConfirmAddToCartModal: defineAsyncComponent(() => import( /* webpackChunkName: "confirmAddToCartModal2" */ '../modals/ConfirmAddToCartModal')),
    },
    data() {
        return {
            like:false,
            integerStars:0,
            decimalStar:0,
            confirmAddToCart: false,
        }
    },
    methods: {
        setConfirmAddToCart: function(){
            this.confirmAddToCart = true;
        },
        setLike: function() {
            this.like = !this.like;
        },
        setStars: function() {
            const stars = this.product.average_reviews;
            if(stars%1 > 0){
                this.decimalStar = 1;
                this.integerStars = Math.floor(stars);
            }
            else
                this.integerStars = Math.round(stars);
        }
    },
    created() {
        this.setStars();
    },
}
</script>


<style lang="css" scoped>

    .card {
        @apply bg-color-secondary-1-1 max-w-screen-3xs;
        @apply rounded shadow overflow-hidden;
        
    }

    .icon-heart {
        @apply w-8 h-6 xl:hidden flex items-center justify-center;
    }

    .card__img {
        @apply relative h-42;
    }

    .back-drop {
        @apply hidden absolute xl:flex items-center justify-center;
        @apply opacity-0 group-hover:opacity-100 transition;
        @apply inset-0 bg-black bg-opacity-40;
    }

    .back-drop__icon {
        @apply flex items-center justify-center cursor-pointer;
        @apply text-white text-lg w-9 h-9 rounded-full;
        @apply bg-transparent hover:bg-color-primary-2 transition duration-150;
    }

    .card__content {
        @apply pt-4 pb-3 px-4 overflow-ellipsis;
    }

    .card__title {
        @apply uppercase font-medium text-sm mb-2 text-color-secondary-2-1;
        @apply hover:text-color-primary-0 transition duration-150 ease-in-out;
        @apply h-10 overflow-hidden overflow-ellipsis;
    }

    .card__price {
        @apply flex items-baseline mb-1 space-x-2 justify-between;
        @apply text-base text-color-primary-2 font-semibold;
    }

    .review {
        @apply flex items-center;
    }

    .review__quantity {
        @apply text-xs text-gray-500 ml-3;
    }

</style>