<template>
    <!-- cart wrapper -->
    <div class="container lg:grid grid-cols-12 gap-6 items-start pb-16 pt-4 marginsX-1">
        <!-- product cart -->
        <div class="xl:col-span-9 lg:col-span-8">
            <!-- cart title -->
            <div class="bg-gray-300 bg-opacity-40 rounded-t py-2 pl-12 pr-20 xl:pr-28 mb-4 hidden md:flex">
                <p class="text-gray-600 text-center">Producto</p>
                <p class="text-gray-600 text-center ml-auto mr-16 xl:mr-24">Cantidad</p>
                <p class="text-gray-600 text-center">Total</p>
            </div>
            <!-- cart title end -->

            <!-- shipping carts -->
            <div class="space-y-4">
                <div v-for="(productCart, index) in shoppingCart" :key="index">
                    <!-- single cart -->
                    <div
                        class="flex items-center md:justify-between gap-4 md:gap-6 p-4 border border-gray-200 rounded flex-wrap md:flex-nowrap text-color-secondary-2-0">
                        <!-- cart image -->
                        <div class="w-32 h-24 flex-shrink-0">
                            <img :src="productCart.product.imgUrls[0]" class="w-full h-full object-cover">
                        </div>
                        <!-- cart image end -->
                        <!-- cart content -->
                        <div class="md:w-1/3 w-full">
                            <router-link 
                                :to="{name: 'productDetailPage', params: {productId: productCart.product._id}}" 
                                class="mb-3 xl:text-xl textl-lg font-normal uppercase hover:text-color-primary-0 transition"
                            >
                                {{productCart.product.name}}
                            </router-link>
                            <p class="text-primary font-semibold">${{productCart.product.price}}</p>
                            <p :class="{'font-medium': true, 'text-green-600':productCart.product.stock, 'text-red-600': !productCart.product.stock, }">{{ productCart.product.stock == 0 ? "Agotado" : "En stock" }}</p>
                        </div>
                        <!-- cart content end -->
                        <!-- cart quantity -->
                        <div :class="{'quantity-selector__content':true, 'pointer-events-none opacity-40':activateEdit}">
                            <div class="quantity-selector__button" @click="setQuantity('subtract', productCart.product._id, productCart.quantity, index)">-</div>
                            <div class="quantity-selector__value">{{productCart.quantity}}</div>
                            <div class="quantity-selector__button" @click="setQuantity('add',productCart.product._id, productCart.quantity, index)">+</div>
                        </div>
                        <!-- cart quantity end -->
                        <div class="ml-auto md:ml-0">
                            <p class="text-primary text-lg font-semibold">${{productCart.product.price * productCart.quantity}}</p>
                        </div>
                        <div class="button-delete">
                            <i class="fas fa-trash"></i>
                        </div>
                    </div>
                    <!-- single cart end -->
                </div>
            </div>
            <!-- shipping carts end -->
        </div>
        <!-- product cart end -->
        <!-- order summary -->
        <div class="xl:col-span-3 lg:col-span-4 border border-gray-200 px-4 py-4 rounded mt-6 lg:mt-0">
            <h4 class="text-gray-800 text-lg mb-4 font-medium uppercase">ORDEN DE COMPRA</h4>
            <div class="space-y-1 text-gray-600 pb-3 border-b border-gray-200">
                <div class="flex justify-between">
                    <p>Subtotal</p>
                    <p>{{subtotal}}</p>
                </div>
                <div class="flex justify-between">
                    <p>Envio</p>
                    <p :class="{' text-green-600 font-medium':!costShipping}">{{ costShipping == 0 ? "Gratis" : costShipping }}</p>
                </div>
            </div>
            <div class="flex justify-between my-3 text-gray-800 font-semibold uppercase">
                <h4>Total</h4>
                <h4>{{total}}</h4>
            </div>

            <!-- checkout -->
            <button class="button-1 rounded-t" @click="redirectPayment">
                Ir a pagar
            </button>
            <!-- checkout end -->
        </div>
        <!-- order summary end -->
    </div>
    <!-- cart wrapper end -->
    <Loading 
        v-model:active="isLoading"
        :can-cancel="true"
        :is-full-page="fullPage"
    />
</template>

<script>
import jwt_decode from "jwt-decode";
import gql from "graphql-tag";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    data() {
        return {
            shoppingCartUserAuth: null,
            shoppingCart: null,
            total:0,
            subtotal:0,
            costShipping:0,
        }
    },
    components:{
      Loading,  
    },
    methods:{
        redirectPayment: async function(){
            
            const token = await localStorage.getItem('token_access');
            if(token)
                this.$router.push({name: 'payment'});
            else
                this.$router.push({name: 'completeUserData'});

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
                this.subtotal += item.quantity * item.product.price;
            }
            this.total = this.subtotal + this.costShipping;
            this.isLoading = false;
        },
        setShoppingCart: async function(){
            this.isLoading = true;
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
                this.subtotal += item.quantity * item.product.price;
            }
            this.total = this.subtotal + this.costShipping;
            this.isLoading = false;
            
        },
        getShoppingCart: async function(userId){
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
        },
        updateShoppingCart: async function(userId, productId, quantity){
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
        },
        deleteProductCart: async function(userId, productId){
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
        }
    },
    mounted: async function() {
        this.setShoppingCart();
    },

}
</script>

