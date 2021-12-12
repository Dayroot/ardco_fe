<template>
    <div class="flex flex-col" @mouseleave="activateExpendable = false">
        <nav class="menu">
            <div
                to=""
                class="menu-button"
                @mouseenter="setActivateExpendable"
                @click="setActivateExpendable"
            >
                <div class="flex gap-1 items-center">
                    <i class="fas fa-chevron-down"></i>
                    <span>Categorias</span>
                </div>
            </div>
            <!-- <router-link :to="{name:'orderCompleted'}" class="menu-button">
                <svg xmlns="http://www.w3.org/2000/svg" class="menu-button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span>Ofertas</span>
            </router-link> -->
            <router-link :to="{name:'sell'}" class="menu-button">
                <svg xmlns="http://www.w3.org/2000/svg" class="menu-button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Vender</span>
            </router-link>
        </nav>
        <div class="expandable" v-if="activateExpendable">
            <div v-for="(category, index) in categories" :key="index">
                <router-link :to="{name:'products', params:{ categoryId: category._id, categoryName: category.name } }" class="category">
                    <img class="category__img" :src="category.img" alt="">
                    <div class="category__back-drop">
                        <div class="category__tags">
                            <p class="category__title">{{category.name}}</p>
                            <p class="category__sub-title">ver ahora</p>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import gql from "graphql-tag";
export default {
    data() {
        return {
            activateExpendable: false,
            categories: [],
        }
    }, 
    methods: {
        setActivateExpendable: function(){
            this.activateExpendable = !this.activateExpendable;
        },
        getCategories: async function(){
            await this.$apollo.query({
                query: gql`
                    query {
                        listCategories {
                            _id
                            name
                            img
                        }
                    }
                `,
                variables: {           
                }
            })
            .then( response => {
                this.categories = response.data.listCategories;
            })
            .catch(e => {
                console.log(JSON.stringify(e, null, 2));
            });
        }  
    },
    created: function(){
        this.getCategories();
    }
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
    @apply  hidden md:flex justify-center items-center;
    @apply w-screen h-96 absolute top-26 z-10 gap-12 shadow;
    background: linear-gradient(180deg, rgba(222,170,117,1) 4%, rgba(222,170,117,1) 22%, rgba(37,31,29,1) 100%);
}

.category{
    @apply  w-52 h-72 flex justify-center shadow rounded-md relative text-color-secondary-2-0;
}

.category__back-drop {
    @apply bg-black bg-opacity-20 hover:bg-opacity-60 w-full h-full absolute transition;
    @apply flex items-end justify-center rounded-md;
}

.category__title{
    @apply w-80% h-8 bg-color-secondary-2-0 text-color-secondary-1-1 rounded text-lg uppercase text-center font-normal;
}

.category__sub-title{
    @apply w-50% h-6 bg-color-primary-2 rounded text-xs uppercase text-center relative bottom-2 flex items-center justify-center;
}

.category__tags{
    @apply flex flex-col mb-4 w-full items-center relative cursor-pointer;
}

.category__img {
    @apply h-full w-full object-cover rounded-md hover:scale-125 transform transition;
}


</style>