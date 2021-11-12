<template>
    <Header/>
    <router-view>      
    </router-view>
    <Footer/>
</template>

<script>
import {defineAsyncComponent} from 'vue'

export default {
    components:{
        Header: defineAsyncComponent( () => import( /* webpackChunkName: "header" */ '../components/Header' )),
        Footer: defineAsyncComponent( () => import( /* webpackChunkName: "footer" */ '../components/Footer' ))
    }
}
</script>