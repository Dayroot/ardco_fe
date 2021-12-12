 <!-- form wrapper --> 
 <template>
     <!-- cart wrapper -->
    <div class="container lg:grid grid-cols-12 gap-6 items-start pb-16 pt-4 marginsX-1 text-color-secondary-2-0">
        <!-- form -->
        <div class="xl:col-span-7 lg:col-span-6">
            <h2 class="text-2xl capitalize font-medium mb-6">
                Completar datos de usuario
            </h2>
            <form>
                <div class="space-y-4">
                    <div>
                        <label class="text-gray-600 mb-2 block">
                            Nombre completo <span class="text-color-primary-2">*</span>
                        </label>
                        <input type="text" class="input-box" v-model="user.fullname" holder="Ingresa tu nombplacere completo">
                    </div>
                    <div class="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label class="text-gray-600 mb-2 block">
                                Usuario <span class="text-color-primary-2">*</span>
                            </label>
                            <input type="text" class="input-box" v-model="user.username"  placeholder="Ingresa tu usuario">
                        </div>
                        <div>
                            <label class="text-gray-600 mb-2 block">
                                Contraseña <span class="text-color-primary-2">*</span>
                            </label>
                            <input type="password" class="input-box" v-model="user.password"  placeholder="Ingresa tu contraseña">
                        </div>
                    </div>
                    <div class="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label class="text-gray-600 mb-2 block">
                                Email <span class="text-color-primary-2">*</span>
                            </label>
                            <input type="email" class="input-box" v-model="user.email" placeholder="example@mail.com">
                        </div>
                        <div>
                            <label class="text-gray-600 mb-2 block">
                                Identificación <span class="text-color-primary-2">*</span>
                            </label>
                            <input type="text" class="input-box" v-model="user.identification" placeholder="Ingresa tu identificación">
                        </div>
                    </div>
                    <div class="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label class="text-gray-600 mb-2 block">
                                Numero de telefono <span class="text-color-primary-2">*</span>
                            </label>
                            <input type="text" class="input-box" v-model="user.phone_number" placeholder="Ingresa tu numero de telefono">
                        </div>
                        <div>
                            <label class="text-gray-600 mb-2 block">
                                Dirección <span class="text-color-primary-2">*</span>
                            </label>
                            <input type="text" class="input-box" v-model="user.address" placeholder="Ingresa tu dirección">
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <!-- form end -->
        <!-- order summary -->
        <div class="xl:col-span-4 lg:col-span-5 border border-gray-200 px-4 py-4 rounded mt-6 lg:mt-0">
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
                Continuar con la compra
            </button>
            <!-- checkout end -->
        </div>
        <!-- order summary end -->
    </div>
    <!-- cart wrapper end -->
    <loading v-model:active="isLoading"
                :can-cancel="true"
                :is-full-page="fullPage"
    />
</template>


<script>
import jwt_decode from "jwt-decode";
import gql from "graphql-tag";
import 'vue-loading-overlay/dist/vue-loading.css';
import Loading from 'vue-loading-overlay';
import Swal from 'sweetalert2';

export default {

    data: function() {
        return {
            user: {
                username: null,
                password: null,
                fullname: null,
                email: null,
                identification: null,
                phone_number: null,
                address: null
            },
            isLoading: false,
            fullPage: true,
            shoppingCartUserAuth: null,
            shoppingCart: null,
            total:0,
            subtotal:0,
            costShipping:0
        }
    },
    components:{ Loading },

    methods: {

        setRedirect: function(){
            this.isLoading = true;
            let blankFields = false;
            Object.values(this.user).forEach(field =>{
                if(!field)
                    blankFields = true;
            });
            if(!blankFields){
                this.processForm();
            }else{
                this.isLoading = false;
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    text: 'Debes llenar todos los campos del formulario!',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        },
        
        processForm: async function() {      
            await this.$apollo
                .mutate({
                    mutation: gql`
                        mutation($userInput: SingUpInput!){
                            signUpUser(userInput: $userInput) {
                                refresh
                                access
                                fullname
                            }
                        }
                    `,
                    variables: {
                        userInput: this.user,
                    },
                })
                .then((result) => {

                    const userId = jwt_decode(result.data.signUpUser.access).user_id;
                    let storageProducts = JSON.parse(localStorage.getItem('shoppingCart'));
                    storageProducts =  storageProducts.map( item => {return {quantity: item.quantity, product: item.product._id}})

                    localStorage.clear();

                    localStorage.setItem("authUser", true);
                    localStorage.setItem("token_access", result.data.signUpUser.access); 
                    localStorage.setItem("username", this.user.username);
                    localStorage.setItem("fullname", result.data.signUpUser.fullname);
                    localStorage.setItem("token_refresh", result.data.signUpUser.refresh);

                    this.updateShoppingCart(userId, storageProducts )                
                })
                .catch((error) => {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        text: 'Ha ocurrido un error, por favor vuelve a intentarlo.',
                        showConfirmButton: false,
                        timer: 1500
                    });

                });
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
        },
        updateShoppingCart: async function(userId, products){
            await this.$apollo
                .mutate({
                    mutation: gql`
                        mutation($userId: Int!, $cartProductsInput: [CartProductInput]) {
                            massiveUpdateCart(userId: $userId, cartProductsInput: $cartProductsInput) {
                                _id
                                products {
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
                        cartProductsInput: products,           
                    }
                })
                .then((result) => {
                    this.isLoading = false;
                    console.log("saleee");       
                    this.$router.push({name: 'payment'});
                })
                .catch((error) => {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        text: 'Ha ocurrido un error, por favor vuelve a intentarlo.',
                        showConfirmButton: false,
                        timer: 1500
                    });

                });
                this.isLoading = false;
        },
    },
    mounted: async function() {
        this.setShoppingCart();
        this.isLoading = false;
    },
}

</script>