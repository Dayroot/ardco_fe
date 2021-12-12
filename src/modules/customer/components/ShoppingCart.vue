<template>

    <div class="relative">
        <h1 class="sidebar__title">Carrito de Compras</h1>
        <section class="sidebar__products-wrapper">
            <div v-for="(productCart, index) in shoppingCart" :key="index">
                <article class="product-cart">
                    <figure class="product-cart__img">
                        <img :src="productCart.product.imgUrls[0]" alt="" class="h-full w-full object-cover">
                    </figure>
                    <div class="product-cart__content">
                        <div class="w-38 h-8 overflow-hidden">
                            <h3 class="product-cart__title">{{productCart.product.name}}</h3>
                        </div>
                        <div class="flex justify-between">
                            <p class="product-cart__price">${{productCart.product.price}}</p>
                            <div class="button-delete" @click="setDeleteProductCart(productCart.product._id, index)">
                                <i class="fas fa-trash"></i>
                            </div>
                        </div>
                        <div :class="{'quantity-selector__content':true, 'pointer-events-none opacity-40':activateEdit}">
                            <div class="quantity-selector__button" @click="setQuantity('subtract', productCart.product._id, productCart.quantity, index)">-</div>
                            <div class="quantity-selector__value">{{productCart.quantity}}</div>
                            <div class="quantity-selector__button" @click="setQuantity('add',productCart.product._id, productCart.quantity, index)">+</div>
                        </div>
                    </div>
                </article>
            </div>
        </section>
        <footer class="sidebar__footer">
            <div class="flex gap-4">
                <p>Total:</p>
                <span class=" text-color-primary-2 font-light">{{total}}</span>
            </div>
            <button class="button-2 hover:border-color-primary-2" @click="redirectToCartPage">Finalizar Compra</button>
        </footer>
    </div>
    <loading v-model:active="isLoading"
                :can-cancel="true"
                :on-cancel="onCancel"
                :is-full-page="fullPage"
    />
</template>
<script>
import jwt_decode from "jwt-decode";
import gql from "graphql-tag";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    emits:['closeShoppingCart'],
    data() {
        return {
            shoppingCartUserAuth: null,
            shoppingCart: null,
            total:0,
            isLoading: true,
            fullPage: false,
        }
    },
    components:{ Loading },

    methods:{
        redirectToCartPage: async function(){
            await this.$emit('closeShoppingCart');
            this.$router.push({name: 'shoppingCartPage'});
        },
        setDeleteProductCart: async function(productId, index){
            const token = await localStorage.getItem('token_access');
            if(token){
                const userId = jwt_decode(token).user_id;
                await this.deleteProductCart(userId, productId);
                this.shoppingCart = this.shoppingCartUserAuth;
            }
            else{
                let storageCart = await JSON.parse(localStorage.getItem('shoppingCart'));
                storageCart.splice(index,1);
                localStorage.setItem('shoppingCart', JSON.stringify(storageCart));
                this.shoppingCart = storageCart;


            }
        },
        setQuantity: async function(type, productId, currentQuantity, index){
            this.isLoading = true;
            const token = await localStorage.getItem('token_access');
            let changeQuantity;
            if(type == 'subtract')
                changeQuantity = currentQuantity - 1;

            else if(type == 'add')
                changeQuantity = currentQuantity + 1;
            
            if(token){
                const userId = jwt_decode(token).user_id;
                await this.updateShoppingCart(userId, productId, changeQuantity);
                this.shoppingCart = this.shoppingCartUserAuth;
            }
            else{
                let storageCart = await JSON.parse(localStorage.getItem('shoppingCart'));
                storageCart[index].quantity = changeQuantity;
                localStorage.setItem('shoppingCart', JSON.stringify(storageCart));
                this.shoppingCart = storageCart;
            }
            this.total = 0;
            for(let item of this.shoppingCart){
                this.total += item.quantity * item.product.price;
            }
            this.isLoading = false;
        },
        setShoppingCart: async function(){

            const token = await localStorage.getItem('token_access');

            if(token){
                const userId = jwt_decode(token).user_id;
                await this.getShoppingCart(userId);
                this.shoppingCart = this.shoppingCartUserAuth;
            }
            else{
                this.shoppingCart = await JSON.parse(localStorage.getItem('shoppingCart'));
            }
            this.total = 0;
            for(let item of this.shoppingCart){
                this.total += item.quantity * item.product.price;
            }
            
        },
        getShoppingCart: async function(userId){
            this.isLoading = true;
            await this.$apollo.query({
                query: gql`
                    query ($userId: Int!) {
                        shoppingCartByUserId(userId: $userId) {
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
                this.shoppingCartUserAuth = response.data.shoppingCartByUserId.products.map( element => { return {...element}} );
            })
            .catch(e => {
                console.log(JSON.stringify(e, null, 2));
            });
            this.isLoading = false;
        },
        updateShoppingCart: async function(userId, productId, quantity){
            this.isLoading = true;
            await this.$apollo.mutate({
                mutation: gql`
                    mutation ($userId: Int!, $cartProductInput: CartProductInput) {
                        updateCartProduct(userId: $userId, cartProductInput: $cartProductInput) {
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
                    userId: userId,
                    cartProductInput: {
                        product: productId,
                        quantity: quantity
                    }
                }
            })
            .then( response => {
                this.shoppingCartUserAuth = response.data.updateCartProduct.products.map( element => { return {...element}} );
            })
            .catch(e => {
                console.log(JSON.stringify(e, null, 2));
            });
            this.isLoading = false;
        },
        deleteProductCart: async function(userId, productId){
            this.isLoading = true;
            await this.$apollo.mutate({
                mutation: gql`
                    mutation ($userId: Int!, $cartProductInput: CartProductInput) {
                        updateCartProduct(userId: $userId, cartProductInput: $cartProductInput) {
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
                    userId: userId,
                    cartProductInput: {
                        product: productId,
                    }
                }
            })
            .then( response => {
                this.shoppingCartUserAuth = response.data.updateCartProduct.products.map( element => { return {...element}} );
            })
            .catch(e => {
                console.log(JSON.stringify(e, null, 2));
            });
            this.isLoading = false;
        }
    },
    mounted: async function() {
        this.setShoppingCart();
    },
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
        @apply  w-24 h-24 flex-shrink-0;
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

</style>