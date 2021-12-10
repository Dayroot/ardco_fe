<template>

    <div class="relative">
        <h1 class="sidebar__title">Carrito de Compras</h1>
        <section class="sidebar__products-wrapper">
            <div v-for="(product,index) in 2" :key="index">
                <article class="product">
                    <figure class="product__img">
                        <img src="" alt="">
                    </figure>
                    <div class="product__content">
                        <div class="w-38 h-8 overflow-hidden">
                            <h3 class="product__title">Sombrero volteao de la ciudad de cartagena</h3>
                        </div>
                        <div class="flex justify-between">
                            <p class="product__price">$150000</p>
                            <div class=" text-color-primary-2">
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
            <p>Total:</p>
            <span class=" text-color-primary-2 font-light">{{325000}}</span>
        </footer>
    </div>

</template>
<script>
export default {
    
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

    .product {
        @apply flex gap-2 shadow p-2 bg-gray-200 overflow-hidden;
    }

    .product__title {
        @apply text-lg pr-2 w-full text-color-secondary-2-0  truncate;
    }

    .product__img {
        @apply bg-purple-400 w-24 h-24 flex-shrink-0;
    }

    .product__content {
        @apply flex flex-col gap-1;
    }
    .product__price{
        @apply text-base text-color-primary-0 font-light;
    }

    .sidebar__footer{
    @apply text-2xl text-color-secondary-2-0 font-medium  text-center border-b-2  border-t-2 border-color-primary-2 mt-6 py-3 sticky z-20 bottom-0;
        @apply bg-color-secondary-1-1 shadow w-full;
        @apply flex gap-2 justify-center;
    }
</style>