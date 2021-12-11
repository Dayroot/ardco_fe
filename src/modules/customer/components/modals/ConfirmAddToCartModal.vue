<template>
    <Dialog  v-model:visible="confirmAddToCart"  :dismissableMask="true" :modal="true" :style="{width: '30vw'}">
        <template #header>
           <div class="text-center w-full">
               <div class="text-5xl text-color-primary-2">
                   <i class="fas fa-cart-arrow-down"></i>
                </div>
           </div>
        </template>
        <div class="flex justify-center flex-col gap-6 text-color-secondary-2-0">
            <p class="text-color-primary-0 text-lg font-normal">El producto <span class=" text-color-primary-2 font-bold">{{product.name}}</span> ha sido guardado en tu carrito de compras!</p>
            <article class=" flex gap-3 bg-gray-300 bg-opacity-80 rounded p-2 shadow items-center">
                <figure class=" h-20 w-20 bg-blue-300 overflow-hidden object-cover">
                    <img :src="product.imgUrls[0]" alt="" class="rounded object-cover h-full w-full">
                </figure>
                <div class="flex flex-col flex-grow">
                    <div class="h-8 overflow-hidden">
                        <h3 class="truncate">{{product.name}}</h3>
                    </div>
                    <div class="flex flex-col gap-2">
                        <div class="flex justify-between">
                            <p>Cantidad</p>
                            <p>{{quantity}}</p>
                        </div>
                        <div class="flex justify-between font-medium">
                            <p>Subtotal</p>
                            <p>{{product.price}}</p>
                        </div>
                    </div>
                </div>
            </article>
            <div class="flex flex-col gap-2">
                <h3 class="font-semibold text-center">Lo que hay en tu carrito</h3>
                <div class="flex justify-between">
                    <p>Cantidad de productos</p><span>{{quantityProducts}}</span>
                </div>
                <div class="flex justify-between font-medium">
                    <p>Total</p><span>${{total}}</span>
                </div>
            </div>
        </div>
        <template #footer>
           <div class="flex gap-4 justify-center">
               <button class="button-2 hover:border-color-primary-2" @click="confirmAddToCart = false">Seguir comprando</button>
               <button class="button-2 hover:border-color-primary-2">Finalizar Compra</button>
           </div>
        </template>
    </Dialog>
</template>
<script>
import jwt_decode from "jwt-decode";
import gql from "graphql-tag";
export default {
    emits: ['closedConfirmAddToCard'],
    props: {
        openConfirmAddToCard: {
            type: Boolean
        },
        product: {
            type: Object,
            required: true
        },
        quantity: {
            type: Number,
            default: 1,
        },
    },
    data() {
        return {
            confirmAddToCart: false,
            quantityProducts: 0,
            total:0,
        }
    },
    methods:{

        addToCart: async function(){

            let userId;
            let shoppingCart;
            let notFound = true;
            let totalPrice = 0;
            let quantityProducts = 0;

            const token = localStorage.getItem('token_access');

            if(token){
                userId = jwt_decode(token).user_id;
                shoppingCart = this.getShoppingCart(userId);
            }else{
                shoppingCart = await JSON.parse(localStorage.getItem('shoppingCart'));
            }

            if(shoppingCart  && shoppingCart.length ){
                await shoppingCart.forEach( (item, index) => {
                    if(item.product._id == this.product._id ){
                        shoppingCart[index].quantity += this.quantity;
                        notFound = false;
                        totalPrice += item.product.price * this.quantity;
                        quantityProducts += this.quantity;
                    }
                    totalPrice += item.product.price * item.quantity;
                    quantityProducts += item.quantity;
                });
                if(notFound){
                    const newProduct =  {product: {...this.product}, quantity: this.quantity};
                    await shoppingCart.push(newProduct)
                    totalPrice = newProduct.product.price * this.quantity;
                    quantityProducts += this.quantity;
                }
            }else {
                const newProduct =  {product: {...this.product}, quantity: this.quantity};
                shoppingCart = [newProduct];
                totalPrice = newProduct.product.price * this.quantity;
                quantityProducts += this.quantity;
            }
            if(token)
                await this.updateShoppingCart(userId, this.product._id, this.quantity);
            else
                await localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));

            this.quantityProducts = quantityProducts;
            this.total = totalPrice;
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
                console.log(response.data.shoppingCartByUserId.products);
                return response.data.shoppingCartByUserId.products
            })
            .catch(e => {
                console.log(JSON.stringify(e, null, 2));
                return null
            });
        },

        updateShoppingCart: async function(userId, productId, quantity){
            await this.$apollo.mutate({
                mutation: gql`
                    mutation ($userId: Int!, $cartProductInput: CartProductInput) {
                        updateCartProduct(userId: $userId, cartProductInput: $cartProductInput) {
                            _id
                            userId
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
                return response.data.shoppingCartByUserId.products
            })
            .catch(e => {
                console.log(JSON.stringify(e, null, 2));
                return null
            });

        }
    },
    watch:{
        openConfirmAddToCard: function(){
            if(this.openConfirmAddToCard){
                this.confirmAddToCart = this.openConfirmAddToCard;
                this.addToCart();
            }
        },
        confirmAddToCart: function(){
            if(!this.confirmAddToCart)
                this.$emit('closedConfirmAddToCard');
        }
    },

}
</script>
<style lang="css" scoped>
    
</style>