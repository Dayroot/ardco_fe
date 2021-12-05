<template>
    <Header/>
    <router-view
        @completedLogIn="completedLogIn"
        @completedSignUp="completedSignUp"
    />
    <Footer/>
</template>

<script>
import {defineAsyncComponent} from 'vue'

export default {
    components:{
        Header: defineAsyncComponent( () => import( /* webpackChunkName: "header" */ '../components/header/Header' )),
        Footer: defineAsyncComponent( () => import( /* webpackChunkName: "footer" */ '../components/Footer' ))
    },
    methods:{
        completedLogIn: function(data) {
            localStorage.setItem("isAuthCustomer", true);
            localStorage.setItem("username", data.username);
            localStorage.setItem("token_access", data.token_access);
            localStorage.setItem("token_refresh", data.token_refresh);
            // console.log(localStorage.getItem("username"));
            this.$router.push({ path: "/" });
        },
        completedSignUp: function(data) {
            alert("Registro Exitoso");
            this.completedLogIn(data);
        },
    }
}
</script>