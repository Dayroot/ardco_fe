<template>
    <div class="flex flex-col">
        <nav class="menu">
            <router-link
                to=""
                class="menu-button"
                @mouseenter="setActivateExpendable"
                @mouseleave="setActivateExpendable"
                @click="setActivateExpendable"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="menu-button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Categorias</span>
            </router-link>
            <router-link :to="{name:'signUp'}" class="menu-button">
                <svg xmlns="http://www.w3.org/2000/svg" class="menu-button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span>Ofertas</span>
            </router-link>
            <router-link :to="{name:'login'}" class="menu-button">
                <svg xmlns="http://www.w3.org/2000/svg" class="menu-button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Vender</span>
            </router-link>
            <router-link :to="{name: 'products'}" class="menu-button">
                <svg xmlns="http://www.w3.org/2000/svg" class="menu-button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span>Sombreros</span>
                <!--<span>Con&oacute;cenos</span>-->
            </router-link>
        </nav>
        <div class="expandable" v-if="true">
            <div class="category">
                <img class="h-full object-cover rounded" src="../../../../assets/images/picture-1.jpg" alt="">
                <div class="category__back-drop">
                    <p class="category__title">instrumentos</p>
                    <p class="category__sub-title">ver ahora</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activateExpendable: false,
        }
    },
    methods: {
        setActivateExpendable: function(){
            this.activateExpendable = !this.activateExpendable;
        }
    },
}
</script>
<style lang="css" scoped>
.menu {
    @apply hidden md:flex items-center justify-center ;
    @apply pl-0 md:pl-4 w-full md:w-auto;
    @apply bg-color-secondary-1-1 md:bg-color-primary-0;
    @apply border-t-4 border-color-primary-2 md:border-t-0;
    @apply shadow-lg md:shadow-none z-30;
}

.menu-button {
    @apply flex items-center justify-start md:justify-center;
    @apply py-3 px-4 md:py-2 md:px-1;
    @apply md:mr-4;
    @apply text-color-secondary-3-0 md:text-color-secondary-2-1 font-medium;
    @apply transition-all duration-200 ease-in-out;
    @apply bg-gradient-to-r  via-transparent from-color-primary-0 to-transparent bg-size-200 bg-pos-100;
    @apply md:from-transparent;   
}

.menu-button:hover {
    @apply bg-pos-0;
    @apply text-color-secondary-2-0 md:text-color-secondary-1-1;
    @apply cursor-pointer;
}

.menu-button:active {
    @apply transform md:scale-95;
    @apply  pl-6 md:pl-1;
}

.menu-button-icon {
    @apply h-6 w-6 mr-2;
}

.activate-mobile-menu{
    @apply block absolute;
}

.slide-mobile-menu-leave-active,
.slide-mobile-menu-enter-active {
    @apply transition-all duration-300 ease-in-out;
}

.slide-mobile-menu-leave-to,
.slide-mobile-menu-enter-from {
    transform: translate(0, -100%);
}

.expandable{
    @apply bg-color-secondary-1-1 hidden md:flex justify-center items-center;
    @apply w-screen h-96 absolute top-25 z-10 gap-12;
}

.category{
    @apply bg-red-300 w-52 h-72 flex justify-center shadow-lg rounded relative;
}

.category__back-drop {
    @apply hover:bg-black hover:bg-opacity-40 w-full h-full absolute;
    @apply flex items-end justify-center;
}

.category__title{
    @apply w-80% h-8 bg-color-primary-0 rounded mb-4 text-lg uppercase text-center;
}

.category__sub-title{
    
}
</style>