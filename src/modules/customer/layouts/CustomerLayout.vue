<template>
    <Header :authUser="authUser"/>
    <router-view
        @completedLogIn="completedLogIn"
        @completedSignUp="completedSignUp"
    />
    <Footer/>
</template>

<script>
import {defineAsyncComponent} from 'vue'

export default {
    data() {
        return {
            authUser: false,
        }
    },
    components:{
        Header: defineAsyncComponent( () => import( /* webpackChunkName: "header" */ '../components/header/Header' )),
        Footer: defineAsyncComponent( () => import( /* webpackChunkName: "footer" */ '../components/Footer' ))
    },
    methods:{
        completedLogIn: function(data) {
            localStorage.setItem("username", data.username);
            localStorage.setItem("fullname", data.fullname);
            localStorage.setItem("token_access", data.token_access);
            localStorage.setItem("token_refresh", data.token_refresh);
            this.authUser = true;
            this.$router.push({ path: "/" });
        },
        completedSignUp: function(data) {
            alert("Registro Exitoso");
            this.completedLogIn(data);
        },
    },
    mounted() {
        if(localStorage.getItem("token_access"))
            this.authUser = true;
    },
}
</script>