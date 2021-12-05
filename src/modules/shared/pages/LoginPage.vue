<!-- form wrapper -->

<template>   
    <div class="container py-16">
        <div class="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">

            <h2 class="text-2xl uppercase font-medium mb-6">
                Iniciar sesión
            </h2>
            <form action="" @submit="processLogIn" >
                <div class="space-y-4">
                    <div>
                        <label class="text-gray-600 mb-2 block">
                            Usuario <span class="text-color-primary-2">*</span>
                        </label>
                        <input type="username" class="input-box"  v-model="user.username" placeholder="ingresa tu usuario">
                    </div>
                    <div>
                        <label class="text-gray-600 mb-2 block">Contraseña <span class="text-color-primary-2">*</span></label>
                        <input type="password" class="input-box" v-model="user.password" placeholder="ingresa tu contraseña">
                    </div>
                </div>
                <div class="mt-4">
                    <button type="submit"
                        class="block w-full py-2 text-center text-white bg-color-primary-2 border border-primary rounded hover:bg-transparent hover:text-color-primary-2 transition uppercase font-roboto font-medium">
                        INGRESAR
                    </button>
                </div>
            </form>
            <p class="mt-4 text-gray-600 text-center">
                ¿No tienes cuenta? <router-link :to="{name:'signUp'}" class="text-color-primary-2">Registrate ahora</router-link>
            </p>
        </div>
|   </div>
</template>

<script>
import gql from "graphql-tag";
export default {
    emits:["completedLogIn"],
    data: function() {
        return {
            user: {
                username: "",
                password: "",
            }
        }
    },


    methods: {
        processLogIn: async function() {
        // console.log(this.user);    

        await this.$apollo
            .mutate({
                mutation: gql`
                    mutation($credentials: CredentialsInput!){
                        logIn(credentials: $credentials) {
                            refresh
                            access
                        }
                    }
                `,
                variables: {
                    credentials: this.user,
                },
            })
            .then((result) => {
                // console.log(result.data);
                let dataLogIn = {
                    username: this.user.username,
                    token_access: result.data.logIn.access,
                    fullname: result.data.logIn.fullname,
                    token_refresh: result.data.logIn.refresh,
                }

                this.$emit("completedLogIn", dataLogIn);
            })
            .catch((error) => {
                alert("ERROR: Fallo en el ingreso.");
            });
        }
    }

}

</script>