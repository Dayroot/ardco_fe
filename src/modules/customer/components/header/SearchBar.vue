<template>
    <div :class="{'search-bar':true, 'open-search-bar':openSearchBar}">
            <button class="back-button" @click="$emit('closeSearchBar')">
                <i class="fas fa-arrow-left"></i>
            </button>
            <input class="search-bar__input" type="text" name="" id="" placeholder="¿Qu&eacute; Est&aacute;s Buscando?">
            <button class="search-bar__button">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
        </div>
</template>
<script>
export default {
    emits: ['closeSearchBar'],
    props: ['openSearchBar'],
    watch: {
        openSearchBar: function(){
        }
    }
}
</script>
<style lang="css" scoped>

.back-button {
    @apply flex absolute md:hidden;
    @apply  text-color-primary-0 ml-1;
}

.search-bar {
    @apply hidden md:flex items-center;
    @apply w-40% max-w-md xs:w-1/2;
}

.open-search-bar{
    @apply flex  absolute w-full pr-6 h-16 max-w-full;
    @apply bg-color-secondary-2-1 z-30;
}
.search-bar__input {
    @apply  w-full h-10;
    @apply p-2 rounded-sm md:pl-0 pl-7;
    @apply ring-1 ring-color-primary-0 md:ring-color-primary-2;
}

.search-bar__input:focus {
    @apply border-none outline-none;
}

.search-bar__input::placeholder {
    @apply text-color-secondary-3-1; 
}

.search-bar__input:placeholder-shown {
    @apply overflow-ellipsis; 
}

.search-bar__button{
    @apply bg-color-primary-0 md:bg-color-primary-2 px-3 rounded-r-sm;
    @apply ring-1  ring-color-primary-0 md:ring-color-primary-2;
    @apply text-color-secondary-1-1 h-7 xs:h-10;
    @apply transition-all duration-150 ease-in-out;
}

.search-bar__button:hover {
    @apply bg-transparent text-color-primary-0 md:text-color-primary-2;
}
</style>