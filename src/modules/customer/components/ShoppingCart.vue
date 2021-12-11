<template>

    <div class="relative">
        <h1 class="sidebar__title">Carrito de Compras</h1>
        <section class="sidebar__products-wrapper">
            <div v-for="(product,index) in 12" :key="index">
                <article class="product-cart">
                    <figure class="product-cart__img">
                        <img src="" alt="">
                    </figure>
                    <div class="product-cart__content">
                        <div class="w-38 h-8 overflow-hidden">
                            <h3 class="product-cart__title">Sombrero volteao de la ciudad de cartagena</h3>
                        </div>
                        <div class="flex justify-between">
                            <p class="product-cart__price">$150000</p>
                            <div class="button-delete">
                                <i class="fas fa-minus-circle"></i>
                            </div>
                        </div>
                        <div :class="{'quantity-selector__content':true, 'pointer-events-none opacity-40':activateEdit}">
                            <div class="quantity-selector__button" @click="setQuantity('subtract')">-</div>
                            <div class="quantity-selector__value">{{8}}</div>
                            <div class="quantity-selector__button" @click="setQuantity('add')">+</div>
                        </div>
                    </div>
                </article>
            </div>
        </section>
        <footer class="sidebar__footer">
            <div class="flex gap-4">
                <p>Total:</p>
                <span class=" text-color-primary-2 font-light">{{325000}}</span>
            </div>
            <button class="button-2 hover:border-color-primary-2">Finalizar Compra</button>
        </footer>
    </div>

</template>
<script>
export default {
    methods:{
        setShoppingCart: function(){
            if(!localStorage.getItem('token_access')){

            }
        },
        getShoppingCart: async function(userId){
            await this.$apollo.query({
                query: gql`
                    query ($userId: Int!) {
                        shoppingCartByUserId(userId: $userId) {
                            _id
                            userId
                            products {
                                quantity
                                product {
                                    _id
                                    name
                                    price
                                    stock
                                    imgUrls
                                }
                            }
                        }
                    }
                `,
                variables: {
                    userId: userId            
                }
            })
            .then( response => {

            })
            .catch(e => {
                console.log(JSON.stringify(e, null, 2));
            });
        }
    }
}
</script>

<style lang="css" scoped>
    .sidebar__title {
        @apply text-2xl text-color-secondary-2-0 font-medium  text-center border-b-2 border-color-primary-2 mb-6 py-3 sticky z-20 top-0;
        @apply bg-color-secondary-1-1 shadow w-full;
    }
    .sidebar__products-wrapper {
        @apply flex flex-col gap-4 overflow-hidden;
    }

    .product-cart {
        @apply flex gap-2 shadow p-2 bg-gray-200 overflow-hidden;
    }

    .product-cart__title {
        @apply text-lg pr-2 w-full text-color-secondary-2-0  truncate;
    }

    .product-cart__img {
        @apply bg-purple-400 w-24 h-24 flex-shrink-0;
    }

    .product-cart__content {
        @apply flex flex-col gap-1;
    }
    .product-cart__price{
        @apply text-base text-color-primary-0 font-light;
    }

    .sidebar__footer{
    @apply text-2xl text-color-secondary-2-0 font-medium  text-center border-b-2  border-t-2 border-color-primary-2 mt-6 py-3 sticky z-20 -bottom-4;
        @apply bg-color-secondary-1-1 shadow w-full;
        @apply flex gap-2 justify-center flex-col;
    }

    .button-delete{
        @apply text-color-primary-2 hover:text-yellow-600 cursor-pointer transition hover:scale-105 transform;
    }
</style>