<template>
    <Dialog  v-model:visible="confirmAddToCart" :style="{width: '30vw'}" :dismissableMask="true">
        <template #header>
           <div class="text-center w-full">
               <div class="text-5xl text-color-primary-2">
                   <i class="fas fa-cart-arrow-down"></i>
                </div>
           </div>
        </template>
        <div class="flex justify-center flex-col gap-6 text-color-secondary-2-0">
            <p class="text-color-primary-0 text-lg font-normal">El producto <span class=" text-color-primary-2 font-bold">{{product.name}}</span> ha sido guardado en tu carrito de compras!</p>
            <div class="flex flex-col gap-2">
                <h3 class="font-semibold text-center">Lo que hay en tu carrito</h3>
                <div class="flex justify-between">
                    <p>Cantidad de productos</p><span>{{quantityProducts}}</span>
                </div>
                <div class="flex justify-between">
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
export default {
    emits: ['closedConfirmAddToCard'],
    props: ['openConfirmAddToCard', 'product'],
    data() {
        return {
            confirmAddToCart: false,
            quantityProducts: 0,
            total:0,
        }
    },
    methods:{
        addToCart: async function(){
            let shoppingCart = await JSON.parse(localStorage.getItem('shoppingCart'));
            let notFound = true;
            let totalPrice = 0;
            if(shoppingCart){
                await shoppingCart.forEach( (item, index) => {
                    if(item.product._id == this.product._id ){
                        shoppingCart[index].quantity += 1;
                        notFound = false;
                        totalPrice += item.product.price;
                    }
                    totalPrice += item.product.price * item.quantity;
                });
                if(notFound){
                    const newProduct = {...this.product};
                    await shoppingCart.push({product: newProduct, quantity: 1})
                    totalPrice = newProduct.price;
                }
            }else {
                const newProduct = {...this.product};
                shoppingCart = [{product: newProduct, quantity: 1}];
                totalPrice = newProduct.price;
            }
            await localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
            this.quantityProducts = shoppingCart.length;
            this.total = totalPrice;
        },
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