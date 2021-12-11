<template>
    <!-- checkout wrapper -->
    <div class="container lg:grid grid-cols-12 gap-6 items-start pb-16 pt-4 marginsX-1 text-color-secondary-2-0">
        <!-- checkout form -->
        <div class="lg:col-span-8 border border-gray-200 px-4 py-4 rounded bg-color-secondary-1-1 shadow-sm">
            <form action="">
                <h3 class="text-lg font-medium  mb-4">
                    Pagar con tarjeta
                </h3>

                <div class="space-y-4">
                    <div>
                        <label class="text-gray-600 mb-2 block">
                            Nombre y apellido <span class=" text-color-primary-2">*</span>
                        </label>
                        <input type="text" class="input-box">
                    </div>
                    <div class="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label class="text-gray-600 mb-2 block">
                                Número de tarjeta <span class="text-color-primary-2">*</span>
                            </label>
                            <input type="text" class="input-box">
                        </div>
                        <div>
                            <label class="text-gray-600 mb-2 block">
                                Fecha de expiración <span class="text-color-primary-2">*</span>
                            </label>
                            <input type="text" class="input-box">
                        </div>
                        <div>
                            <label class="text-gray-600 mb-2 block">
                                Código de seguridad <span class="text-color-primary-2">*</span>
                            </label>
                            <input type="text" class="input-box">
                        </div>
                        <div>
                            <label class="text-gray-600 mb-2 block">
                                Documento de identificación <span class="text-color-primary-2">*</span>
                            </label>
                            <input type="text" class="input-box">
                        </div>
                    </div>
                    
                </div>
            </form>
        </div>
        <!-- checkout form end -->

       <!-- order summary -->
        <div class="xl:col-span-3 lg:col-span-4 border border-gray-200 px-4 py-4 rounded mt-6 lg:mt-0 bg-color-secondary-1-1 shadow-sm">
            <h4 class=" text-lg mb-4 font-medium uppercase">ORDEN DE COMPRA</h4>
            <div class="space-y-2 my-2 border-b border-color-secondary-2-0 text-gray-500 font-light">
                <div class="flex justify-between" v-for="(productCart, index) in shoppingCart" :key="index">
                    <div>
                        <h5 class=" w-32 truncate">{{productCart.product.name}}</h5>
                    </div>
                    <p class="text-gray-600  w-10 text-center">{{productCart.quantity}}</p>
                    <p class=" font-normal text-gray-600  w-20 flex justify-end">${{productCart.product.price * productCart.quantity}}</p>
                </div>
            </div>
            <div class="space-y-1  pb-3 border-b border-gray-200">
                <div class="flex justify-between">
                    <p>Subtotal</p>
                    <p>${{subtotal}}</p>
                </div>
                <div class="flex justify-between">
                    <p>Envio</p>
                    <p :class="{' text-green-600 font-medium':!costShipping}">{{ costShipping == 0 ? "Gratis" : costShipping }}</p>
                </div>
            </div>
            <div class="flex justify-between my-3 text-gray-800 font-semibold uppercase">
                <h4>Total</h4>
                <h4>${{total}}</h4>
            </div>

            <!-- checkout -->
            <button class="button-1 rounded-t" @click="setRedirect">
                Pagar
            </button>
            <!-- checkout end -->
        </div>
        <!-- order summary end -->
    </div>
    <!-- checkout wrapper end -->
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
    methods:{
        setRedirect: function(){
            this.$router.push({name: 'payment'});
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
                this.subtotal += item.quantity * item.product.price;
            }
            this.total = this.subtotal + this.costShipping;
            
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
    watch: {
        statusCart: function(){
            if(this.statusCart)
                this.cart = true;
        }
    }
}
</script>
