<template>

    <!-- header -->
    <header class="header">

        <div class="logo">
            <img class="logo-img" src="@/assets/logo-ardco2.svg" alt="">
        </div>

        <search-bar></search-bar>

        <div class="header-icons-container">
    
            <!-- bell icon -->
            <div class="icon-1 hidden sm:block">
                <span class="counter">3</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon-1-img" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            </div>

            <!-- hearth icon -->
            <div class="icon-1 hidden md:block">
                <span class="counter">6</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon-1-img" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </div>

            <!-- shopping cart icon-->
            <div class="icon-1">
                <span class="counter">15</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon-1-img" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            </div>

            <!--user icon -->
            <div class="icon-1 hidden md:block">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon-1-img" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            </div>

            <!-- menu icon-->       
            <div 
                :class="{'hamburger':true, 'hamburger-open':activateMobileMenu}" 
                @click="setActivateMobileMenu"
                >
                <button>
                    <span class="hamburger-line hamburger-line-top"></span>
                    <span class="hamburger-line hamburger-line-middle"></span>
                    <span class="hamburger-line hamburger-line-bottom"></span>
                </button>
            </div>
        </div>
    </header>
    <!-- header end -->

    <!-- menu -->
    <main-menu></main-menu>
    <transition name="slide-mobile-menu">
        <main-menu
            :class="{'activate-mobile-menu': activateMobileMenu}"
            v-if="activateMobileMenu"
        ></main-menu>
    </transition>
    <!--menu end-->

</template>

<script>
import { defineAsyncComponent } from 'vue';
export default {
    components:{
        MainMenu: defineAsyncComponent(() => import( /* webpackChunkName: "mainMenu" */ './MainMenu')),
        SearchBar: defineAsyncComponent(() => import( /* webpackChunkName: "searchBar" */ './SearchBar')),
    },
    data() {
        return {
           activateMobileMenu: false,  
        }
    },
    methods:{
        setActivateMobileMenu: function(){
            this.activateMobileMenu = !this.activateMobileMenu;
        },
    },

}
</script>

<style lang="css" scoped>

.header {
    @apply flex flex-wrap items-center justify-between;
    @apply py-3 px-2% lg:px-10% md:px-8% ;
    @apply relative z-20;
    @apply bg-color-secondary-2-0;
    
}

.logo{
    @apply flex  flex-shrink-0 items-center justify-start;
    @apply pr-5;
    @apply cursor-pointer;
}

.logo-img {
    @apply w-17.5 xs:w-24;
}

.header-icons-container {
    @apply flex justify-end;
    @apply text-color-secondary-1-0 text-sm font-bold;
}

.counter{
    @apply w-4 h-4 rounded-full;
    @apply bg-color-primary-2;
    @apply text-2xs text-color-secondary-1-1 flex items-center justify-center;
    @apply absolute -right-1.5 -top-0.5;
}

</style>