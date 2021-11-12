<template>
    <nav class="menu">
        <router-link to="" class="menu-button">
            <svg xmlns="http://www.w3.org/2000/svg" class="menu-button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>Categorias</span>
        </router-link>
        <router-link to="" class="menu-button">
            <svg xmlns="http://www.w3.org/2000/svg" class="menu-button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span>Ofertas</span>
        </router-link>
        <router-link to="" class="menu-button">
            <svg xmlns="http://www.w3.org/2000/svg" class="menu-button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Vender</span>
        </router-link>
        <router-link to="" class="menu-button">
            <svg xmlns="http://www.w3.org/2000/svg" class="menu-button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span>Con&oacute;cenos</span>
        </router-link>
    </nav>
</template>

<style lang="css" scoped>
    .menu {
    @apply hidden md:flex items-center justify-center ;
    @apply pl-0 md:pl-4 w-full md:w-auto;
    @apply bg-color-secondary-1-1 md:bg-color-primary-0;
    @apply border-t-4 border-color-primary-2 md:border-t-0;
    @apply shadow-lg md:shadow-none;
}

.menu-button {
    @apply flex items-center justify-start md:justify-center;
    @apply py-3 px-4 md:py-2 md:px-1;
    @apply md:mr-4;
    @apply text-color-secondary-2-3 md:text-color-secondary-2-0 font-medium;
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
</style>