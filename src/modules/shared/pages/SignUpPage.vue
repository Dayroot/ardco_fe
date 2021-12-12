 <!-- form wrapper --> 
 <template>
        <div class="container lg:grid grid-cols-12 gap-6 items-start pb-16 pt-4 marginsX-1">
            <h2 class="text-2xl uppercase font-medium mb-6">
                Crear una cuenta
            </h2>
            <form action="" @submit="processSignUp">
                <div class="space-y-4">
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
                    <div>
                        <label class="text-gray-600 mb-2 block">
                            Nombre completo <span class="text-color-primary-2">*</span>
                        </label>
                        <input type="text" class="input-box" v-model="user.fullname" placeholder="Ingresa tu nombre completo">
                    </div>
                    <div>
                        <label class="text-gray-600 mb-2 block">
                            Email <span class="text-color-primary-2">*</span>
                        </label>
                        <input type="email" class="input-box" v-model="user.email" placeholder="example@mail.com">
                    </div>
                </div>
                <div class="mt-4">
                    <button type="submit" 
                        class="block w-full py-2 text-center text-white bg-color-primary-2 border border-primary rounded hover:bg-transparent hover:text-color-primary-2 transition uppercase font-roboto font-medium">
                        CREAR CUENTA
                    </button>
                </div>
            </form>
        </div>
    <loading v-model:active="isLoading"
                :can-cancel="true"
                :is-full-page="fullPage"
    />
</template>


<script>
import gql from "graphql-tag";
import 'vue-loading-overlay/dist/vue-loading.css';
import Loading from 'vue-loading-overlay';
import Swal from 'sweetalert2';

export default {
    emits:["completedSignUp"],
    data: function() {
        return {
            user: {
                username: "",
                password: "",
                fullname: "",
                email: ""
            },
            isLoading: false,
            fullPage: true,
        }
    },
    components:{ Loading },

    methods: {
    
        processSignUp: async function() { 
            this.isLoading = true;     
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
                    let dataLogIn = {
                        username: this.user.username,
                        token_access: result.data.signUpUser.access,
                        fullname: result.data.signUpUser.fullname,
                        token_refresh: result.data.signUpUser.refresh,
                    }
                    this.$emit("completedSignUp", dataLogIn);
                })
                .catch((error) => {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        text: 'Ha ocurrido un error, por favor vuelve a intentarlo.',
                        showConfirmButton: false,
                        timer: 2500
                    });
                });
                this.isLoading = false;
        }
    }
}

</script>