<template>    

    <div class="card">

        <!-- card image -->
        <figure class="group card__img"> 

            <img :src="product.imgUrls[0]" class="w-full">

            <div class="back-drop">
                <router-link to="" class="back-drop__icon">
                    <i class="fas fa-search"></i>
                </router-link>
                <router-link to="" class="back-drop__icon">
                    <i class="far fa-heart"></i> 
                </router-link>
            </div>

        </figure>
        <!-- card image end -->

        <!-- card content -->
        <div class="card__content">

            <router-link to="">
                <h4 class="card__title">{{product.name}}</h4>
            </router-link>

            <div class="card__price">
                <p>${{product.price}}</p>

                <div 
                    class="icon-heart"
                    @click="setLike"
                >
                    <i :class="{'far fa-heart': true, 'hidden': !like}"></i>
                    <i :class="{'fas fa-heart': true, 'hidden': like}"></i>
                </div>
                
                
                <!-- <p class="text-sm text-gray-400 font-roboto line-through">$55789</p>  -->
            </div>

            <div class="review">
                <div class="review__stars">     
                    <span v-for="(star,index) in product.average_review" :key="index">
                        <i class="fas fa-star"></i>
                    </span>
                </div>

                <div class="review__quantity">({{product.total_review}})</div>
            </div>

        </div>
        <!-- card content end -->

        <!-- card button -->
        <button class="button-1 text-sm">
            <label class="mr-2">AGREGAR</label>
            <i class="fas fa-cart-plus"></i>
        </button>
        <!-- card button end -->
    </div>

</template>

<script>

export default{
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            like:false,
        }
    },
    methods: {
        setLike: function() {
            this.like = !this.like;
        }
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
        @apply relative;
    }

    .back-drop {
        @apply hidden absolute xl:flex items-center justify-center;
        @apply opacity-0 group-hover:opacity-100 transition;
        @apply inset-0 bg-black bg-opacity-40;
    }

    .back-drop__icon {
        @apply flex items-center justify-center;
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

    .review__stars {
        @apply flex gap-1 text-sm text-yellow-400;
    }

    .review__quantity {
        @apply text-xs text-gray-500 ml-3;
    }

</style>